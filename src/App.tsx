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

import SelectorsHelper, {
  CURRENT_ENVIRONMENT_TYPE,
} from "utils/SelectorsHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  convertToLogged,
  convertToWordCloud,
  convertToTemplateList,
} from "./slices/currentDataSlice";

import { RootState } from "slices/store";



const StyledApp = styled.div<StyledAppType>`
  background-color: ${(props) => (props.darkMode ? "#182331" : "white")};
  max-width: 100vw;
  color: ${(props) => (props.darkMode ? "white" : "black")};
  font-family: "IBM Plex Mono", sans-serif;
  height: 100vh;
  overflow-x: hidden;

  > p {
    background-color: ${(props) => (props.darkMode ? "white" : "black")};
  }

  > nav {
    background-color: #4b0c5e;
  }
`;

const Content = styled.main<StyledAppType>`
  padding-top: 12vh;
  background: ${(props) => (props.darkMode ? "#26374B" : "white")};
`;

const SliderWrapper = styled.section`
  display: flex;
  width: 100%;
`;

const Slider = styled.section`
  background: #131b25;
`;

function App() {

  const templateListData = useSelector(
    (state: RootState) => state.returnedData.templateListData
  );


  const [darkMode, setDarkMode] = useState(true);
  const [logtailIsVisible, setLogtailIsVisible] = useState(true);
  const [templateIsVisible, setTemplateIsVisible] = useState(true);
  const [wordCloudIsVisible, setWordCloudIsVisible] = useState(true);

  const [modal, setModal] = useState(false);
  const [parsedDataIsVisible, setParsedDataIsVisible] = useState(false);
  const [parsedSideInfoIsVisible, setParsedSideInfoIsVisible] = useState(true);

  const [tailSearch, setTailSearch] = useState("");

  const messagesEndRef = useRef(null);



  const dispatch = useDispatch();

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

  const fetchLogTailData = (value: string) => {
    const URL: string = SelectorsHelper.getURL(
      CURRENT_ENVIRONMENT_TYPE,
      "logTail"
    );

    let urlWithString = `${URL}/1/2020-01-17/2022-01-17?filter=build&from=500&to=0`;

    return fetch(urlWithString)
      .then((res) => {
        if (!res.ok) {
          throw Error(`Error code: ${res.status}. Please try again.`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(convertToLogged(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchTemplateListData = (value: string) => {
    const URL: string = SelectorsHelper.getURL(
      CURRENT_ENVIRONMENT_TYPE,
      "templateList"
    );

    //TO DO: Regex selectedStartDate and pass it in
    let urlWithString = `${URL}/1/2020-01-17/2022-01-17?filter=hi&from=500&to=0`;

    return fetch(urlWithString)
      .then((res) => {
        if (!res.ok) {
          throw Error(`Error code: ${res.status}. Please try again.`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(convertToTemplateList(data));
        console.log('done', data)
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchWordCloudData = (value: string) => {
    const URL: string = SelectorsHelper.getURL(
      CURRENT_ENVIRONMENT_TYPE,
      "wordCloud/nonNumerical"
    );

    let urlWithString = `${URL}/1/2020-01-17/2022-01-17?filter=build&from=500&to=0`;

    return fetch(urlWithString)
      .then((res) => {
        if (!res.ok) {
          throw Error(`Error code: ${res.status}. Please try again.`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(convertToWordCloud(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateTailSearchResultsHandler = (value: string) => {
    setTailSearch(value);
    fetchLogTailData(value);
    fetchWordCloudData(value);
    fetchTemplateListData(value);
  };

  const handleExit = () => {
    setParsedSideInfoIsVisible(false);
  };

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
        updateTailSearchResultsHandler={updateTailSearchResultsHandler}
      />
      <Content darkMode={darkMode}>
        <SliderWrapper>
          <Slider>
            {logtailIsVisible && (
              <ComponentWindow
                darkMode={darkMode}
                title={"Logtail"}
                headerHeight="15vh"
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
                headerHeight="11vh"
                button={true}
                title={"Template List"}
                buttonText="Parse Data"
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
                  templateListData={templateListData}
                  updateTailSearchResultsHandler={updateTailSearchResultsHandler}
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
            headerHeight="1px"
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
            <ParsedDataComponent
              darkMode={darkMode}
              handleExit={handleExit}
              parsedSideInfoIsVisible={parsedSideInfoIsVisible}
            />
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
