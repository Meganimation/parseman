import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  onClick?: () => void;
  darkMode?: boolean;
}


const StyledModal = styled.section`
  background-color: ${(props: ModalProps) => props.darkMode ? '#26374C' : 'white'};
  color: ${(props: ModalProps) => props.darkMode ? 'white' : 'black'};
  width: 300px;
  height: 300px;
`


export const Modal = ({
  darkMode = false,
  ...props
}: ModalProps) => {

  return (
   <StyledModal
      darkMode={darkMode}
      {...props}
    >
      <h1>Your Saved Content</h1>
      
    </StyledModal>
  );
};