import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Exit from "stories/Exit";
import { RootState } from "slices/store";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "stories/Modal";
import { Button } from "stories/Button";
import EditIcon from "@material-ui/icons/Edit";
import ParsedDataTable from "./ParsedDataTable";
import { colors } from "utils/theme/colors"

const ParsedDataComponentWrapper = styled.section`
  padding-top: 1rem;
  height: 75vh;
  display: flex;
`;

const InfoBar = styled.aside<StyledParsedTableType>`
  background-color: ${(props) => (props.darkMode ? colors.blue : colors.white)};
  width: 20vw;
  padding: 20px 50px;

  margin-right: 20px;
  position: relative;
  top: -3.55rem;
  left: -5px;
  height: 103%;


  h5 {
    font-family: "Roboto", sans-serif;
    padding: 0 0 10px 0; 
    margin: 0;
   }
`;

const InfoItem = styled.div`
  margin-top: 2px;
  font-size: 0.8rem;
  padding-top: 0.5rem;
  text-align: center;
  font-family: "Roboto", sans-serif;
`;

const ExitWrapper = styled.div` 
position: relative;
top: -1rem;
left: 105%;
&:hover {
 
}
`

const StyledEditTemplateWrapper = styled.div`

  display: flex;
  flexWrap: wrap;
  cursor: pointer;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-left: 10px;
  svg {
    opacity: 0.5;
    padding-left: 10px;
  }

  &:hover {
    transform: scale(1.1);
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
      shadow: 0px 0px 10px ${colors.black};
      box-shadow: 0px 0px 10px ${colors.black};
      position: relative;
      top: -2rem;

      &:focus {
          outline: none;
          shadow: none;
          box-shadow: none;
      }
  `;

const TemplateLiteralWrapper = styled.span<StyledParsedTableType>`
  width: fit-content;
  background: ${(props) => (props.isHeaderOnHover ? colors.lightGrayBlue : 'none')};  
  border: ${(props) => (props.isHeaderOnHover ? `10px solid ${colors.lightGrayBlue}` : 'none')};
  `

const TemplateLiteralContent = styled.div<StyledParsedTableType>`
  overflow-y: auto;
  height: 26.5rem;
  text-align: center;

  
  `

  const SelectInputWrapper = styled.div`
  position: absolute;
  bottom: 15px;


  font-family: "Roboto", sans-serif;
  text-align-last: center;
  font-size: 10px;

  select{
    height: 2rem;
    background: none;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
    transform: scale(1.1);
    }
    padding-left: 0.1rem;

  }
  `

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
  handleExit = () => { },
  parsedSideInfoIsVisible = true,
  postNewTemplateId = () => { },
  postNewHeaderName = () => { },
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

  const parsedDataIsLoading: any = useSelector(
    (state: RootState) => state.returnedData.parsedDataIsLoading
  );

  const parsedSortBool: any = useSelector(
    (state: RootState) => state.returnedData.parsedSortBool
  );
  const [isHeaderOnHover, setIsHeaderOnHover] = useState('none');
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

  console.log("PARSEDDATAHEADERS", parsedDataHeaders);

  const handleEditTemplateId = () => {
    if (!inputTemplateId) return alert('there is no templateId')
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

    postNewTemplateId(inputTemplateId);
  };

  const handleNumberSort = (e: unknown, index: number) => {
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
        let aNum = a[index].replace(/[^0-9]/g, "");
        let bNum = b[index].replace(/[^0-9]/g, "");
        return bNum - aNum;
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

      let newArr = tempArr.sort((a: any, b: any) => {
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
        let aNum = a[index].replace(/[^0-9]/g, "");
        let bNum = b[index].replace(/[^0-9]/g, "");

        return bNum - aNum;
      });

      setState({
        headers: state.headers,
        content: newArr,
        arrOfSortBools: tempNewSortArr,
      });
    }
  };

  const handleDateSort = (e: unknown, index: number) => {
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
        let testA = new Date(a[index]).getTime();
        let testB = new Date(b[index]).getTime();

        return testB - testA;
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
        let testA = new Date(a[index]).getTime();
        let testB = new Date(b[index]).getTime();

        return testA - testB;
      });

      setState({
        headers: state.headers,
        content: newArr,
        arrOfSortBools: tempNewSortArr,
      });
    }
  };

  const showTemplateLiteral = (templateLiteralArray: string[]) => {
    return (templateLiteralArray.map((templateLiteral: string, index: any) => {
      return (
        <TemplateLiteralWrapper key={index} className={templateLiteral} isHeaderOnHover={isHeaderOnHover === templateLiteral}>{templateLiteral}
        </TemplateLiteralWrapper>
      )
    }))

  }



  return (
    <ParsedDataComponentWrapper>
      {parsedSideInfoIsVisible && (
        <>
          <InfoBar darkMode={darkMode}>
          <ExitWrapper>
            <Exit onExit={handleExit} darkMode={darkMode}  iconColor={colors.lightGray}/>
            </ExitWrapper>
            <InfoItem>
          
                <h5>Template Id:</h5> <StyledEditTemplateWrapper onClick={() => {
                  setModal(true);
                }}>{localTemplateId} <EditIcon style={{ transform: "scale(0.6)" }} /></StyledEditTemplateWrapper>
   
          </InfoItem>
          <InfoItem>

              <h5>Version:</h5> <div> {returnedData.version} </div>
  
          </InfoItem>
          <InfoItem>
            <h5>Template Literal:</h5>
            <TemplateLiteralContent >{showTemplateLiteral(props.currentParsedDataTemplateLiteralArray)}</TemplateLiteralContent>
          </InfoItem>

          <SelectInputWrapper>
                Showing top
            <select name="pageAmount" id="pageAmount" onChange={(e) => { props.changeParsedDataPageAmount(e) }}>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
              <option value="200">200</option>
            </select> / 500
          </SelectInputWrapper>
        </InfoBar>
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

        </>
  )
}
<ParsedDataTable
  templateId={localTemplateId}
  templateVersion={returnedData.version}
  parsedDataHeaders={parsedDataHeaders}
  parsedDataIsLoading={parsedDataIsLoading}
  headers={state.headers}
  content={state.content}
  arrOfSortBools={state.arrOfSortBools}
  handleNumberSort={handleNumberSort}
  handleNumAndSymSort={handleNumAndSymSort}
  handleAllSort={handleAllSort}
  handleDateSort={handleDateSort}
  postNewTemplateId={postNewTemplateId}
  darkMode={darkMode}
  postNewHeaderName={postNewHeaderName}
  setIsHeaderOnHover={setIsHeaderOnHover}
/>
    </ParsedDataComponentWrapper >
  );
}

type StyledParsedTableType = {
  templateIsVisible?: boolean;
  wordCloudIsVisible?: boolean;
  darkMode?: boolean;
  background?: any;
  parsedSideInfoIsVisible?: boolean;
  isHeaderOnHover?: boolean;
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
  postNewTemplateId: any;
  updateTemplateLiteral: any;
  postNewHeaderName: any;
  changeParsedDataPageAmount: any;
  parsedDataPageAmount: number;
  currentParsedDataTemplateLiteral: string;
  currentParsedDataTemplateLiteralArray: string[];
}
