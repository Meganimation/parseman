import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  height?: string;
  width?: string;
  fontSize?: string;
  label?: string;
  onClick?: () => void;
  darkMode?: boolean;
}


const StyledButton = styled.button`
  background-color: ${(props: ButtonProps) => props.darkMode ? '#753886' : '#753881'};
  min-width: ${(props: ButtonProps) => props.width ? props.width : '6em'};
  height: ${(props: ButtonProps) => props.height ? props.height : '3em'};
  border-radius: 5px;
  font-size: ${(props: ButtonProps) => props.fontSize ? props.fontSize : '20px'};
  font-family: "IBM Plex Mono", sans-serif;
  border: 0px;
  color: white;
  border-bottom: 2px solid #753881;
  box-shadow: 0px 3px 6px #00000029;
  cursor: pointer;

  &:hover {
    background-color: #3B1C44;
  }

  &:active {
    box-shadow: 0;
    transform: translateY(3px);
    background-color: #3B1C54;
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
