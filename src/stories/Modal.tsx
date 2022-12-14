import React from "react";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import {colors} from "utils/theme/colors"

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
  onEditSubmit?: any;
  top?: any;
  left?: any;
  hasBackground?: boolean;
  placeholder?: string;
  inputValue?: string;
  onInputChange?: any;
}

const StyledModal = styled.section`
  background-color: ${(props: ModalProps) =>
    props.darkMode ? colors.darkerBlue : colors.white};
  color: ${(props: ModalProps) => (props.darkMode ? colors.white : colors.black)};
  width: ${(props: ModalProps) => (props.width ? props.width : "70vw")};
  min-height: ${(props: ModalProps) => (props.height ? props.height : "70vh")};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  position: absolute;
  z-index: 9;
  border-radius: 10px;

  left: ${(props: ModalProps) => (props.left ? `${props.left}px` : "50%")};
  top: ${(props: ModalProps) => (props.top ? `${props.top}px` : "50%")};
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
  display: ${(props: ModalProps) => (props.hasBackground ? "block" : "none")};
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
    ${(props: ModalProps) => (props.darkMode ? colors.white : colors.black)};
  background-color: ${(props: ModalProps) =>
    props.darkMode ? colors.blue : colors.white};
  color: ${(props: ModalProps) => (props.darkMode ? colors.white : colors.black)};
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
  color: ${(props: ModalProps) => (props.darkMode ? colors.white : colors.darkVividBlue)};
`;

export const Modal = ({
  darkMode = false,
  editMode = false,
  top = 0,
  left = 0,
  title = "",
  onExit = () => {},
  children = "this could be anything",
  height = "70vh",
  width = "60vw",
  titleFontSize = "2rem",
  placeholder = "",
  hasBackground = true,
  onEditSubmit = () => {},
  inputValue = "",
  onInputChange = () => {},
  ...props
}: ModalProps) => {
  return (
    <>
      <Background onClick={onExit} hasBackground={hasBackground}/>
      <StyledModal
        darkMode={darkMode}
        width={editMode ? "fit-content" : width}
        height={editMode ? "fit-content" : height}
        top={top}
        left={left}
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
              <StyledInput type="text" darkMode={darkMode} placeholder={placeholder} value={inputValue} onChange={onInputChange} />
              <IconWrapper>
                <CheckCircleOutlineIcon onClick={onEditSubmit} />
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
