import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Exit from "stories/Exit";
import { RootState } from "slices/store";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "stories/Modal";
import { Button } from "stories/Button";
import EditIcon from "@material-ui/icons/Edit";

const ParsedDataComponentWrapper = styled.section`
  padding-top: 1rem;
  height: 75vh;
  display: flex;
`;

const InfoBar = styled.aside<StyledParsedTableType>`
  background-color: ${(props) => (props.darkMode ? "#26374B" : "white")};
  margin: 10px;
  width: 25vw;
  overflow-y: auto;
`;

const ParsedTableWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const InfoItem = styled.div`
  margin-top: 2px;
  font-size: 0.8rem;
  width: 15vw;
`;

const ParsedTableResultsWrapper = styled.section<StyledParsedTableType>``;


const GridContainer = styled.div<StyledParsedTableType>`
  display: grid;
  grid-auto-flow: column;

`;

const GridItem = styled.div`
  background: rgba(51, 170, 51, 0.01);
  border-radius: 3px;
  text-align: left;
  min-width: 150px;
  word-break: break-word;
`;

const GridRow = styled.div``;

const TitleContainer = styled.div`
  height: 65px;
  resize: horizontal;
  cursor: pointer;
`;

const HeaderContainer = styled.div<StyledParsedTableType>`

  border-right: 1px solid #c1c1c1;
  font-size: 1em;

  position: -webkit-sticky;
  position: sticky;
  top: 0;

  background-color: ${(props) => (!props.darkMode ? "#2d4460" : "white")};
  align-items: center;
  height: 4rem;
  width: max-content;

  display: grid;
  grid-auto-flow: column;

  &:hover: {
    backgroundcolor: #3a3a3a;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 1em;
  font-family: "IBM Plex", sans-serif;
  display: inline-block;
  vertical-align: middle;
  width: 400px;
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

const StyledModalInput = styled.input`
      height: 2rem;
      width 50%;
      border-radius: 20px;
      shadow: 0px 0px 10px #000000;
      box-shadow: 0px 0px 10px #000000;

      position: relative;
      top: -2rem;


      &:focus {
          outline: none;
          shadow: none;
          box-shadow: none;
      }


  `;

export interface ISubmitState {
  headers: string[];
  content: string[];
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

  const newReturnedData: any = useSelector(
    (state: RootState) => state.returnedData.newParsedData
  );

  const newReturnedHeaders: any = useSelector(
    (state: RootState) => state.returnedData.newParsedHeaders
  );

  const [modal, setModal] = useState(false);
  const [inputTemplateId, setInputTemplateId] = useState("");
  const [localTemplateId, setLocalTemplateId] = useState(
    returnedData.templateId
  );

  let [state, setState] = useState<ISubmitState>({
    headers: [],
    content: [],
  });

  useEffect(() => {
    if (returnedData.headers) {
      if (!returnedData) return console.log("no data");
    else {
      setState({ headers: newReturnedHeaders, content: newReturnedData });
    }
      setLocalTemplateId(returnedData.templateId);
    }
  }, [returnedData, newReturnedData, newReturnedHeaders]);



  const showItems = (content: any) => {
    if (content.length === 0) return <p>No data</p>;
    else {
      return content.map((item: any, index: any) => {
        return <GridItem onClick={()=>{alert(index)}} key={index}>{item}</GridItem>;
      });
    }
  };

  const showContent = () => {
    return state.content.map((content: string, index: number) => {
      return <GridContainer  onClick={()=>{alert(index)}}>{showItems(content)}</GridContainer>;
    });
  };

  const handleEditTemplateId = () => {
    //check if input is empty
    if (inputTemplateId === "") return alert("Please enter a template id");

    // if input contains spaces
    if (inputTemplateId.includes(" "))
      return alert("You cannot have spaces in your template id");

    // if input contains anything but letters and numbers
    if (inputTemplateId.match(/[^a-zA-Z0-9]/g))
      return alert("You can only use letters and numbers in your template id");

    setLocalTemplateId(inputTemplateId);

    setModal(false);
  };

  const handleSort = (e: any, index: any) => {

    let tempArr: any = []
    // let anotherArr = state.content

    



    for (let i = 0; i < state.content.length; i++) {

    



          // console.log(state.content[j][index], 'is more than', state.content[i][index])
          tempArr.push(state.content[i])

        
        // else tempArr.unshift(state.content[i])

    }



    let newArr = tempArr.sort((a: any, b: any) => {
      console.log('hey', a[index], b[index])
      return a[index] - b[index]
    })

    console.log(newArr, 'newArr')
    setState({
      headers: state.headers,
      content: newArr
    })
  };

  return (
    <ParsedDataComponentWrapper>
      {parsedSideInfoIsVisible && (
        <>
          <Exit onExit={handleExit} darkMode={darkMode} />

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
                  height="100px"
                >
                  <StyledModalInput
                    type="text"
                    value={inputTemplateId}
                    onChange={(e) => setInputTemplateId(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      handleEditTemplateId();
                    }}
                    label="Submit"
                  />
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
      <ParsedTableWrapper>
        <>
          <div>
            {!newReturnedHeaders ? (
              <p>Loading...</p>
            ) : (
              <ParsedTableResultsWrapper
                parsedSideInfoIsVisible={parsedSideInfoIsVisible}
              >
                <GridContainer>
                  {state.headers.map((header: string, index: number) => {
                    return <GridItem key={index}>{header} <button onClick={(e)=>{handleSort(e, index)}}>sort</button></GridItem>;
                  })}
                </GridContainer>
                {showContent()}
              </ParsedTableResultsWrapper>
            )}
          </div>
          <button
            onClick={() => {
              console.log(state);
            }}
          >
            click me to render state
          </button>
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
