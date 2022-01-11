import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import styled from "styled-components";
import { ComponentWindow } from "stories/ComponentWindow";
import { Modal } from "stories/Modal";

import {
  WordCloudComponent,
  NavBar,
  ParsedDataComponent,
  TemplateTableComponent,
  LogtailComponent,
} from "components";

// background-color: ${(props) => (props.darkMode ? "#182331" : "white")};
const StyledApp = styled.div<StyledAppType>`
  background-color: red;
  width: 100vw;
  overflow-x: hidden;
  color: ${(props) => (props.darkMode ? "white" : "black")};
  font-family: "IBM Plex Mono", sans-serif;
  height: 100vh;

  > p {
    background-color: ${(props) => (props.darkMode ? "white" : "black")};
  }

  > nav {
    background-color: #4B0C5E;
  }
`;

const Content = styled.main<StyledAppType>`
  padding-top: 15vh;
  background: ${(props) => (props.darkMode ? "#26374B" : "white")};
`;

const SliderWrapper = styled.section`
  display: flex;

  width: 100%;
`;

const Slider = styled.section`
background: #131B25;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [logtailIsVisible, setLogtailIsVisible] = useState(true);
  const [templateIsVisible, setTemplateIsVisible] = useState(true);
  const [wordCloudIsVisible, setWordCloudIsVisible] = useState(true);

  const [modal, setModal] = useState(false);
  const [parsedDataIsVisible, setParsedDataIsVisible] = useState(false);
  const [parsedSideInfoIsVisible, setParsedSideInfoIsVisible] = useState(true)

  const messagesEndRef = useRef(null);

  const showComponent = (nameOfComponents: any) => {
    switch (nameOfComponents) {
      case "logtailComponent":
        setLogtailIsVisible(true);
        break;
      case "templateComponent":
        setTemplateIsVisible(true);
        break;
      case "wordCloud":
        setWordCloudIsVisible(true);
        break;
        case "parsedSideInfoIsVisible":
          setParsedSideInfoIsVisible(true);
          break;
    }
  };

  useEffect(() => {
    if (parsedDataIsVisible) handleParsedDataRendering();
  }, [parsedDataIsVisible]);

  const handleParsedDataRendering = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setParsedDataIsVisible(true);
  };

  const handleExit=()=>{

    setParsedSideInfoIsVisible(false)
  }

  return (
    <StyledApp darkMode={darkMode}>
      <NavBar
        handleTheme={() => setDarkMode(!darkMode)}
        logtailIsVisible={logtailIsVisible}
        templateIsVisible={templateIsVisible}
        wordCloudIsVisible={wordCloudIsVisible}
        parsedSideInfoIsVisible={parsedSideInfoIsVisible}
        showComponent={showComponent}
        darkMode={darkMode}
      />
      <Content darkMode={darkMode}>
        <SliderWrapper>
          <Slider>
            {logtailIsVisible && (
              <ComponentWindow
                darkMode={darkMode}
                title={"Logtail"}
                onExit={() => {
                  setLogtailIsVisible(false);
                }}
              >
                <LogtailComponent
                  darkMode={darkMode}
                  templateIsVisible={templateIsVisible}
                  wordCloudIsVisible={wordCloudIsVisible}
                />
              </ComponentWindow>
            )}
          </Slider>
          <Slider>
          {templateIsVisible && (
            <ComponentWindow
              darkMode={darkMode}
              button={true}
              title={"Template List"}
              buttonText="parse"
              onButtonClick={() => {
                handleParsedDataRendering();
              }}
              onExit={() => {
                setTemplateIsVisible(false);
              }}
            >
              <TemplateTableComponent
                templateIsVisible={templateIsVisible}
                darkMode={darkMode}
                wordCloudIsVisible={wordCloudIsVisible}
              />
            </ComponentWindow>
        
          )}
               </Slider>
        </SliderWrapper>
        {wordCloudIsVisible && (
          <ComponentWindow
            darkMode={darkMode}
            onExit={() => {
              setWordCloudIsVisible(false);
            }}
          >
            <WordCloudComponent darkMode={darkMode} />
          </ComponentWindow>
        )}
      </Content>

      {parsedDataIsVisible && (
        <ComponentWindow
          darkMode={darkMode}
          title={"Parsed Data Table"}
          button
          buttonText="Save"
          onButtonClick={() => {
            setModal(true);
          }}
          onExit={() => {
            setParsedDataIsVisible(false);
          }}
        >
          <div ref={messagesEndRef}>
            <ParsedDataComponent darkMode={darkMode} handleExit={handleExit} parsedSideInfoIsVisible={parsedSideInfoIsVisible} />
          </div>
        </ComponentWindow>
      )}

      {modal && (
        <Modal
          onExit={() => {
            setModal(false);
          }}
          title="Saved!"
          darkMode={darkMode}
        >
          SAVED
        </Modal>
      )}
    </StyledApp>
  );
}

type StyledAppType = {
  darkMode?: boolean;
  wobble?: number;
};

export interface TestProps {
  darkMode: boolean;
}

export default App;

