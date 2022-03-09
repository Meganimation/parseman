import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SelectorsHelper, {
  CURRENT_ENVIRONMENT_TYPE,
} from "utils/SelectorsHelper";
import { RootState } from "slices/store";
import { useSelector, useDispatch } from "react-redux";

const WordCloudComponentWrapper = styled.section<StyledWordCloudType>`
  background: ${(props) => (props.darkMode ? "#26374b" : "white")};
  margin: 10px;
  color: ${(props) => (props.darkMode ? "white" : "#26374b")};
  overflow: hidden;
  max-width: 100vw;
  min-height: 50px;
`;

const Text = styled.div<StyledWordCloudType>`
  padding-right: 10px;
  font-family: arial black;
  font-size: ${(props) => handleFontSize(props.amount)};
  opacity: 40%;
  position: relative;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
    opacity: 100%;
  }
`;

const WordsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  width: 100%;
  position: relative;

`;

const handleFontSize = (amount: any) => {
  if (amount < 5) {
    return `${amount / 1.5}vh`;
  } else if (amount < 20) {
    return `${amount / 3}vh`;
  } else if (amount < 50) {
    return `${amount / 4}vh`;
  } else return "3rem";
};

export default function WordCloudComponent(props: IWordCloudComponentProps) {
  const { addWordToInput, darkMode, wordCloudError, loadingWordCloudData, wordCloudData} = props;
 

  const mapWords = (tempData: any[]) => {
    return tempData.map((word: any, key: number) => {
      return (
        <Text
          onClick={() => {
            addWordToInput(word.word);
          }}
          key={key}
          amount={word.totalMatch}
        >
          {word.word}
        </Text>
      );
    });
  };

  return (
    <>
      <WordCloudComponentWrapper darkMode={darkMode}>
      {loadingWordCloudData && !wordCloudError && <>Loading...</>}
      {wordCloudError && <>Error!</>}
        <WordsContainer>{mapWords(wordCloudData)}</WordsContainer>
      </WordCloudComponentWrapper>
  
    </>
  );
}

type StyledWordCloudType = {
  darkMode?: boolean;
  amount?: number;
};

interface IWordCloudComponentProps {
  darkMode?: boolean;
  addWordToInput: (word: string) => void;
  wordCloudData: string[];
  wordCloudError: boolean;
  loadingWordCloudData: boolean;

}
