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
import { convertToWordCloud, convertToParsed } from "./slices/currentDataSlice";
import useTemplateFetch from "./hooks/useTemplateFetch";
import useLogtailFetch from "./hooks/useLogtailFetch";

const StyledApp = styled.div<StyledAppType>`
  background-color: ${(props) => (props.darkMode ? "#182331" : "white")};
  max-width: 100vw;
  color: ${(props) => (props.darkMode ? "white" : "black")};
  font-family: "IBM Plex Mono", sans-serif;
  height: 100vh;
  overflow-x: hidden;

  > nav {
    background-color: #4b0c5e;
  }
`;

const Content = styled.main<StyledAppType>`
  padding-top: 15.5vh;
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

  const [selectedStartDate, setSelectedStartDate] =
    React.useState("2019-12-12"); // yesterday - const dayBefore = 1; new Date(Date.now() - dayBefore*24*60*60*1000)
  const [selectedEndDate, setSelectedEndDate] = React.useState(
    new Date().toISOString().slice(0, 10)
  );

  const [selectedStartTime, setSelectedStartTime] = React.useState("00:00");
  const [selectedEndTime, setSelectedEndTime] = React.useState("23:59");

  const [templatePageAmount, setTemplatePageAmount] = React.useState(50);
  const [logtailPageAmount, setLogtailPageAmount] = React.useState(50);

  const { loadingTemplateData, templateData, templateError, templateHasMore } = useTemplateFetch(
    templateVersion,
    selectedStartDate,
    selectedStartTime,
    selectedEndDate,
    selectedEndTime,
    tailSearch,
    templatePageAmount
  );
  const { loadingLogtail, logtailData, logtailError, logtailHasMore } =
    useLogtailFetch(
      templateVersion,
      selectedStartDate,
      selectedStartTime,
      selectedEndDate,
      selectedEndTime,
      tailSearch,
      logtailPageAmount
    );
  // inject the logtail component with the useLogtailprops

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
    setParsedDataIsVisible(true);

    if (tailSearch.includes("AND") && tailSearch.includes(checkedTemplateId)) {
      return console.log("breaking");
    }
    let filterAddOnValue = `${tailSearch} AND checkedTemplateId=${checkedTemplateId}`;

    updateTailSearchResultsHandler(filterAddOnValue);

    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    return fetchParsedData(
      checkedTemplateId,
      checkedTemplateVersion,
      dispatch as any
    );
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

  const fetchWordCloudData = (value: string) => {
    const URL: string = SelectorsHelper.getURL(
      CURRENT_ENVIRONMENT_TYPE,
      "wordCloud/nonNumerical"
    );

    let urlWithString = `${URL}/${templateVersion}/${selectedStartDate}&${selectedStartTime}:00/${selectedEndDate}&${selectedEndTime}:00?filter=${value}&from=50&to=0`;

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
    fetchWordCloudData(value);
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

  const handleStartDateChange = (date: Date | null) => {
    const dateAsString = (date as Date).toISOString().slice(0, 10);
    setSelectedStartDate(dateAsString);
  };

  const handleEndDateChange = (date: Date | null) => {
    const dateAsString = (date as Date).toISOString().slice(0, 10);
    setSelectedEndDate(dateAsString);
  };

  const handleStartTimeChange = (e: any) => {
    setSelectedStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: any) => {
    setSelectedEndTime(e.target.value);
  };

  const addWordToInput = (word: string) => {
    let value = `${tailSearch} AND ${word}`;
    setTailSearch(value);
    fetchWordCloudData(value);
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
        handleStartDateChange={handleStartDateChange}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        setSelectedStartDate={setSelectedStartDate}
        setSelectedEndDate={setSelectedEndDate}
        handleEndDateChange={handleEndDateChange}
        handleStartTimeChange={handleStartTimeChange}
        selectedStartTime={selectedStartTime}
        handleEndTimeChange={handleEndTimeChange}
        selectedEndTime={selectedEndTime}
      />

      <Content darkMode={darkMode}>
        <SliderWrapper>
          <Slider>
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
                />
              </ComponentWindow>
            )}
          </Slider>
          <Slider>
            {templateIsVisible && (
              <ComponentWindow
                darkMode={darkMode}
                headerHeight="4vh"
                button={true}
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
                  templateIsVisible={templateIsVisible}
                  darkMode={darkMode}
                  wordCloudIsVisible={wordCloudIsVisible}
                  templateListData={templateData}
                  loadingTemplateData={loadingTemplateData}
                  error={templateError}
                  updateTailSearchResultsHandler={
                    updateTailSearchResultsHandler
                  }
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
          onExit={() => {
            setParsedDataIsVisible(false);
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
