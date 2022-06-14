import React, { useRef, useCallback } from "react";
import styled from "styled-components";
import { RadioButton } from "stories/RadioButton";

const LoadingWrapper = styled.div`
  width: 100%;
  font-size: 3.5em;
  height: 100%;
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

const TemplateTableComponentWrapper = styled.section<StyledTemplateType>`
  background-color: ${(props) => (props.darkMode ? "#1C2937 " : "white")};
  border-radius: 10px;
  overflow: auto;
  height: ${(props) => (props.wordCloudIsVisible ? "60vh" : "75vh")};
  max-height: ${(props) => (props.wordCloudIsVisible ? "60vh" : "75vh")};
  font-size: 12px;

  &::-webkit-scrollbar {
    width: 10px;
    border: 1px solid black;
  }

  &::-webkit-scrollbar-track {
    background: #1c2937;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #233246;
    opacity: 0.5;
    border-radius: 10px;
  }
`;

const TableHeaderWrapper = styled.div<StyledTemplateType>`
  display: grid;
  grid-template-columns: 1.5fr 4fr 0.5fr;
  background-color: ${(props) => (props.darkMode ? "#1C2937; " : "white")};
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableWrapper = styled.div<StyledTemplateType>`
  display: grid;
  grid-template-columns: 1.5fr 4fr 0.5fr;
  background-color: ${(props) => (props.darkMode ? "#34404E" : "white")};
  cursor: pointer;
  margin: 0;
  border: 0;
  align-items: center;
  overflow-wrap: break-word;
  word-break: break-all;
  grid-column-gap: 20px;
  border-bottom: 1px solid #c1c1c1;

  &:hover {
    background-color: ${(props) => (props.darkMode ? "#28313B" : "lightgrey")};
  }
`;

const TableHeader = styled.div<StyledTemplateType>`
  padding-left: 10px;
  font-size: 0.75em;
  background-color: ${(props) => (props.darkMode ? "#2d4460 " : "white")};
  align-items: center;
  height: 2rem;

  h2 {
    font-size: 1em;
    font-family: "IBM Plex", sans-serif;
    display: inline-block;
    vertical-align: middle;
  }
`;

const RadioButtonWrapper = styled.div`
  &:active {
    transform: translateY(2px);
  }
`;

const PopoutLoader = styled.div` 
  z-index: 999999;
  position: absolute;
  top: 30%;
  right: 20%;
  height: 100px;
  width: 300px;
  background: red;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function TemplateTableComponent(
  props: TemplateTableComponentProps
) {
  const jankyString =
    "©2022 SliceUp, Inc. All rights reserved. | ©2022 SliceUp, Inc. All rights reserved. | ©2022 SliceUp, Inc. All rights reserved. | ©2022 SliceUp, Inc. All rights reserved.";

  const {
    loadingTemplateData,
    hasMore,
    handlePagination,
    templateListData,
    darkMode,
    wordCloudIsVisible,
    handleCheckedRadio,
    checkedTemplateId,
    handleUpdateLogtail, 
    error,
  } = props;

  const observer = useRef<any>();
  
  //@ts-ignore
  const lastElementRef = useCallback(
    (node) => {
      if (loadingTemplateData) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          templateListData.length > 10
        ) {
          handlePagination();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingTemplateData, hasMore, handlePagination, templateListData]
  );

  if (templateListData.length === 0 && !loadingTemplateData)
    return <TemplateTableComponentWrapper darkMode={darkMode} wordCloudIsVisible={wordCloudIsVisible}> <PopoutLoader>No results.</PopoutLoader>  <div style={{ visibility: "hidden", fontSize: '3rem' }}>{jankyString}</div> </TemplateTableComponentWrapper>;
    if (error) return <><ErrorWrapper>Error </ErrorWrapper><div style={{opacity: '0', fontSize: '3rem'}}>{jankyString}</div></>
  return (
    <>
      <TemplateTableComponentWrapper
        wordCloudIsVisible={wordCloudIsVisible}
        darkMode={darkMode}
      >
        <TableHeaderWrapper darkMode={darkMode}>
          <TableHeader darkMode={darkMode}>
            <h2>Template Id</h2>
          </TableHeader>

          <TableHeader darkMode={darkMode}>
            <h2>Template Literal</h2>
          </TableHeader>

          <TableHeader darkMode={darkMode}>
            <h2>Total Logs</h2>
          </TableHeader>
        </TableHeaderWrapper>
        {templateListData.map((data: any, index: any) => {
          if (templateListData.length === index + 1) {
            return (
              <TableWrapper
                ref={lastElementRef}
                darkMode={darkMode}
                onClick={() => {
                  handleCheckedRadio(
                    data.templateId,
                    data.templateVersion,
                    data.templateLiteral,
                    data.totalTemplates
                  );
                }}
              >
                <RadioButtonWrapper style={{ paddingLeft: "10px" }}>
                  <RadioButton
                    value={data.templateId}
                    checked={data.templateId === checkedTemplateId}
                    label={data.templateId}
                  />
                </RadioButtonWrapper>
                <div>{data.templateLiteral}</div>
                <div>{data.totalTemplates}</div>
              </TableWrapper>
            );
          } else {
            return (
              <TableWrapper
                darkMode={darkMode}
                onMouseUp={() => {handleUpdateLogtail()}}
                onMouseDown={() => {
                  handleCheckedRadio(
                    data.templateId,
                    data.templateVersion,
                    data.templateLiteral,
                    data.totalTemplates
                  );
                }}
              >
                <RadioButtonWrapper style={{ paddingLeft: "10px" }}>
                  <RadioButton
                    value={data.templateId}
                    checked={data.templateId === checkedTemplateId}
                    label={data.templateId}
                  />
                </RadioButtonWrapper>
                <div>{data.templateLiteral}</div>
                <div>{data.totalTemplates}</div>
              </TableWrapper>
            );
          }
        })}
         {loadingTemplateData && !error && templateListData.length > 0 && (
          <PopoutLoader>Loading...</PopoutLoader>
        )}
          {loadingTemplateData && !error && templateListData.length < 1 && (
          <><PopoutLoader>Loading...</PopoutLoader><div style={{opacity: '0', fontSize: '3rem'}}>{jankyString}</div></>
        )}
      </TemplateTableComponentWrapper>
    </>
  );
}

type StyledTemplateType = {
  templateIsVisible?: boolean;
  wordCloudIsVisible?: boolean;
  darkMode?: boolean;
};

interface TemplateTableComponentProps {
  darkMode?: boolean;
  wordCloudIsVisible: boolean;
  templateListData: string[];
  handleCheckedRadio: (templateIdValue: string, templateVersionValue: string, templateLiteralValue: string, templateTotalAmount: string) => void
  checkedTemplateId: string;
  loadingTemplateData: boolean;
  error: boolean;
  handlePagination: () => void;
  hasMore: boolean;
  handleUpdateLogtail: any;
}
