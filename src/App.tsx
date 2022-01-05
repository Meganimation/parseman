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

const StyledApp = styled.div<StyledAppType>`
  background-color: ${(props) => (props.darkMode ? "#182331" : "green")};
  width: 100vw;
  overflow-x: hidden;
  color: ${(props) => (props.darkMode ? "white" : "black")};
  font-family: "IBM Plex Mono", sans-serif;
  height: 100vh;

  > p {
    background-color: ${(props) => (props.darkMode ? "white" : "black")};
  }

  > nav {
    background-color: ${(props) => (props.darkMode ? "#57066F" : "#57066F")};
  }
`;

const Content = styled.main<StyledAppType>`
  padding-top: 15vh;
  background: #182331;
`;

const SliderWrapper = styled.section`
  display: flex;

  width: 100%;
`;

const Slider = styled.section``;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [logtailIsVisible, setLogtailIsVisible] = useState(true);
  const [templateIsVisible, setTemplateIsVisible] = useState(true);
  const [wordCloudIsVisible, setWordCloudIsVisible] = useState(true);

  const [modal, setModal] = useState(false);
  const [parsedDataIsVisible, setParsedDataIsVisible] = useState(false);

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

  return (
    <StyledApp darkMode={darkMode}>
      <NavBar
        handleTheme={() => setDarkMode(!darkMode)}
        logtailIsVisible={logtailIsVisible}
        templateIsVisible={templateIsVisible}
        wordCloudIsVisible={wordCloudIsVisible}
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
                  templateIsVisible={templateIsVisible}
                  wordCloudIsVisible={wordCloudIsVisible}
                />
              </ComponentWindow>
            )}
          </Slider>
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
            <ParsedDataComponent />
          </div>
        </ComponentWindow>
      )}

      {modal && (
        <Modal
          onExit={() => {
            setModal(false);
          }}
          title="Saved!"
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
