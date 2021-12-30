import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  onClick?: () => void;
  darkMode?: boolean;
  children?: any;
  onExit?: () => void;
  width?: string;
}


const StyledWrapper = styled.section`
  background-color: ${(props: ModalProps) => props.darkMode ? '#26374C' : 'white'};
  color: ${(props: ModalProps) => props.darkMode ? 'white' : 'black'};
  min-width: ${(props: ModalProps) => props.width ? props.width : 'auto'};
`


export const ComponentWindow = ({
  darkMode = false,
  children = 'this could be anything',
  width = 'auto',
  onExit = () => {},
  ...props
}: ModalProps) => {

  return (
   <StyledWrapper
      darkMode={darkMode}
      {...props}
    >
        <button onClick={onExit}>x</button>
      {children}
      
    </StyledWrapper>
  );
};