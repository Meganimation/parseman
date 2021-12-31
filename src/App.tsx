import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { ComponentWindow } from "stories/ComponentWindow";

import {
  WordCloudComponent,
  NavBar,
  ParsedDataComponent,
  TemplateTableComponent,
  LogtailComponent,
} from "components";

const StyledApp = styled.div<StyledAppType>`
  background-color: ${(props) => (props.darkMode ? "#182331" : "green")};
  width: 100vw;
  overflow-X: hidden;
  color: ${(props) => (props.darkMode ? "white" : "black")};
  font-family: "IBM Plex Mono", sans-serif;
  height: 100vh;

  > p {
    background-color: ${(props) => (props.darkMode ? "purple" : "yellow")};
  }

  > nav {
    background-color: ${(props) => (props.darkMode ? "#57066F" : "#57066F")};
  }

  > h2 {
    background-color: ${(props) => (props.darkMode ? "purple" : "yellow")};
  }

  > section {
    background-color: ${(props) => (props.darkMode ? "green" : "yellow")};
  }

  > div {
    background-color: ${(props) => (props.darkMode ? "#26374C" : "yellow")};
  }
`;



const Content = styled.main<StyledAppType>`
padding-top: 15vh;
background: #182331;


`

const SliderWrapper = styled.section`
  display: flex;

  width: 100%;

`;

const Slider = styled.section`


`;

function App() {
  //create nav bar fixed at top
  //create 3 components to drag

  const [darkMode, setDarkMode] = useState(true);
  const [logtailIsVisible, setLogtailIsVisible] = useState(true);
  const [templateIsVisible, setTemplateIsVisible] = useState(true);
  const [wordCloudIsVisible, setWordCloudIsVisible] = useState(true);

  const showComponent = (nameOfComponents: any) => {

    switch (nameOfComponents) {
      case "logtailComponent":
        setLogtailIsVisible(true)
        break;
      case "templateTable":
        setTemplateIsVisible(true)
        break;
      case "wordCloud":
        setWordCloudIsVisible(true)
        break; 
    }   
  }
 

  //make a component to wrap the main components, call it component wrapper in stories, give it an X that toggles its visibility (can be an onclick function passed on to it)
  return (
    <StyledApp darkMode={darkMode}>
      <NavBar 
      logtailIsVisible={logtailIsVisible}
      templateIsVisible={templateIsVisible}
      wordCloudIsVisible={wordCloudIsVisible}
      showComponent={showComponent}/>
      <Content  darkMode={darkMode}>
        
      <SliderWrapper>
        <Slider>
        { (logtailIsVisible && <ComponentWindow onExit={()=>{setLogtailIsVisible(false)}}>
          <LogtailComponent templateIsVisible={templateIsVisible} wordCloudIsVisible={wordCloudIsVisible}/>
          </ComponentWindow>)}
        </Slider>
        { (templateIsVisible && 
        <ComponentWindow button={true} buttonText="parse" onExit={()=>{setTemplateIsVisible(false)}}>
        <TemplateTableComponent templateIsVisible={templateIsVisible} wordCloudIsVisible={wordCloudIsVisible}/>
       </ComponentWindow>)}
      </SliderWrapper>
      { (wordCloudIsVisible && 
      <ComponentWindow onExit={()=>{setWordCloudIsVisible(false)}}>
      <WordCloudComponent />
      </ComponentWindow>)}
      </Content>
    </StyledApp>
  );
}

type StyledAppType = {
  darkMode?: boolean;
};

export interface TestProps {
  darkMode: boolean;
}

export default App;
