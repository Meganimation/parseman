import React from 'react';
import styled from 'styled-components';
import { Button } from 'stories/Button';
import ClearIcon from '@material-ui/icons/Clear'

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

  const Title = styled.h1`
  font-size: 1.5em;
  font-family: arial;
  color: ${(props: ComponentWindowProps) => props.darkMode ? 'black' : 'white'};
  `

  const ExitWrapper = styled.span`
  padding-right: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    opacity: 0.5;
  }
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
      <Title>{title}</Title>
      { props.button && <div style={{marginRight: '15%'}}><Button onClick={props.onButtonClick} label={buttonText} /></div>}
        <ExitWrapper><ClearIcon onClick={onExit} /> </ExitWrapper>
        
        </HeaderContent>
      {children}
      
    </StyledWrapper>
  );
};