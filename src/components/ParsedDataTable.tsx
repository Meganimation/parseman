import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tooltip from "stories/Tooltip/Tooltip";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { RootState } from "slices/store";
import { Modal } from "stories/Modal";
import { Table } from "stories/Table";


const ParsedTableWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

function ParsedDataTable(props: IParsedDataComponentProps) {
  const [editInput, setEditInput] = useState([0, 0, 0]);
  const [inputValue, setInputValue] = useState("");
  const [nicknamedHeaders, setNicknamedHeaders] = useState(props.headers);
  const hashedData: any = useSelector(
    (state: RootState) => state.returnedData.HASHED_DATA
  );

  useEffect(() => {
    setNicknamedHeaders(props.headers);
  }, [props.headers]);

  const handleEditHeaders = (inputValue: any, headerToReplace: any) => {
    let newArr: any = [...nicknamedHeaders];
    newArr[props.headers.indexOf(headerToReplace)] = inputValue;

    setNicknamedHeaders(newArr)
  };

  const handleEditSubmit = () => {
    setEditInput([0, 0, 0]);
    handleEditHeaders(inputValue, editInput[2]);
    return props.postNewHeaderName(
      inputValue,
      editInput[2],
      props.templateId,
      props.templateVersion
    );
  };

  const showItemsTWO = (content: any) => {
    const totalQtyOfItemValue = (value: string, index: any) => {
    let totalQtyOfItem = 0;

    for (let i = 0; i < hashedData[props.headers[index]].length; i++) {
      if (hashedData[props.headers[index]][i] === value) {
        totalQtyOfItem++;
      }
    }

    return totalQtyOfItem;
  }
  if (content.length === 0) return <p>No data</p>;
  else {
    return (
      content.map((column: any, index: any) => {
        return (
          <tr key={index}>
            {column.map((item: any, index: any) => {
              return <td key={index}>
                <Tooltip
                  tooltipComponent={
                    <div>total qty: {totalQtyOfItemValue(item, index)}</div>
                  }
                >
                  <span>{item}</span>
                </Tooltip></td>
            })}
          </tr>
        );
      }
      ))
  };
}

  const loopThroughHeadersARR = (props: any) => {
    let arr = [];
    for (let i = 0; i < props.headers.length; i++) {
      arr.push(nicknamedHeaders[i] ? nicknamedHeaders[i] : props.headers[i]);
    }
    return arr;
  };

  if (props.headers.length < 1) return <div>Loading...</div>
  else return (
    <>
      <ParsedTableWrapper >
        <Table stuff={props} templateId={props.templateId} setIsHeaderOnHover={props.setIsHeaderOnHover} setEditInput={setEditInput} displayCorrectSortButton={props.displayCorrectSortButton} tableContent={showItemsTWO(props.content)} headers={loopThroughHeadersARR(props)}  minCellWidth={150} />
      </ParsedTableWrapper>
      {editInput[0] !== 0 && editInput[1] !== 0 && (
        <Modal
          top={editInput[0]}
          left={editInput[1]}
          onExit={() => {
            setEditInput([0, 0]);
          }}
          editMode
          darkMode={props.darkMode}
          hasBackground={false}
          placeholder={`${editInput[2]}`}
          onEditSubmit={() => {
            handleEditSubmit();
          }}
          inputValue={inputValue}
          onInputChange={(e: any) => setInputValue(e.target.value)}
        ></Modal>)}

    </>

  );
}

interface IParsedDataComponentProps {
  parsedDataHeaders: string[];
  headers: string[];
  content: string[];
  handleNumberSort: (e: any, index: number) => void;
  handleNumAndSymSort: (e: any, index: number) => void;
  handleDateSort: any;
  handleAllSort: any;
  arrOfSortBools: string[];
  postNewTemplateId: any;
  postNewHeaderName: any;
  darkMode: boolean;
  templateId: string;
  templateVersion: string;
  setIsHeaderOnHover: any;
  parsedDataIsLoading: boolean;
  displayCorrectSortButton: any;
}

export default ParsedDataTable;
