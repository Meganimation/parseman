import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import "./App.css";
import styled from "styled-components";
import {componentIsVisibleReducer, infoFromCheckedTemplateListReducer, navBarValuesReducer} from './reducers'
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
    background-color: #1251a2;
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
`;

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
  let yesterday = ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date());
  let yesterdayStringified = yesterday.toISOString().split("T")[0];

  const [
    {
      logtailIsVisible,
      templateIsVisible,
      wordCloudIsVisible,
      parsedSideInfoIsVisible,
      parsedDataIsVisible,
      savedParsedDataModal,
      modal,
    },
    setVisibility,
  ]: any = useReducer(componentIsVisibleReducer, {
    logtailIsVisible: true,
    templateIsVisible: true,
    wordCloudIsVisible: true,
    parsedSideInfoIsVisible: true,
    parsedDataIsVisible: false,
    savedParsedDataModal: false,
    modal: false,
  });


  const [
    {
      previousCheckedTemplateId,
      previousCheckedTemplateVersion,
      previousCheckedTemplateLiteral,
      previousTemplateTotalAmount,
      checkedTemplateId,
      checkedTemplateVersion,
      checkedTemplateLiteral,
      checkedTemplateTotalAmount,
    },
    setInfoFromCheckedTemplateList,
  ]: any = useReducer(infoFromCheckedTemplateListReducer, {
    checkedTemplateId: "",
    checkedTemplateVersion: "",
    checkedTemplateLiteral: "",
    checkedTemplateTotalAmount: "",
  });

  const [
    {
      tailSearch,
      previousTailSearch,
      templateVersion,
      templatePageAmount,
      selectedStartDateAndTime,
      selectedEndDateAndTime,
      parsedDataPageAmount,
      logtailPageAmount,
    },
    setNavbarValues,
  ]: any = useReducer(navBarValuesReducer, {
    tailSearch: "test",
    previousTailSearch: "",
    templateVersion: "1",
    templatePageAmount: 20,
    parsedDataPageAmount: 50,
    logtailPageAmount: 50,
    selectedStartDateAndTime: [yesterdayStringified, "05:00:00"],
    selectedEndDateAndTime: [new Date().toISOString().slice(0, 10), "00:00:00"],
  });

  const [darkMode, setDarkMode] = useState(true); //How can we make this global?

  const scrollToViewRef = useRef(null);

  const returnedData: any = useSelector(
    (state: RootState) => state.returnedData.parsedDataSidebarInfo
  );

  const savedParsedData: any = useSelector(
    (state: RootState) => state.returnedData.savedParsedData
  );

  const scrollToView = () =>
    //@ts-ignore
    scrollToViewRef.current?.scrollIntoView({
      behavior: "smooth",
    });

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

  const unhideComponent = (nameOfComponents: any) => {
    switch (nameOfComponents) {
      case "logtailComponent":
        setVisibility({ type: "toggleLogtailVisibility", visible: true });
        break;
      case "templateComponent":
        setVisibility({ type: "toggleTemplateVisibility", visible: true });
        break;
      case "wordCloud":
        setVisibility({ type: "toggleWordCloudVisibility", visible: true });
        break;
      case "parsedSideInfoIsVisible":
        setVisibility({ type: "toggleParsedDataTableSideVisibility", visible: true });
        break;
    }
  };

  const scrollToBottom = useCallback(() => {
    return setTimeout(function () {
      scrollToView();
    }, 500);
  }, []);

  const handleParsedDataRendering = useMemo(
    () => (checkedTemplateId: string, checkedTemplateVersion: string) => {
      fetchParsedData(
        checkedTemplateId,
        checkedTemplateVersion,
        dispatch as any,
        parsedDataPageAmount
      );
      setVisibility(
        { type: "toggleParsedDataTableVisibility", visible: true},
      );
      setVisibility(
        { type: "toggleParsedDataModalVisbility", visible: false },
      );
      scrollToBottom();
    },
    [dispatch, parsedDataPageAmount, scrollToBottom]
  );

  const handleTemplateVersionChange = (version: string) => {
    setNavbarValues({ type: "setTemplateVersion", templateVersion: version });
  };

  const handlePagination = useCallback(() => {
    setNavbarValues({ type: "setTemplatePageAmount" });
  }, []);

  const handleLogtailPagination = () => {
    setNavbarValues({ type: "setLogtailPageAmount" });
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
    setNavbarValues({ type: "setTailSearch", value });
  };

  const handleExit = () => {
    setVisibility({ type: "toggleParsedDataTableSideVisibility", visible: false });
  };

  const handleCheckedRadio = (
    templateIdValue: string,
    templateVersionValue: string,
    templateLiteralValue: string,
    templateTotalAmount: string
  ) => {
    setInfoFromCheckedTemplateList({
      type: "setAll",
      templateIdValue,
      templateVersionValue,
      templateLiteralValue,
      templateTotalAmount,
    });
  };

  const handleStartDateChange = (date: any) => {
    let rawDate = date.toString();
    const formattedDate = (date as Date).toISOString().slice(0, 19);
    const selectedDate = formattedDate.split("T")[0];
    let splitRawDate = rawDate.split(" ");
    setNavbarValues({
      type: "setDateAndTime",
      startDateAndTime: [selectedDate, splitRawDate[4]],
      endDateAndTime: selectedEndDateAndTime,
    });
  };

  const handleEndDateChange = (date: any) => {
    let rawDate = date.toString();
    const formattedDate = (date as Date).toISOString().slice(0, 19);
    const selectedEndDate = formattedDate.split("T")[0];
    let splitRawDate = rawDate.split(" ");
    setNavbarValues({
      type: "setDateAndTime",
      startDateAndTime: selectedStartDateAndTime,
      endDateAndTime: [selectedEndDate, splitRawDate[4]],
    });
  };

  const addWordToInput = (word: string) => {
    let value = `${tailSearch} AND ${word}`;
    setNavbarValues({ type: "setTailSearch", value });
  };

  const goBackOnTailSearch = () => {
    setNavbarValues({ type: "setTailSearch", value: previousTailSearch });
    if (previousTailSearch === tailSearch) {
      setNavbarValues({ type: "setTailSearch", value: "" });
      setInfoFromCheckedTemplateList({ type: "clearAll" });
    }
    if (previousTailSearch.includes(" AND TemplateId=")) {
      let splitPreviousTailSearch = previousTailSearch.split("=")[1];
      setInfoFromCheckedTemplateList({ type: "clearAll" });
      setNavbarValues({
        type: "setTailSearch",
        value: `AND TemplateId=${splitPreviousTailSearch}`,
      });
    } else {
      setNavbarValues({ type: "setTailSearch", value: "" });
      setInfoFromCheckedTemplateList({ type: "clearAll" });
    }
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
    setInfoFromCheckedTemplateList({
      type: "setAll",
      templateIdValue: checkedTemplateId,
      templateVersionValue: checkedTemplateVersion,
      templateLiteralValue: newTemplateLiteral,
      templateTotalAmount: checkedTemplateTotalAmount,
    });
  };

  const changeParsedDataPageAmount = (e: any) => {
    setNavbarValues({
      type: "setParsedDataPageAmount",
      amountToAdd: parseInt(e.target.value),
    });
    fetchParsedData(
      checkedTemplateId,
      checkedTemplateVersion,
      dispatch as any,
      e.target.value
    );
  };

  const saveParsedInfo = () => {
    if (savedParsedData.includes(returnedData.templateId))
      return alert("It's already saved");
    setVisibility({ type: "toggleModalVisibility", visible: true });
    dispatch(saveToParsedData(returnedData.templateId));
  };

  const handleSavedParsedDataModal = () => {
    setVisibility(
      { type: "toggleParsedDataModalVisbility", visible: true }
    );
  };

  const fetchSavedParsedData = (data: string) => {
    // setCheckedTemplateId(data);
    //TODO: also save templateVersion to redux and fetch that
    //ALSO: Make this async
    handleParsedDataRendering(data, "1");

    setVisibility(
      { type: "toggleParsedDataModalVisbility", visible: false },
    );
  };

  const switchModals = () => {
    setVisibility(
      { type: "toggleParsedDataModalVisbility", visible: true },
    );
    setVisibility(
      { type: "toggleModalVisibility", visible: false },
    );
  };

  return (
    <StyledApp darkMode={darkMode}>
      <NavBar
        handleTheme={() => setDarkMode(!darkMode)}
        logtailIsVisible={logtailIsVisible}
        templateIsVisible={templateIsVisible}
        wordCloudIsVisible={wordCloudIsVisible}
        parsedSideInfoIsVisible={parsedSideInfoIsVisible}
        unhideComponent={unhideComponent}
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
        <OfflineAlert darkMode={darkMode}>
          If you are seeing this: OFFLINE DEV MODE IS CURRENTLY ON.
        </OfflineAlert>
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
                  setVisibility({ type: "toggleLogtailVisibility", visible: false });
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
                  tailSearch
                    ? handleParsedDataRendering(
                        checkedTemplateId,
                        checkedTemplateVersion
                      )
                    : alert("Please select a template");
                }}
                buttonOneText="Go Back"
                buttonOne={tailSearch ? true : false}
                onButtonOneClick={() => {
                  goBackOnTailSearch();
                }}
                onExit={() => {
                  setVisibility({ type: "toggleTemplateVisibility", visible: false });
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
              setVisibility({ type: "toggleWordCloudVisibility", visible: false });
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
          <div ref={scrollToViewRef}>
            <ParsedDataComponent
              checkedTemplateLiteral={checkedTemplateLiteral}
              darkMode={darkMode}
              handleExit={handleExit}
              parsedSideInfoIsVisible={parsedSideInfoIsVisible}
              postNewTemplateId={postNewTemplateId}
              updateTemplateLiteral={updateTemplateLiteral}
              postNewHeaderName={postNewHeaderName}
              changeParsedDataPageAmount={changeParsedDataPageAmount}
              parsedDataPageAmount={parsedDataPageAmount}
            />
          </div>
        </ComponentWindow>
      )}

      {modal && (
        <Modal
          onExit={() => {
            setVisibility(
              { type: "toggleModalVisibility", visible: false },
            );

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
            setVisibility({ type: "toggleParsedDataModalVisbility", visible: false });
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
  ActionType: any;
}

export default App;
