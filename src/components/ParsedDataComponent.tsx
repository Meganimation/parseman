import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Exit from "stories/Exit";
import { RootState } from "slices/store";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "stories/Modal";
import { Button } from "stories/Button";
import EditIcon from "@material-ui/icons/Edit";
import ParsedDataTable from "./ParsedDataTable";

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

const InfoItem = styled.div`
  margin-top: 2px;
  font-size: 0.8rem;
  width: 15vw;
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
  arrOfSortBools: any[];
}

export default function ParsedDataComponent({
  templateId = "123456789",
  version = "1",
  templateLiteral = "None",
  darkMode = false,
  handleExit = () => {},
  parsedSideInfoIsVisible = true,
  ...props
}: IParsedDataComponentProps) {
  const returnedData: any = useSelector(
    (state: RootState) => state.returnedData.parsedDataSidebarInfo
  );

  const parsedDataRows: any = useSelector(
    (state: RootState) => state.returnedData.parsedDataRows
  );

  const parsedDataHeaders: any = useSelector(
    (state: RootState) => state.returnedData.parsedDataHeaders
  );

  const parsedSortBool: any = useSelector(
    (state: RootState) => state.returnedData.parsedSortBool
  );

  const [modal, setModal] = useState(false);
  const [inputTemplateId, setInputTemplateId] = useState("");
  const [localTemplateId, setLocalTemplateId] = useState(
    returnedData.templateId
  );

  let [state, setState] = useState<ISubmitState>({
    headers: [],
    content: [],
    arrOfSortBools: [],
  });

  useEffect(() => {
    if (returnedData.headers) {
      if (!returnedData) return console.log("no data");
      else {
        setState({
          headers: parsedDataHeaders,
          content: parsedDataRows,
          arrOfSortBools: parsedSortBool,
        });
      }
      setLocalTemplateId(returnedData.templateId);
    }
  }, [returnedData, parsedDataRows, parsedDataHeaders, parsedSortBool]);

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

  const handleSort = (e: unknown, index: number) => {
    if (state.arrOfSortBools[index] === "descending") {
      let tempNewSortArr = [];

      for (let i = 0; i < state.arrOfSortBools.length; i++) {
        if (index === i) tempNewSortArr.push("ascending");
        else tempNewSortArr.push(state.arrOfSortBools[i]);
      }

      let tempArr: string[] = [];
      for (let i = 0; i < state.content.length; i++) {
        tempArr.push(state.content[i]);
      }

      let newArr = tempArr.sort((a: any, b: any) => {
        return a[index] - b[index];
      });

      setState({
        headers: state.headers,
        content: newArr,
        arrOfSortBools: tempNewSortArr,
      });
    } else if (state.arrOfSortBools[index] === "ascending") {
      let tempNewSortArr = [];

      for (let i = 0; i < state.arrOfSortBools.length; i++) {
        if (index === i) tempNewSortArr.push("descending");
        else tempNewSortArr.push(state.arrOfSortBools[i]);
      }

      let tempArr: string[] = [];
      for (let i = 0; i < state.content.length; i++) {
        tempArr.unshift(state.content[i]);
      }

      let newArr = tempArr.sort((a: any, b: any) => {
        return b[index] - a[index];
      });

      setState({
        headers: state.headers,
        content: newArr,
        arrOfSortBools: tempNewSortArr,
      });
    }
  };

  const handleNumAndSymSort = (e: unknown, index: number) => {
    if (state.arrOfSortBools[index] === "descending") {
      let tempNewSortArr = [];
      let tempArr: string[] = [];

      for (let i = 0; i < state.arrOfSortBools.length; i++) {
        if (index === i) tempNewSortArr.push("ascending");
        else tempNewSortArr.push(state.arrOfSortBools[i]);
      }

      for (let i = 0; i < state.content.length; i++) {
        tempArr.push(state.content[i]);
      }

      let newArr = tempArr.sort((a: any, b: any) => {
        //if a[index] contains anything but a number, remove it and return the new string as a seperate value
        let aNum = a[index].replace(/[^0-9]/g, "");
        let bNum = b[index].replace(/[^0-9]/g, "");

        return aNum - bNum;
      });

      setState({
        headers: state.headers,
        content: newArr,
        arrOfSortBools: tempNewSortArr,
      });
    } else if (state.arrOfSortBools[index] === "ascending") {
      let tempNewSortArr = [];

      for (let i = 0; i < state.arrOfSortBools.length; i++) {
        if (index === i) tempNewSortArr.push("descending");
        else tempNewSortArr.push(state.arrOfSortBools[i]);
      }

      let tempArr: string[] = [];
      for (let i = 0; i < state.content.length; i++) {
        tempArr.unshift(state.content[i]);
      }

      let newArr = tempArr.sort((a: any, b: any) => {
        return b[index] - a[index];
      });

      setState({
        headers: state.headers,
        content: newArr,
        arrOfSortBools: tempNewSortArr,
      });
    }
  };

  const handleAllSort = (e: unknown, index: number) => {
    if (state.arrOfSortBools[index] === "descending") {
      let tempNewSortArr = [];
      let tempArr: string[] = [];

      for (let i = 0; i < state.arrOfSortBools.length; i++) {
        if (index === i) tempNewSortArr.push("ascending");
        else tempNewSortArr.push(state.arrOfSortBools[i]);
      }

      for (let i = 0; i < state.content.length; i++) {
        tempArr.push(state.content[i]);
      }
      console.log("this one?");
      let newArr = tempArr.sort((a: any, b: any) => {
        //This will likely need
        let aNum = a[index].replace(/[^0-9]/g, "");
        let bNum = b[index].replace(/[^0-9]/g, "");
        console.log("one", aNum, bNum);

        return aNum - bNum;
      });

      setState({
        headers: state.headers,
        content: newArr,
        arrOfSortBools: tempNewSortArr,
      });
    } else if (state.arrOfSortBools[index] === "ascending") {
      let tempNewSortArr = [];

      for (let i = 0; i < state.arrOfSortBools.length; i++) {
        if (index === i) tempNewSortArr.push("descending");
        else tempNewSortArr.push(state.arrOfSortBools[i]);
      }

      let tempArr: string[] = [];
      for (let i = 0; i < state.content.length; i++) {
        tempArr.unshift(state.content[i]);
      }

      let newArr = tempArr.sort((a: any, b: any) => {
        //This will likely need
        let aNum = a[index].replace(/[^0-9]/g, "");
        let bNum = b[index].replace(/[^0-9]/g, "");
        console.log("one", aNum, bNum);

        return bNum - aNum;
      });

      console.log("hi?");

      setState({
        headers: state.headers,
        content: newArr,
        arrOfSortBools: tempNewSortArr,
      });
    }
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
      <ParsedDataTable
        parsedDataHeaders={parsedDataHeaders}
        headers={state.headers}
        content={state.content}
        arrOfSortBools={state.arrOfSortBools}
        handleSort={handleSort}
        handleNumAndSymSort={handleNumAndSymSort}
        handleAllSort={handleAllSort}
      />
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
