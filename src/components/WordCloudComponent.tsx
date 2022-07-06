import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SelectorsHelper, {
  CURRENT_ENVIRONMENT_TYPE,
} from "utils/SelectorsHelper";
import { RootState } from "slices/store";
import { useSelector, useDispatch } from "react-redux";
import {colors} from "utils/theme/colors"

const WordCloudComponentWrapper = styled.section<StyledWordCloudType>`
  background: ${(props) => (props.darkMode ? colors.lighterBlue : colors.white)};
  margin: 10px;
  color: ${(props) => (props.darkMode ? colors.white : colors.lighterBlue)};
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

  if (loadingWordCloudData && !wordCloudError) return <div>Loading...</div>;
  if (wordCloudError) return <div>Error</div>;

  return (
    <>
      <WordCloudComponentWrapper darkMode={darkMode}>
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
