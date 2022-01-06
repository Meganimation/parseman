import React from 'react';
import styled from 'styled-components';
import { Button } from 'stories/Button';
import ClearIcon from '@material-ui/icons/Clear'
import Exit from './Exit';

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
// background-color: ${(props: ComponentWindowProps) => props.darkMode ? '#26374C' : 'white'};

const StyledWrapper = styled.section`
  color: ${(props: ComponentWindowProps) => props.darkMode ? 'white' : 'black'};
  min-width: ${(props: ComponentWindowProps) => props.width ? props.width : 'auto'};
 
`

const HeaderContent = styled.div`
background-color: ${(props: ComponentWindowProps) => props.darkMode ? '#26374C' : 'white'};
  width: 100%;
  max-height: ${(props: ComponentWindowProps) => (props.title === 'None') ? '1px' : '50px'};
  display: flex;
  justify-content: space-between;
  padding: 20px;
  `

  const Title = styled.h1`
  font-size: 1.5em;
  font-family: arial;
  color: ${(props: ComponentWindowProps) => props.darkMode ? 'white' : '#26374C'};
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

  const FakeDiv = styled.div`
  color: #26374C;
  font-size: 1px;
  `


  


export const ComponentWindow = ({
  darkMode = true,
  children = 'this could be anything',
  width = 'auto',
  title = 'None',
  buttonText='button',
  onButtonClick = () => {},
  onExit = () => {},
  ...props
}: ComponentWindowProps) => {

  return (
   <StyledWrapper
      darkMode={darkMode}
      {...props}
    >
      <HeaderContent darkMode={darkMode} title={title}>
      { title !== 'None' ? <Title title={title } darkMode={darkMode}>{title}</Title> : <FakeDiv>.</FakeDiv>}
      { props.button && <div style={{marginRight: '15%'}}><Button onClick={onButtonClick} label={buttonText} /></div>}
        <ExitWrapper><Exit onExit={onExit} /> </ExitWrapper>
        
        </HeaderContent>
      {children}
      
    </StyledWrapper>
  );
};