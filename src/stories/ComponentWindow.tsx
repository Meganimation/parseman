import React from "react";
import styled from "styled-components";
import { Button } from "stories/Button";
import Exit from "./Exit";

interface ComponentWindowProps {
  onClick?: () => void;
  darkMode?: boolean;
  children?: any;
  onExit?: () => void;
  width?: string;
  title?: string;
  button?: boolean;
  buttonText?: any;
  onButtonClick?: () => void;
  headerHeight?: string;
  handleCheckedData?: any;
}

const ComponentWindowWrapper = styled.section`
  background-color: ${(props: ComponentWindowProps) =>
    props.darkMode ? "#26374C" : "white"};
  color: ${(props: ComponentWindowProps) =>
    props.darkMode ? "white" : "black"};
  min-width: ${(props: ComponentWindowProps) =>
    props.width ? props.width : "auto"};
  margin: 2px;
  border-radius: 10px;
  border: ${(props: ComponentWindowProps) =>
    props.darkMode ? "5px #26374C solid" : "5px white solid"};

  padding: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

const HeaderContent = styled.div`
  background-color: ${(props: ComponentWindowProps) =>
    props.darkMode ? "#26374C" : "white"};
  display: flex;
  justify-content: space-between;
  height: ${(props: ComponentWindowProps) =>
    props.headerHeight ? props.headerHeight : "auto"};
`;

const Title = styled.h1`
  font-size: 0.3em;
  font-family: arial;
  color: ${(props: ComponentWindowProps) =>
    props.darkMode ? "white" : "#26374C"};
`;

const ExitWrapper = styled.span`
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    opacity: 0.5;
  }
  z-index: 1;
`;

const FakeDiv = styled.div`
  color: #26374c;
  font-size: 1px;
`;

const ButtonWrapper = styled.div`
  z-index: 3;
`;

export const ComponentWindow = ({
  darkMode = true,
  children = "this could be anything",
  width = "auto",
  title = "None",
  buttonText = "button",
  headerHeight = "auto",
  onButtonClick = () => {},
  onExit = () => {},
  ...props
}: ComponentWindowProps) => {
  return (
    <ComponentWindowWrapper
      darkMode={darkMode}
      headerHeight={headerHeight}
      {...props}
    >
      <HeaderContent
        darkMode={darkMode}
        title={title}
        headerHeight={headerHeight}
      >
        {title !== "None" ? (
          <Title title={title} darkMode={darkMode}>
            {title}
          </Title>
        ) : (
          <FakeDiv>.</FakeDiv>
        )}
        {props.button && (
          <ButtonWrapper>
            <Button
              onClick={onButtonClick}
              label={buttonText}
              fontSize="12px"
            />
          </ButtonWrapper>
        )}
        <ExitWrapper>
          <Exit onExit={onExit} darkMode={darkMode} />
        </ExitWrapper>
      </HeaderContent>
      {children}
    </ComponentWindowWrapper>
  );
};
