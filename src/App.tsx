import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

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

type StyledAppType = {
  darkMode?: boolean;
};

const Content = styled.main<StyledAppType>`
padding-top: 10vh;
background: #182331;


`

const DragAndDropGrid = styled.section`
  display: flex;

  width: 100%;

`;

const Slider = styled.section`

`;

function App() {
  //create nav bar fixed at top
  //create 3 components to drag

  const [darkMode, setDarkMode] = useState(true);

  return (
    <StyledApp darkMode={darkMode}>
      <NavBar />
      <Content  darkMode={darkMode}>
      <DragAndDropGrid>
        <Slider>
          <LogtailComponent />
        </Slider>
        <TemplateTableComponent />
      </DragAndDropGrid>
      <WordCloudComponent />
      </Content>
    </StyledApp>
  );
}

export interface TestProps {
  darkMode: boolean;
}

export default App;
