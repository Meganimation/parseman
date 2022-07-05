import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import {colors} from "../utils/theme/colors"

const LoadingWrapper = styled.div`
  z-index: 99999;
  position: absolute;
  top: 30%;
  left: 10%;
  height: 100px;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorWrapper = styled.div`
  width: 100%;
  font-size: 2.5em;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
`;

const LogtailComponentWrapper = styled.section<StyledLogtailType>`
  resize: horizontal;
  max-width: ${(props) => (props.templateIsVisible ? "60vw" : "95vw")};
  min-width: ${(props) => (props.templateIsVisible ? "30vw" : "95vw")};
  height: ${(props) => (props.wordCloudIsVisible ? "60vh" : "75vh")};
  width: ${(props) => (props.templateIsVisible ? "40vw" : "90vw")};
  overflow: auto;
  background-color: ${(props) => (props.darkMode ? colors.darkBlue : colors.white)};
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => (props.darkMode ? colors.darkBlue : colors.white)};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.darkMode ? colors.blue : colors.gray)};
    opacity: 0.5;
    border-radius: 10px;
  }
`;

const LogtailItem = styled.div<StyledLogtailType>`
  background: ${(props) =>
    props.id % 2 === 0
      ? props.darkMode
        ? colors.grayBlue
        : colors.white
      : props.darkMode
      ? colors.darkGrayBlue
      : colors.offWhite};
  font-size: 12px;
  color: ${colors.lightGray};
  overflow-wrap: break-word;
  word-break: break-all;
  padding-top: 10px;
  padding-bottom: 10px;

  code {
    color: ${(props) => (props.darkMode ? colors.lightGray : colors.darkBlue)};
  }
`;

const jankyString =
  "©2022 SliceUp, Inc. All rights reserved. | ©2022 SliceUp, Inc. All rights reserved. | ©2022 SliceUp, Inc. All rights reserved. | ©2022 SliceUp, Inc. All rights reserved.";

export default function LogtailComponent(props: LogtailComponentProps) {
  const {
    loadingLogtail,
    logtailHasMore,
    darkMode,
    templateIsVisible,
    wordCloudIsVisible,
    logtailData,
    logtailError,
    handleLogtailPagination,
  } = props;

  const observer = useRef<any>();

  const lastElementRef = useCallback(
    (node) => {
      if (loadingLogtail) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          logtailHasMore &&
          logtailData.length > 10
        ) {
          handleLogtailPagination();
        }
      });
      if (node) observer.current.observe(node);
    },
    [
      loadingLogtail,
      logtailHasMore,
      handleLogtailPagination,
      logtailData.length,
    ]
  );

  const mapLogtailData = (logtailData: any) => {
    return logtailData.map((logtailItem: any, index: number) => {
      if (logtailData.length === index + 1) {
        return (
          <LogtailItem id={index} darkMode={darkMode} ref={lastElementRef}>
            <code>{logtailItem.logTail}</code>
          </LogtailItem>
        );
      } else
        return (
          <LogtailItem id={index} darkMode={darkMode} ref={lastElementRef}>
            <code>{logtailItem.logTail}</code>
          </LogtailItem>
        );
    });
  };

  if (logtailData.length === 0 && !loadingLogtail)
    return (
      <LogtailComponentWrapper
        templateIsVisible={templateIsVisible}
        wordCloudIsVisible={wordCloudIsVisible}
        darkMode={darkMode}
      >
        <ErrorWrapper>No results.</ErrorWrapper>
        <div style={{ visibility: "hidden", fontSize: "2rem" }}>
          {jankyString}
        </div>
      </LogtailComponentWrapper>
    );

  return (
    <LogtailComponentWrapper
      templateIsVisible={templateIsVisible}
      wordCloudIsVisible={wordCloudIsVisible}
      darkMode={darkMode}
    >
      {mapLogtailData(logtailData)}
      {loadingLogtail && !logtailError && (
        <LoadingWrapper>Loading...</LoadingWrapper>
      )}
      {logtailError && <ErrorWrapper>Error</ErrorWrapper>}
    </LogtailComponentWrapper>
  );
}

type StyledLogtailType = {
  templateIsVisible?: boolean;
  wordCloudIsVisible?: boolean;
  darkMode?: boolean;
  id?: any;
};

interface LogtailComponentProps {
  templateIsVisible: boolean;
  wordCloudIsVisible: boolean;
  darkMode: boolean;
  loadingLogtail: boolean;
  logtailData: string[];
  logtailError: boolean;
  logtailHasMore: boolean;
  handleLogtailPagination: () => void;
  templateVersion: string;
}
