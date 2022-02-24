import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SelectorsHelper, {
  CURRENT_ENVIRONMENT_TYPE,
} from "utils/SelectorsHelper";
import { convertToWordCloud } from "slices/currentDataSlice";
import { RootState } from "slices/store";
import { useSelector, useDispatch } from "react-redux";

const WordCloudComponentWrapper = styled.section<StyledWordCloudType>`
  background: ${(props) => (props.darkMode ? "#26374b" : "white")};
  margin: 10px;
  color: ${(props) => (props.darkMode ? "white" : "#26374b")};
  overflow: hidden;
  max-width: 100vw;
  overlow: auto;
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
  const { addWordToInput, darkMode } = props;

  const wordCloudData: any = useSelector(
    (state: RootState) => state.returnedData.wordCloudData
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([false, ""]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (wordCloudData.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);

      const URL = SelectorsHelper.getURL(
        CURRENT_ENVIRONMENT_TYPE,
        "wordCloud/nonNumerical"
      );

      let urlWithString = `${URL}/1/2020-01-17/2022-01-25?filter=test&from=50&to=0`;

      if (!wordCloudData.length)
        fetch(urlWithString)
          .then((res) => {
            if (!res.ok) {
              throw Error(`Error code: ${res.status}. Please try again.`);
            }
            return res.json();
          })
          .then((data) => {
            //@ts-ignore
            dispatch(convertToWordCloud(data));
            console.log(data);
          })
          .catch((err) => {
            console.log(err.message);
            setError([true, err.message]);
          });

      console.log("useEffect", wordCloudData);
    }
  }, [wordCloudData, dispatch]);

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

  if (!wordCloudData)
    return <div>That word brought back 0 results, try again!</div>;

  return (
    <>
      <WordCloudComponentWrapper darkMode={darkMode}>
        <WordsContainer>{mapWords(wordCloudData)}</WordsContainer>
      </WordCloudComponentWrapper>
      {loading && !error[0] && <>Loading...</>}
      {/* {error[0] && <>{error[1]}</>} */}
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
}
