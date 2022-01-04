import React from "react";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

interface ModalProps {
  onClick?: () => void;
  darkMode?: boolean;
  editMode?: boolean;
  title?: string;
  onExit?: () => void;
  children?: any;
  width?: string;
  height?: string;
  titleFontSize?: string;
}

const StyledModal = styled.section`
  background-color: ${(props: ModalProps) =>
    props.darkMode ? "#26374C" : "white"};
  color: ${(props: ModalProps) => (props.darkMode ? "white" : "black")};
  width: ${(props: ModalProps) => (props.width ? props.width : "70vw")};
  min-height: ${(props: ModalProps) => (props.height ? props.height : "70vh")};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  position: absolute;
  z-index: 1;
  border-radius: 10px;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &:hover {
    transform: translate(-50%, -50%) scale(1.01);
  }
`;

const ExitWrapper = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    opacity: 0.5;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ContentWrapper = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: "IBM Plex Mono", sans-serif;
`;

const EditModeWrapper = styled.div`
  width: 75%;
  display: flex;
  height: 4rem;
  padding: 3rem;
  column-count: 2;
  flex-direction: row;
`;

const StyledInput = styled.input`
  width: 75%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid
    ${(props: ModalProps) => (props.darkMode ? "white" : "black")};
  background-color: ${(props: ModalProps) =>
    props.darkMode ? "#26374C" : "white"};
  color: ${(props: ModalProps) => (props.darkMode ? "white" : "black")};
  font-size: 1.2em;
  font-family: "IBM Plex Mono", sans-serif;
  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  padding-top: 10px;
  padding-left: 10px;
`;

const Title = styled.h1`
  font-size: ${(props: ModalProps) =>
    props.titleFontSize ? props.titleFontSize : "2ren"};
  font-family: arial;
  color: ${(props: ModalProps) => (props.darkMode ? "white" : "#172B4D")};
`;

export const Modal = ({
  darkMode = false,
  editMode = false,
  title = "Modal Title",
  onExit = () => {},
  children = "this could be anything",
  height = "70vh",
  width = "60vw",
  titleFontSize = "2rem",
  ...props
}: ModalProps) => {
  return (
    <>
      <Background onClick={onExit} />
      <StyledModal
        darkMode={darkMode}
        width={editMode ? "fit-content" : width}
        height={editMode ? "fit-content" : height}
        editMode={editMode}
        {...props}
      >
        <ExitWrapper>
          <ClearIcon onClick={onExit} />
        </ExitWrapper>

        {editMode && (
          <>
        
          <EditModeWrapper>
          <Title darkMode={darkMode}>{title}</Title>
            <StyledInput type="text" darkMode={darkMode} />
            <IconWrapper>
              <CheckCircleOutlineIcon />
            </IconWrapper>
          </EditModeWrapper>
          </>
        )}

        {!editMode && (
          <ContentWrapper>
            {title && (
              <Title titleFontSize={titleFontSize} darkMode={darkMode}>
                {title}
              </Title>
            )}
            {children}
          </ContentWrapper>
        )}
      </StyledModal>
      <Background />
    </>
  );
};
