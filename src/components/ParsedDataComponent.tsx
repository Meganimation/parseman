import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Exit from "stories/Exit";
import { RootState } from "slices/store";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "stories/Modal";
import { Button } from "stories/Button";
//import the edit icon from material ui
import EditIcon from "@material-ui/icons/Edit";

const ParsedDataComponentWrapper = styled.section`
  padding-top: 1rem;
  height: 75vh;
  display: flex;
`;

const InfoBar = styled.aside<StyledParsedTableType>`
  background-color: ${(props) => (props.darkMode ? "#26374B": "white")};
  margin: 10px;
  width: 25vw;

  overflow-y: auto;
`;

const ParsedTableWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const InfoItem = styled.div`
  margin-top: 2px;
  font-size: 0.8rem;
  width: 15vw;
`;

const ParsedTableResultsWrapper = styled.section<StyledParsedTableType>`
  width: ${(props) => (props.parsedSideInfoIsVisible ? "70vw" : "100vw")};
  
`;

const GridContainer = styled.div<StyledParsedTableType>`

  display: grid;
  grid-auto-flow: column;
  overflow: auto;
  background-color: ${(props) => (props.darkMode ? "#34404e": "white")};
  border: 1px solid #c1c1c1;
`;

const GridItem = styled.div`
  background: rgba(51, 170, 51, 0.01);
  border-radius: 3px;
  text-align: left;
  min-width: fit-content;

  height: 71vh;
`;

const TitleContainer = styled.div`
  height: 65px;
  resize: horizontal;
  cursor: pointer;
`;

const HeaderContainer = styled.div<StyledParsedTableType>`
  display: flex;
  border-right: 1px solid #c1c1c1;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 1em;

  position: -webkit-sticky;
  position: sticky;
  top: 0;

  background-color: ${(props) => (props.darkMode ? "#2d4460": "white")};
  align-items: center;
  height: 4rem;

  h2 {
    font-size: 1em;
    font-family: "IBM Plex", sans-serif;
    display: inline-block;
    vertical-align: middle;
  }

  &:hover: {
    backgroundcolor: #3a3a3a;
  }
`;

const Title = styled.div`
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  color: white;
`;

const Test = styled.div`
  margin: 10px;

  &:hover {
    background: rgba(51, 170, 51, 0.1);
  }
`;

const StyledEditTemplateWrapper = styled.div`

  display: flex;
  alignItems: center;
  flexWrap: wrap;
  cursor: pointer;
  svg {
    opacity: 0.5;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
}

`;

const SortButton = styled.p`

  cursor: pointer;
  
  &:hover {
      font-weight: bold;
    }

    `;

export interface ISubmitState {
  headers: string[];
  both: {
    array: any;
    arrow: string;
  };
}

