import React, { useState, useRef } from "react";
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
import { useDispatch } from "react-redux";
import { convertToParsed } from "./slices/currentDataSlice";
import useTemplateFetch from "./hooks/useTemplateFetch";
import useLogtailFetch from "./hooks/useLogtailFetch";
import useWordCloudFetch from './hooks/useWordCloudFetch'
import useDebounce from "./hooks/useDebounce";

const StyledApp = styled.div<StyledAppType>`
  background-color: ${(props) => (props.darkMode ? "#182331" : "white")};
  max-width: 100vw;
  color: ${(props) => (props.darkMode ? "white" : "black")};
  font-family: "IBM Plex Mono", sans-serif;
  height: 100vh;

  overflow-x: hidden;
  overflow-y: none;

    &::-webkit-scrollbar {
    width: 10px;
   
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => (props.darkMode ? "#1C2937; " : "white")};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.darkMode ? "#233246; " : "#9C9C9C; ")};
    opacity: 0.5;
    border-radius: 10px;
  }

  > nav {
    background-color: #4b0c5e;
  }

`;

const Content = styled.main<StyledAppType>`
  padding-top: 8rem;
  background: ${(props) => (props.darkMode ? "#26374B" : "white")};
`;

const SliderWrapper = styled.section`
  display: flex;
  width: 100%;
`;

const Slider = styled.section<StyledAppType>`
  background: ${(props) => (props.darkMode ? "#26374B" : "white")};
`;

