import React from "react";
import styled from "styled-components";
import Tooltip from "stories/Tooltip/Tooltip";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "slices/store";

const ParsedTableWrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;
const ParsedTableResultsWrapper = styled.section``;

const GridContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
`;

const GridItem = styled.div`
  background: rgba(51, 170, 51, 0.01);
  border-radius: 3px;
  text-align: left;
  min-width: 150px;
  word-break: break-word;
  }
`;

const loopThroughRows = (props: any, hashedData: any) => {
  let arr = [];

  for (let i = 0; i < props.content.length; i++) {
    arr.push(
      <GridContainer>{showItems(props.content[i], props, hashedData)}</GridContainer>
    );
  }
  return arr;
};

const showItems = (content: any, props: any, hashedData: any) => {
  const totalQtyOfItemValue = (value: string, index: any) => {
    let totalQtyOfItem = 0;

    for (let i = 0; i < hashedData[props.headers[index][0]].length; i++) {
      if (hashedData[props.headers[index][0]][i] === value) {
        totalQtyOfItem++;
      }
    }

    return totalQtyOfItem;
  };

  if (content.length === 0) return <p>No data</p>;
  else {
    let arr = []
    for (let i = 0; i < content.length; i++) {
      arr.push(
        <GridItem
          onClick={() => {
            props.replaceTemplateLiteral(i, content[i]);
          }}
          key={i}
        >
          <Tooltip
            tooltipComponent={
              <div>total qty: {totalQtyOfItemValue(content[i], i)}</div>
            }
          >
            <div> {content[i]}</div>
          </Tooltip>
        </GridItem>
      )
    }
    return arr;
  }
};

const displayCorrectSortButton = (index: number, props: any) => {
  let areAllSameValues = props.content.every(
    (item: any) => item[index] === props.content[0][index]
  );
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

  if (areAllSameValues) return <p> Duplicates Only</p>;
  if (containsMonths)
    return (
      <button
        onClick={(e) => {
          props.handleDateSort(e, index);
        }}
      >
        Contains Date
        {props.arrOfSortBools[index] === "ascending" ? " ^ " : " v "}
      </button>
    );
  if (onlyContainsLetters && containsLetters)
    return (
      <button
        onClick={(e) => {
          props.handleAllSort(e, index);
        }}
      >
        Contains Letters
        {props.arrOfSortBools[index] === "ascending" ? " ^ " : " v "}
      </button>
    );
  if (!onlyContainsNumbers)
    return (
      <button
        onClick={(e) => {
          props.handleNumberSort(e, index);
        }}
      >
        Contains Numbers
        {props.arrOfSortBools[index] === "ascending" ? " ^ " : " v "}
      </button>
    );
  if (containsLetters)
    return (
      <button
        onClick={(e) => {
          props.handleAllSort(e, index);
        }}
      >
        Other
        {props.arrOfSortBools[index] === "ascending" ? " ^ " : " v "}
      </button>
    );
  else
    return (
      <button
        onClick={(e) => {
          props.handleNumAndSymSort(e, index);
        }}
      >
        Contains Numbers and Symbols
        {props.arrOfSortBools[index] === "ascending" ? " ^ " : " v "}
      </button>
    );
};

function ParsedDataTable(props: IParsedDataComponentProps) {
  const hashedData: any = useSelector(
    (state: RootState) => state.returnedData.HASHED_DATA
  );

  const parsedDataIsLoading = useSelector(
    (state: RootState) => state.returnedData.parsedDataIsLoading
  );

  const loopThroughHeaders = (props: any) => {
    let arr = [];
    for (let i = 0; i < props.headers.length; i++) {
      arr.push(
        <GridItem>
          <p
            onMouseOver={() => {
              props.highlightOnTemplateLiteral(i, true);
            }}
            onMouseOut={() => {
              props.highlightOnTemplateLiteral(i, false);
            }}
          >
            {props.headers[i][0]}
          </p>
          {displayCorrectSortButton(i, props)}
        </GridItem>
      );
    }
    return arr;
  };

  return (
    <ParsedTableWrapper>
      {props.parsedDataHeaders.length < 1 ? (
        <p>Loading...</p>
      ) : (
        <ParsedTableResultsWrapper>
          <GridContainer>{loopThroughHeaders(props)}</GridContainer>
          {loopThroughRows(props, hashedData)}
        </ParsedTableResultsWrapper>
      )}
    </ParsedTableWrapper>
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
  replaceTemplateLiteral: any;
  highlightOnTemplateLiteral: any;
}

export default ParsedDataTable;
