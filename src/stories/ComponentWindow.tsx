import React from 'react';
import styled from 'styled-components';
import { Button } from 'stories/Button';

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
}


const StyledWrapper = styled.section`
  background-color: ${(props: ComponentWindowProps) => props.darkMode ? '#26374C' : 'white'};
  color: ${(props: ComponentWindowProps) => props.darkMode ? 'white' : 'black'};
  min-width: ${(props: ComponentWindowProps) => props.width ? props.width : 'auto'};
 
`

const HeaderContent = styled.div`
background-color: ${(props: ComponentWindowProps) => props.darkMode ? '#26374C' : 'white'};
  width: 100%;
  max-height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  `

  const ExitWrapper = styled.span`
  padding-right: 20px;
  `


export const ComponentWindow = ({
  darkMode = true,
  children = 'this could be anything',
  width = 'auto',
  title = 'title',
  buttonText='button',
  onExit = () => {},
  ...props
}: ComponentWindowProps) => {

  return (
   <StyledWrapper
      darkMode={darkMode}
      {...props}
    >
      <HeaderContent darkMode={darkMode}>
      <h1>{title}</h1>
      { props.button && <Button onClick={props.onButtonClick} label={buttonText} />}
        <ExitWrapper><button onClick={onExit}>x</button></ExitWrapper>
        
        </HeaderContent>
      {children}
      
    </StyledWrapper>
  );
};