export default function ParsedDataComponent({
  templateId = "123456789",
  version = "1",
  templateLiteral = "20px",
  darkMode = false,
  handleExit = () => {},
  parsedSideInfoIsVisible = true,
  ...props
}: IParsedDataComponentProps) {
  const returnedData: any = useSelector(
    (state: RootState) => state.returnedData.parsedData
  );

  const [modal, setModal] = useState(false);

  const [inputTemplateId, setInputTemplateId] = useState('');


  const [localTemplateId, setLocalTemplateId] = useState(returnedData.templateId);

  const [arrow, setArrow] = useState("V");

  const [editInput, setEditInput] = useState([0, 0]);

  const [state, setState] = useState<ISubmitState>({
    headers: [],
    both: { array: [], arrow: "V" },
  });

  useEffect(() => {
    if (returnedData.headers) {
      showParsedInfo();
      setLocalTemplateId(returnedData.templateId);
      console.log("now", returnedData);
    }
  }, [returnedData]);

  let arrKey: string[] = [];
  let arrBoth: any[] = [];
  let i = 0;

  const showParsedInfo = () => {
    if (!returnedData) return console.log("no data");
    else {
      while (i < returnedData.headers.length) {
        arrKey = [
          ...arrKey,
          returnedData.lines
            .map((line: any) => line.itemBody)
            .map((y: any) => y[i].bodyHeader)[0],
        ];

        arrBoth[i] = {
          key: returnedData.lines
            .map((line: any) => line.itemBody)
            .map((y: any) => y[i].bodyHeader)[0],
          value: [
            returnedData.lines
              .map((line: any) => line.itemBody)
              .map((y: any) => y[i].bodyValue),
          ],
        };

        i = i + 1;
      }

      setState({ headers: arrKey, both: { array: arrBoth, arrow: "V" } });
    }
  };

  const showColumns = () => {
    if (i < state.both.array.length) {
      return (
        <GridContainer darkMode={darkMode}>
          {state.both.array.map(
            (array: { key: string; value: string[] }, key: number) => (
              <GridItem>
                <HeaderContainer
                darkMode={darkMode}
                  onClick={(e) => {
                    setEditInput([e.pageY - 50, e.clientX - 100]);
                  }}
                >
                  <TitleContainer>
                    <h1 id={"header" + key} contentEditable="true">
                      {array.key}
                    </h1>
                  </TitleContainer>
                </HeaderContainer>
                {/* <SortButton
                  onClick={(e) => {
                    handleSort(e, array.key);
                  }}
                >
                    <u>Sort ^</u>
                </SortButton> */}
                {array.value.map((value: any) =>
                  value.map((val: any, key: any) => {
                    return <Test key={key}>{val}</Test>;
                  })
                )}
              </GridItem>
            )
          )}
        </GridContainer>
      );
    }
  };

  const handleSort = (e: any, header: string) => {
    if (arrow === "V") {
      e.target.innerText = "Sort V";
      let headerIndex = state.both.array.findIndex(
        (i: { key: string }) => i.key === header
      );
      let valuesToSort = state.both.array[headerIndex].value;
      let arr;

      !header.includes("NUM")
        ? (arr = valuesToSort[0].sort((a: any, b: any) => b.localeCompare(a)))
        : (arr = valuesToSort[0].sort(function (a: any, b: any) {
            return a - b;
          }));

      const { both } = state;
      both.array[headerIndex].value = [arr];

      setState({ headers: state.headers, both });

      setArrow("^");
    }

    if (arrow === "^") {
      e.target.innerText = "Sort ^";

      let headerIndex = state.both.array.findIndex(
        (i: { key: string }) => i.key === header
      );

      let valuesToSort = state.both.array[headerIndex].value;
      let arr;

      !header.includes("NUM") //change to includes numbers
        ? (arr = valuesToSort[0].sort((a: any, b: any) => a.localeCompare(b)))
        : (arr = valuesToSort[0].sort(function (a: any, b: any) {
            return b - a;
          }));

      const { both } = state;
      both.array[headerIndex].value = [arr];

      setState({ headers: state.headers, both });

      setArrow("V");
    }
  };


  const handleEditTemplateId = () => {

    setLocalTemplateId(inputTemplateId);

    setModal(false)
  }

  return (
    <ParsedDataComponentWrapper >
      {parsedSideInfoIsVisible && (
        <>
          <Exit onExit={handleExit} />

          <InfoBar darkMode={darkMode}>
            <InfoItem>
              <StyledEditTemplateWrapper
                onClick={() => {
                  setModal(true);
                }}
              >
                <b>
                  Template Id: {localTemplateId}
                  <EditIcon style={{ transform: "scale(0.6)" }} />
                </b>
              </StyledEditTemplateWrapper>
              {modal && (
                <Modal
                  onExit={() => {
                    setModal(false);
                  }}
                  title="Enter Template Id Name"
                  darkMode={darkMode}
                >
                  <input type='text' value={inputTemplateId} onChange={(e) => setInputTemplateId(e.target.value)} /> 
                 {/* maybe change to local state */}
                  <Button onClick={()=>{handleEditTemplateId()}} label='Submit' />
                </Modal>
              )}
            </InfoItem>
            <InfoItem>
              <p>
                <b>Version:</b> {returnedData.version}
              </p>
            </InfoItem>
            <InfoItem>
              <b>Template Literal:</b>
              <p>{props.checkedTemplateLiteral}</p>
            </InfoItem>
          </InfoBar>
        </>
      )}
      <ParsedTableWrapper >
        <>
          <div>
            {!state.headers.length ? (
              <p>Loading...</p>
            ) : (
              <ParsedTableResultsWrapper parsedSideInfoIsVisible={parsedSideInfoIsVisible}>
                {showColumns()}
              </ParsedTableResultsWrapper>
            )}
          </div>
        </>
      </ParsedTableWrapper>
    </ParsedDataComponentWrapper>
  );
}

type StyledParsedTableType = {
  templateIsVisible?: boolean;
  wordCloudIsVisible?: boolean;
  darkMode?: boolean;
  parsedSideInfoIsVisible?: boolean;
};

interface IParsedDataComponentProps {
  parsedDataIsVisible?: boolean;
  templateId?: string;
  version?: string;
  templateLiteral?: string;
  darkMode: boolean;
  handleExit: () => void;
  parsedSideInfoIsVisible: boolean;
  checkedTemplateLiteral: string;
}
