import React, { useState, useRef, useEffect } from "react";
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
import { RootState } from "slices/store";
import {
  convertToParsed,
  hashedData,
  saveToParsedData,
} from "./slices/currentDataSlice";
import useTemplateFetch from "./hooks/useTemplateFetch";
import useLogtailFetch from "./hooks/useLogtailFetch";
import useWordCloudFetch from "./hooks/useWordCloudFetch";
import { Button } from "stories/Button";
import { testLocalData } from "utils/offlineData/parsedData";

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

const OfflineAlert = styled.div<StyledAppType>`
  position: absolute;
  z-index: 99999;
  height: 4rem;
  display: flex;
  width: 30%;
  margin: 2% 35%;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.3);
`

const SliderWrapper = styled.section`
  display: flex;
  width: 100%;
`;

const Slider = styled.section<StyledAppType>`
  background: ${(props) => (props.darkMode ? "#26374B" : "white")};
`;

const SavedParsedDataModal = styled.div`
  display: grid;
  grid-column: auto;
  gap: 2rem;
  justify-items: center;
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
  const [checkedTemplateTotalAmount, setCheckedTemplateTotalAmount] =
    useState("");
  const [templateVersion, setTemplateVersion] = useState("1");
  const [templatePageAmount, setTemplatePageAmount] = useState(20);
  const [savedParsedDataModal, setSavedParsedDataModal] = useState(false);
  const messagesEndRef = useRef(null);

  const [selectedStartDateAndTime, setSelectedStartDateAndTime] =
    React.useState(["2019-12-12", "05:00:00"]);
  const [selectedEndDateAndTime, setSelectedEndDateAndTime] = React.useState([
    new Date().toISOString().slice(0, 10),
    "00:00:00",
  ]);

  const returnedData: any = useSelector(
    (state: RootState) => state.returnedData.parsedDataSidebarInfo
  );

  const savedParsedData: any = useSelector(
    (state: RootState) => state.returnedData.savedParsedData
  );


  const scrollToView = () =>
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  const [parsedDataPageAmount, setParsedDataPageAmount] = React.useState(50);
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

  const handleUpdateLogtail = () => {
    let filterAddOnValue = `${tailSearch} AND TemplateId=${checkedTemplateId}`;

    updateTailSearchResultsHandler(filterAddOnValue);
  };

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

  const handleParsedDataRendering = (
    checkedTemplateId: string,
    checkedTemplateVersion: string
  ) => {
    fetchParsedData(
      checkedTemplateId,
      checkedTemplateVersion,
      dispatch as any,
      parsedDataPageAmount
    );
    setParsedDataIsVisible(true);
    setSavedParsedDataModal(false);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    return setTimeout(function () {
      scrollToView();
    }, 500);
    // return scrollToView()
  };

  const handleTemplateVersionChange = (version: string) => {
    setTemplateVersion(version);
  };

  const handlePagination = () => {
    setTemplatePageAmount(templatePageAmount + 20);
  };

  const handleLogtailPagination = () => {
    setLogtailPageAmount(logtailPageAmount + 50);
  };

  const fetchParsedData = (
    checkedTemplateId: string,
    templateVersion: string, //this needs to be the parsed templateversion
    dispatch: any,
    parsedDataPageAmount: number
  ) => {
    const URL: string = SelectorsHelper.getURL(
      CURRENT_ENVIRONMENT_TYPE,
      "parsedDataTable"
    );
    const urlWithString = `${URL}/${checkedTemplateId}/${templateVersion}/?limit=500`; //change to totalTemplate amount
    console.log("hey PARDES", CURRENT_ENVIRONMENT_TYPE);
    fetch(urlWithString)
      .then((res) => {
        if (!res.ok) {
          throw Error(`Error code: ${res.status}. Please try again.`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch(convertToParsed([data, parsedDataPageAmount]));
        dispatch(hashedData(data));
      })
      .catch((err) => {
        if (URL === "OFFLINEparsedDataTable") {
          dispatch(convertToParsed([testLocalData, parsedDataPageAmount]));
          dispatch(hashedData(testLocalData));
        }
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
    templateLiteralValue: string,
    templateTotalAmount: string
  ) => {
    setCheckedTemplateId(templateIdValue);
    setCheckedTemplateVersion(templateVersionValue);
    setCheckedTemplateLiteral(templateLiteralValue);
    setCheckedTemplateTotalAmount(templateTotalAmount);
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

  const goBackOnTailSearch = () => {
    setTailSearch(" ");
    setCheckedTemplateId("");
  };

  const postNewHeaderName = (
    fieldAlias: string,
    fieldName: string,
    parsedDataTemplateId: string,
    parsedDataTemplateVersion: string
  ) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listFields: [
          {
            fieldAlias: fieldAlias, //the updated name (eg. NUM_+0)
            fieldName: fieldName, // the original name (eg. TEST)
          },
        ],
      }),
    };
    fetch(
      `http://10.12.2.242:8081/customize-template-field/${parsedDataTemplateId}/${parsedDataTemplateVersion}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const postNewTemplateId = (inputTemplateId: string) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        templateNameAlias: inputTemplateId, // validator , will not PUT if already exists in database testestest
      }),
    };
    fetch(
      `http://10.12.2.242:8081/customize-template-id/${checkedTemplateId}/${templateVersion}`,
      requestOptions
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(
            `Error code: ${res.status}. That templateId probably already has a nickname. Try again`
          );
        }
        return res.json();
      })
      .then((response) => response.json())
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateTemplateLiteral = (newTemplateLiteral: any) => {
    setCheckedTemplateLiteral(newTemplateLiteral);
  };

  const bringMoreData = (e: any) => {
    setParsedDataPageAmount(e.target.value);
    fetchParsedData(
      checkedTemplateId,
      checkedTemplateVersion,
      dispatch as any,
      e.target.value
    );
  };

  const saveParsedInfo = () => {
    if (savedParsedData.includes(returnedData.templateId))
      return alert("its already saved");
    setModal(true);
    dispatch(saveToParsedData(returnedData.templateId));
  };

  const handleSavedParsedDataModal = () => {
    setSavedParsedDataModal(true);
  };

  const fetchSavedParsedData = (data: string) => {
    setCheckedTemplateId(data);
    //TODO: also save templateVersion to redux and fetch that
    //ALSO: Make this async
    handleParsedDataRendering(data, "1");
  };

  const switchModals = () => {
    setSavedParsedDataModal(true);
    setModal(false);
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
        handleSavedParsedDataModal={handleSavedParsedDataModal}
      />

      {CURRENT_ENVIRONMENT_TYPE === "OFFLINE" && (
        <OfflineAlert darkMode={darkMode}> If you are seeing this: OFFLINE DEV MODE IS CURRENTLY ON.</OfflineAlert>
      )}

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
                buttonTwo={checkedTemplateId ? true : false}
                title={"Template List"}
                buttonTwoText="Parse Data"
                onButtonTwoMouseUp={() => {
                  scrollToBottom();
                }}
                onButtonTwoClick={() => {
                  checkedTemplateId
                    ? handleParsedDataRendering(
                        checkedTemplateId,
                        checkedTemplateVersion
                      )
                    : alert("Please select a template");
                }}
                buttonOneText="Go Back"
                buttonOne={checkedTemplateId ? true : false}
                onButtonOneClick={() => {
                  goBackOnTailSearch();
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
                  handleUpdateLogtail={handleUpdateLogtail}
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
          buttonOne
          buttonOneText="Favorite"
          onButtonOneClick={() => {
            saveParsedInfo();
          }}
        >
          <div ref={messagesEndRef}>
            <ParsedDataComponent
              checkedTemplateLiteral={checkedTemplateLiteral}
              darkMode={darkMode}
              handleExit={handleExit}
              parsedSideInfoIsVisible={parsedSideInfoIsVisible}
              postNewTemplateId={postNewTemplateId}
              updateTemplateLiteral={updateTemplateLiteral}
              postNewHeaderName={postNewHeaderName}
              bringMoreData={bringMoreData}
              parsedDataPageAmount={parsedDataPageAmount}
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
          Saved (enter template modal here)
          <Button label={"View Modal"} onClick={() => switchModals()}></Button>
        </Modal>
      )}
      {savedParsedDataModal && (
        <Modal
          darkMode={darkMode}
          onExit={() => {
            setSavedParsedDataModal(false);
          }}
        >
          <SavedParsedDataModal>
            <h1> Previously Saved Data </h1>
            {savedParsedData.map((data: string) => (
              <div>
                <Button
                  label={data}
                  onClick={() => {
                    fetchSavedParsedData(data);
                  }}
                />
              </div>
            ))}
          </SavedParsedDataModal>
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
