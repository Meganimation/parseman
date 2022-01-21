import { type } from "os";
import React, {useState, useEffect} from "react";
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
  resize: vertical;
  color: ${(props) => (props.darkMode ? "white" : "#26374b")};
  overflow: hidden;
  max-width: 100vw;
  min-height: 6vh;
  overlow: auto;
`;

const Text = styled.div<StyledWordCloudType>`
  padding-right: 10px;
  font-size: ${(props) => props.handleFontSize(props.count)};
  position: relative;
`;

const WordsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

  width: 100%;
`;

export default function WordCloudComponent(props: IWordCloudComponentProps) {

    const wordCloudData: any = useSelector(
        (state: RootState) => state.returnedData.wordCloudData
      );

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (wordCloudData.length > 0) {
          setLoading(false);
        }
    else {
        setLoading(true);
    
        const URL = SelectorsHelper.getURL(CURRENT_ENVIRONMENT_TYPE, "wordCloud/nonNumerical");
    
        let urlWithString = `${URL}/1/2020-01-17/2022-01-17?filter=build&from=500&to=0`;
    
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
            });
    
        console.log("useEffect", wordCloudData);}
    
      }, [wordCloudData, dispatch]);

  const handleFontSize = (wordcount: any) => {
    return Math.log(wordcount) * 1 - 1 / 2 + "rem";
  };

  const mapWords = (tempData: any[]) => {
    // will likely need to sort by count before initializing

    return tempData.map((word: any, key: number) => {
      return (
        <Text key={key} count={word.count} handleFontSize={handleFontSize}>
 {word.word}
        </Text>
      );
    });
  };

  if (!wordCloudData)
  return <div >That word brought back 0 results, try again!</div>;

  return (
    <>
      <WordCloudComponentWrapper darkMode={props.darkMode}>
        <WordsContainer>{mapWords(wordCloudData)}</WordsContainer>
      </WordCloudComponentWrapper>
    </>
  );
}

type StyledWordCloudType = {
  darkMode?: boolean;
  count?: number;
  handleFontSize?: any;
};

interface IWordCloudComponentProps {
  darkMode?: boolean;
}
