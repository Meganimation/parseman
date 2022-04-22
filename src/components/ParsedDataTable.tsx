import React from "react";
import styled from "styled-components";

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

  div {
    display: none;
    opacity: 0;
  }

  &:hover {
    div {
      display: block;
      position: relative;
      top: 1%;
    
      background: rgba(51, 170, 51, 1);
      height: 100px;
      z-index: 999999999;
      opacity: 0.9;
    }
    height: 0px;
  }
`;

const Tooltip = styled.div`
 
`

const showContent = (props: any) => {
  return props.content.map((content: string, index: number) => {
    return (
      <GridContainer
        onClick={() => {
          alert(index);
        }}
      >
        {showItems(content, props)}
      </GridContainer>
    );
  });
};

const showItems = (content: any, props: any) => {
  if (content.length === 0) return <p>No data</p>;
  else {
    return content.map((item: any, index: any) => {
      return (<>

        <GridItem
          onClick={() => {
            props.highlightOnTemplateLiteral(index, item)
          }}
          key={index}
        >
                 
         
          {item}
          <Tooltip> Amount of Duplicates: 33</Tooltip>
        </GridItem>
        </>
      );
    });
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
  let containsMonths = props.content.every(
    (item: any) => item[index].toLowerCase().match(
      /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/g
    ))

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
  return (
    <ParsedTableWrapper>
      {!props.parsedDataHeaders ? (
        <p>Loading...</p>
      ) : (
        <ParsedTableResultsWrapper>
          <GridContainer>
            {props.headers.map((header: string, index: number) => {
              return (
                <GridItem key={index}>
                  {header}
                  {displayCorrectSortButton(index, props)}
                </GridItem>
              );
            })}
          </GridContainer>
          {showContent(props)}
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
  highlightOnTemplateLiteral: any;
}

export default ParsedDataTable;
