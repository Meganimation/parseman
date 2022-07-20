import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Tooltip from "stories/Tooltip/Tooltip";
import { useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { RootState } from "slices/store";
import { Modal } from "stories/Modal";
import { Table } from "stories/Table";

import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

const ParsedTableWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;


const ParsedTableResultsWrapper = styled.section``;

const GridContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr 1fr;
`;

const GridItem = styled.span`
  background: rgba(51, 170, 51, 0.01);
  text-align: left;
  width: ${(props: { width: string }) => props.width + 2}rem;
  word-break: break-word;
 border: 0.5px solid rgba(51, 170, 51, 0.1);
 padding: 0 0.5rem;
  }
`;

const StyledEditIcon = styled(EditIcon)`
  cursor: pointer;
  opacity: 50%;

  &:hover {
    opacity: 100%;
  }
`;

const SortButton = styled.span`
  cursor: pointer;
  `



// const loopThroughRows = (props: any, hashedData: any) => {
//   let arr = [];

//   for (let i = 0; i < props.content.length; i++) {
//     arr.push(
//       <GridContainer key={i}>
//         {showItems(props.content[i], props, hashedData)}
//       </GridContainer>
//     );
//   }
//   return arr;
// };


// const showItems = (content: any, props: any, hashedData: any) => {
//   const totalQtyOfItemValue = (value: string, index: any) => {
//     let totalQtyOfItem = 0;

//     for (let i = 0; i < hashedData[props.headers[index]].length; i++) {
//       if (hashedData[props.headers[index]][i] === value) {
//         totalQtyOfItem++;
//       }
//     }

//     return totalQtyOfItem;
//   };

//   if (content.length === 0) return <p>No data</p>;
//   else {
//     let arr = [];
//     for (let i = 0; i < content.length; i++) {
//       arr.push(
//         <GridItem width={props.headers[i].length}>
//           <Tooltip
//             tooltipComponent={
//               <div>total qty: {totalQtyOfItemValue(content[i], i)}</div>
//             }
//           >
//             <div> {content[i]}</div>
//           </Tooltip>
//         </GridItem>
//       );
//     }
//     return arr;
//   }
// };


const displayCorrectSortButton = (index: number, props: any) => {

  if (props.content[0][index] === undefined) return console.log('error!') //for now, maybe render a modal that say:
  //"there was an error trying to render the data, try again <button> or something like that" 
  let areAllSameValues = props.content.every(
    (item: any) => item[index] === props.content[0][index]
  );
  //NOTE Added optional chaining below as an app breaking bug occurs 
  //If the user parsed a table, saves, then immeadiate goes to templateList, clicks back
  //and tries to parse a new table, the error will occur
  let onlyContainsNumbers = props.content[0][index].match(/[^0-9]/g);
  let containsLetters = props.content[0][index].match(/[a-zA-Z]/g);
  //set a variable where props.content[0] only contains letters from the alphabet and not numbers
  let onlyContainsLetters = props.content[0][index].match(/[^a-zA-Z]/g);

  //set a variable that checks if props.content[0] contains ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
  let containsMonths = props.content.every((item: any) =>
    item[index]
      .toLowerCase()
      .match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/g)
  );

  if (areAllSameValues) return <ArrowDropUp />;
  if (containsMonths)
    return (
      <SortButton
        onClick={(e) => {
          props.handleDateSort(e, index);
        }}
      >
        {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
      </SortButton>
    );
  if (onlyContainsLetters && containsLetters)
    return (
      <SortButton
        onClick={(e) => {
          props.handleAllSort(e, index);
        }}
      >
        {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
      </SortButton>
    );
  if (!onlyContainsNumbers)
    return (
      <SortButton
        onClick={(e) => {
          props.handleNumberSort(e, index);
        }}
      >
        {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
      </SortButton>
    );
  if (containsLetters)
    return (
      <SortButton
        onClick={(e) => {
          props.handleAllSort(e, index);
        }}
      >
        {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
      </SortButton>
    );
  else
    return (
      <SortButton
        onClick={(e) => {
          props.handleNumAndSymSort(e, index);
        }}
      >
        {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
      </SortButton>
    );
};



// const displayCorrectSortButton = (index: number, props: any) => {
//   if (props.content[0][index] === undefined) return console.log('error!') //for now, maybe render a modal that say:
//   //"there was an error trying to render the data, try again <button> or something like that" 
//   let areAllSameValues = props.content.every(
//     (item: any) => item[index] === props.content[0][index]
//   );
//   //NOTE Added optional chaining below as an app breaking bug occurs 
//   //If the user parsed a table, saves, then immeadiate goes to templateList, clicks back
//   //and tries to parse a new table, the error will occur
//   let onlyContainsNumbers = props.content[0][index].match(/[^0-9]/g);
//   let containsLetters = props.content[0][index].match(/[a-zA-Z]/g);
//   //set a variable where props.content[0] only contains letters from the alphabet and not numbers
//   let onlyContainsLetters = props.content[0][index].match(/[^a-zA-Z]/g);

//   //set a variable that checks if props.content[0] contains ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
//   let containsMonths = props.content.every((item: any) =>
//     item[index]
//       .toLowerCase()
//       .match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/g)
//   );

//   if (areAllSameValues) return <ArrowDropUp />;
//   if (containsMonths)
//     return (
//       <SortButton
//         onClick={(e) => {
//           props.handleDateSort(e, index);
//         }}
//       >
//         {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
//       </SortButton>
//     );
//   if (onlyContainsLetters && containsLetters)
//     return (
//       <SortButton
//         onClick={(e) => {
//           props.handleAllSort(e, index);
//         }}
//       >
//         {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
//       </SortButton>
//     );
//   if (!onlyContainsNumbers)
//     return (
//       <SortButton
//         onClick={(e) => {
//           props.handleNumberSort(e, index);
//         }}
//       >
//         {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
//       </SortButton>
//     );
//   if (containsLetters)
//     return (
//       <SortButton
//         onClick={(e) => {
//           props.handleAllSort(e, index);
//         }}
//       >
//         {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
//       </SortButton>
//     );
//   else
//     return (
//       <SortButton
//         onClick={(e) => {
//           props.handleNumAndSymSort(e, index);
//         }}
//       >
//         {props.arrOfSortBools[index] === "ascending" ? <ArrowDropUp /> : <ArrowDropDown />}
//       </SortButton>
//     );
// };

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



  // const parsedDataIsLoading = useSelector(
  //   (state: RootState) => state.returnedData.parsedDataIsLoading
  // );

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

  // const loopThroughHeaders = (props: any) => {
  //   let arr = [];
  //   for (let i = 0; i < props.headers.length; i++) {
  //     arr.push(
  //       <>
  //         <GridItem key={i}
  //           onMouseEnter={() => { props.setIsHeaderOnHover(props.headers[i]) }}
  //           onMouseLeave={() => { props.setIsHeaderOnHover('none') }}
  //           width={props.headers[i].length}
  //         >

  //           <span
  //             onClick={(e) =>
  //               setEditInput([e.pageY, e.clientX, props.headers[i]])
  //             }

  //             className={props.headers[i]} //done
  //           >
  //             {nicknamedHeaders[i] ? nicknamedHeaders[i] : props.headers[i]}

  //           </span>
  //           {displayCorrectSortButton(i, props)}
  //         </GridItem>
  //       </>
  //     );
  //   }
  //   return arr;
  // };

  const loopThroughHeadersARR = (props: any) => {
    let arr = [];
    for (let i = 0; i < props.headers.length; i++) {
      arr.push(nicknamedHeaders[i] ? nicknamedHeaders[i] : props.headers[i]);
      // arr.push(props.headers[i]);
    }
    return arr;
  };

  if (props.headers.length < 1) return <div>Loading...</div>
  else return (
    // <ParsedTableWrapper>
    //   <ParsedTableResultsWrapper>
    //     {editInput[0] !== 0 && editInput[1] !== 0 && (
    //       <Modal
    //         top={editInput[0]}
    //         left={editInput[1]}
    //         onExit={() => {
    //           setEditInput([0, 0]);
    //         }}
    //         editMode
    //         darkMode={props.darkMode}
    //         hasBackground={false}
    //         placeholder={`${editInput[2]}`}
    //         onEditSubmit={() => {
    //           handleEditSubmit();
    //         }}
    //         inputValue={inputValue}
    //         onInputChange={(e: any) => setInputValue(e.target.value)}
    //       ></Modal>
    //     )}
    //     <GridContainer>{loopThroughHeaders(props)}</GridContainer>
    //     {loopThroughRows(props, hashedData)}
    //   </ParsedTableResultsWrapper>
    //</ParsedTableWrapper>
    <>
      <ParsedTableWrapper >
        <Table stuff={props} setIsHeaderOnHover={props.setIsHeaderOnHover} setEditInput={setEditInput} displayCorrectSortButton={displayCorrectSortButton} tableContent={showItemsTWO(props.content)} headers={loopThroughHeadersARR(props)}  minCellWidth={150} />
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
}

export default ParsedDataTable;
