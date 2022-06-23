import React from 'react';
import styled from 'styled-components';
import {colors} from "utils/theme/colors"

interface ButtonProps {
  height?: string;
  width?: string;
  fontSize?: string;
  label?: string;
  onClick?: () => void;
  darkMode?: boolean;
  onMouseUp?: () => void;
}


const StyledButton = styled.button`
  background-color: ${(props: ButtonProps) => props.darkMode ? colors.lightestPurple : colors.lighterPurple};
  min-width: ${(props: ButtonProps) => props.width ? props.width : '6em'};
  height: ${(props: ButtonProps) => props.height ? props.height : '3em'};
  border-radius: 5px;
  font-size: ${(props: ButtonProps) => props.fontSize ? props.fontSize : '20px'};
  font-family: "IBM Plex Mono", sans-serif;
  border: 0px;
  color: ${colors.white};
  border-bottom: 2px solid ${colors.lighterPurple};
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;

  &:hover {
    background-color: ${colors.darkerPurple};
  }

  &:active {
    box-shadow: 0;
    transform: translateY(3px);
    background-color: ${colors.darkestPurple};
  }
`


export const Button = ({
  height = '3em', 
  width = '9em',
  fontSize = '20px',
  darkMode = false,
  label,
  ...props
}: ButtonProps) => {

  return (
   <StyledButton
      type="button"
      darkMode={darkMode}
      fontSize={fontSize}
      height={height}
      width={width}
      {...props}
    >
      {label}
    </StyledButton>
  );
};
