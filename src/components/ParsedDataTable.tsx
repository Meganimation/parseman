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
`;

const showContent = (props: any) => {
  return props.content.map((content: string, index: number) => {
    return (
      <GridContainer
        onClick={() => {
          alert(index);
        }}
      >
        {showItems(content)}
      </GridContainer>
    );
  });
};

const showItems = (content: any) => {
  if (content.length === 0) return <p>No data</p>;
  else {
    return content.map((item: any, index: any) => {
      return (
        <GridItem
          onClick={() => {
            alert(index);
          }}
          key={index}
        >
          {item}
        </GridItem>
      );
    });
  }
};

const displayCorrectSortButton = (index: number, props: any) => {
  //TODO: make the buttons and sort functionalitu for these
  let areAllSameValues = props.content.every(
    (item: any) => item[index] === props.content[0][index]
  );
  let onlyContainsNumbers = props.content[0][index].match(/[^0-9]/g);
  let containsLetters = props.content[0][index].match(/[a-zA-Z]/g);

  //set a variable where props.content[0] only contains letters from the alphabet and not numbers
  let onlyContainsLetters = props.content[0][index].match(/[^a-zA-Z]/g);
  if (areAllSameValues) return <div> THESE ARE ALL DUPES</div>;
  if (onlyContainsLetters && containsLetters)
    return (
      <button
        onClick={(e) => {
          props.handleAllSort(e, index);
        }}
      >
        CONTAINS LETTERS Sort By
        {props.arrOfSortBools[index] === "ascending" ? "highest" : "lowest"}
      </button>
    );


  if (!onlyContainsNumbers)
    return (
      <button
        onClick={(e) => {
          props.handleSort(e, index);
        }}
      >
        ALLNUMS Sort By
        {props.arrOfSortBools[index] === "ascending" ? "highest" : "lowest"}
      </button>
    );
  if (containsLetters)
    return (
      <button
        // onClick={(e) => {
        //   props.handleAllSort(e, index);
        // }}
      >
        CHELLLLO
        {props.arrOfSortBools[index] === "ascending" ? "highest" : "lowest"}
      </button>
    );
  else
    return (
      <button
        onClick={(e) => {
          props.handleNumAndSymSort(e, index);
        }}
      >
        Sort By NUMS AND SYMBOLS
        {props.arrOfSortBools[index] === "ascending" ? "highest" : "lowest"}
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
  handleSort: (e: any, index: number) => void;
  handleNumAndSymSort: (e: any, index: number) => void;
  handleAllSort: any;
  arrOfSortBools: string[];
}

export default ParsedDataTable;