function App() {
  // const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [logtailIsVisible, setLogtailIsVisible] = useState(true);
  const [templateIsVisible, setTemplateIsVisible] = useState(true);
  const [wordCloudIsVisible, setWordCloudIsVisible] = useState(true);

  const [modal, setModal] = useState(false);
  const [parsedDataIsVisible, setParsedDataIsVisible] = useState(false);
  const [parsedSideInfoIsVisible, setParsedSideInfoIsVisible] = useState(true);

  const [tailSearch, setTailSearch] = useState("");

  const [checkedTemplateId, setCheckedTemplateId] = useState("");
  const [checkedTemplateVersion, setCheckedTemplateVersion] = useState("");
  const [checkedTemplateLiteral, setCheckedTemplateLiteral] = useState("");
  const [templateVersion, setTemplateVersion] = useState("1");

  const messagesEndRef = useRef(null);

  const [selectedStartDateAndTime, setSelectedStartDateAndTime] =
    React.useState(["2019-12-12", "05:00:00"]);
  const [selectedEndDateAndTime, setSelectedEndDateAndTime] = React.useState([
    new Date().toISOString().slice(0, 10),
    "00:00:00",
  ]);

  //@ts-ignore
  const scrollToView = messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });


  
  useDebounce(() => scrollToView, 2000, [scrollToView]);

  const [templatePageAmount, setTemplatePageAmount] = React.useState(50);
  const [logtailPageAmount, setLogtailPageAmount] = React.useState(50);

  const { loadingTemplateData, templateData, templateError, templateHasMore } =
    useTemplateFetch(
      templateVersion,
      selectedStartDateAndTime,
      selectedEndDateAndTime,
      tailSearch,
      templatePageAmount
    );
  const { loadingLogtail, logtailData, logtailError, logtailHasMore } =
    useLogtailFetch(
      templateVersion,
      selectedStartDateAndTime,
      selectedEndDateAndTime,
      tailSearch,
      logtailPageAmount
    );

    const { loadingWordCloudData, wordCloudData, wordCloudError } =
    useWordCloudFetch(
      templateVersion,
      selectedStartDateAndTime,
      selectedEndDateAndTime,
      tailSearch
    );

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

  const handleParsedDataRendering = () => {

    if (tailSearch.includes("AND") && tailSearch.includes(checkedTemplateId)) {
      return console.log("breaking");
    }
    let filterAddOnValue = `${tailSearch} AND TemplateId=${checkedTemplateId}`;

    updateTailSearchResultsHandler(filterAddOnValue);

 fetchParsedData(
      checkedTemplateId,
      checkedTemplateVersion,
      dispatch as any
    );

    setParsedDataIsVisible(true);
    
  };

  const handleTemplateVersionChange = (version: string) => {
    setTemplateVersion(version);
  };

  const handlePagination = () => {
    setTemplatePageAmount(templatePageAmount + 50);
  };

  const handleLogtailPagination = () => {
    setLogtailPageAmount(logtailPageAmount + 50);
  };

  const fetchParsedData = (
    checkedTemplateId: string,
    templateVersion: string, //this needs to be the parsed templateversion
    dispatch: any
  ) => {
    const URL: string = SelectorsHelper.getURL(
      CURRENT_ENVIRONMENT_TYPE,
      "parsedDataTable"
    );

    const urlWithString = `${URL}/${checkedTemplateId}/${templateVersion}/?limit=500`;

    fetch(urlWithString)
      .then((res) => {
        if (!res.ok) {
          throw Error(`Error code: ${res.status}. Please try again.`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(convertToParsed(data));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateTailSearchResultsHandler = (value: string) => {
    setTailSearch(value);
  };

  const handleExit = () => {
    setParsedSideInfoIsVisible(false);
  };

  const handleCheckedRadio = (
    templateIdValue: string,
    templateVersionValue: string,
    templateLiteralValue: string
  ) => {
    setCheckedTemplateId(templateIdValue);
    setCheckedTemplateVersion(templateVersionValue);
    setCheckedTemplateLiteral(templateLiteralValue);
  };

  const handleStartDateChange = (date: any) => {
    let rawDate = date.toString();
    const formattedDate = (date as Date).toISOString().slice(0, 19);
    const selectedDate = formattedDate.split("T")[0];
    let splitRawDate = rawDate.split(" ");
    setSelectedStartDateAndTime([selectedDate, splitRawDate[4]]);
  };

  const handleEndDateChange = (date: any) => {
    let rawDate = date.toString();
    const formattedDate = (date as Date).toISOString().slice(0, 19);
    const selectedEndDate = formattedDate.split("T")[0];
    let splitRawDate = rawDate.split(" ");
    setSelectedEndDateAndTime([selectedEndDate, splitRawDate[4]]);
  };

  const addWordToInput = (word: string) => {
    let value = `${tailSearch} AND ${word}`;
    setTailSearch(value);
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
        tailSearch={tailSearch}
        handleTemplateVersionChange={handleTemplateVersionChange}
        selectedStartDateAndTime={selectedStartDateAndTime}
        selectedEndDateAndTime={selectedEndDateAndTime}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
      />

      <Content darkMode={darkMode}>
        <SliderWrapper>
          <Slider darkMode={darkMode}>
            {logtailIsVisible && (
              <ComponentWindow
                darkMode={darkMode}
                title={"Logtail"}
                headerHeight="4vh"
                onExit={() => {
                  setLogtailIsVisible(false);
                }}
              >
                <LogtailComponent
                  loadingLogtail={loadingLogtail}
                  logtailData={logtailData}
                  logtailError={logtailError}
                  logtailHasMore={logtailHasMore}
                  darkMode={darkMode}
                  templateIsVisible={templateIsVisible}
                  wordCloudIsVisible={wordCloudIsVisible}
                  handleLogtailPagination={handleLogtailPagination}
                  templateVersion={templateVersion}
                />
              </ComponentWindow>
            )}
          </Slider>
          <Slider darkMode={darkMode}>
            {templateIsVisible && (
              <ComponentWindow
                darkMode={darkMode}
                headerHeight="4vh"
                button={checkedTemplateId ? true : false}
                title={"Template List"}
                buttonText="Parse Data"
                onButtonClick={() => {
                  checkedTemplateId
                    ? handleParsedDataRendering()
                    : alert("Please select a template");
                }}
                onExit={() => {
                  setTemplateIsVisible(false);
                }}
              >
                <TemplateTableComponent
                  handlePagination={handlePagination}
                  hasMore={templateHasMore}
                  darkMode={darkMode}
                  wordCloudIsVisible={wordCloudIsVisible}
                  templateListData={templateData}
                  loadingTemplateData={loadingTemplateData}
                  error={templateError}
                  handleCheckedRadio={handleCheckedRadio}
                  checkedTemplateId={checkedTemplateId}
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
            headerHeight="20px"
          >
            <WordCloudComponent
              darkMode={darkMode}
              addWordToInput={addWordToInput}

              loadingWordCloudData={loadingWordCloudData}
              wordCloudError={wordCloudError}
              wordCloudData={wordCloudData}
            />
          </ComponentWindow>
        )}
      </Content>

      {parsedDataIsVisible && (
        <ComponentWindow
          darkMode={darkMode}
          title={"Parsed Data Table"}
          button
          buttonText="Favorite"
          onButtonClick={() => {
            setModal(true);
          }}
        >
          <div ref={messagesEndRef}>
            <ParsedDataComponent
              checkedTemplateLiteral={checkedTemplateLiteral}
              darkMode={darkMode}
              handleExit={handleExit}
              parsedSideInfoIsVisible={parsedSideInfoIsVisible}
            />
          </div>
        </ComponentWindow>)}
   

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
