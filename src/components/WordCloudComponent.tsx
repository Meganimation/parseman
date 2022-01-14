import { type } from 'os'
import React from 'react'
import styled from 'styled-components'

const WordCloudComponentWrapper = styled.section<StyledWordCloudType>`
height: 9vh;
background: ${(props) => props.darkMode ? '#26374b' : 'white'};
margin: 10px;
resize: horizontal;
margin: 10px;
color: ${(props) => props.darkMode ? 'white' : '#26374b'};

overflow: hidden;
resize: horizontal;
max-width: 100vw;

overflow: auto;
    resize: vertical;
` 

const Text = styled.div`
padding: 10px;

`

const WordsContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    align-content: center;
    overflow: hidden;
    width: 100%;


    overflow: auto;

`

const tempData = [
    {word: 'test', count: 1},
    {word: 'test2', count: 2},
    {word: 'test3', count: 3},
    {word: 'test4', count: 4},
    {word: 'test5', count: 5},
    {word: 'test6', count: 6},
    {word: 'test7', count: 7},
    {word: 'test8', count: 8},
    {word: 'test9', count: 9},
    {word: 'test10', count: 10},
    {word: 'test11', count: 11},
    {word: 'test12', count: 12},
]

export default function WordCloudComponent(props: IWordCloudComponentProps) {


    const mapWords = (tempData: any[]) => {
        return tempData.map((word: any) => {
            return <Text>{word.word}</Text>
        })
    }

    return (
        <>
        <WordCloudComponentWrapper darkMode={props.darkMode}>
            <WordsContainer>
            {mapWords(tempData)}
            </WordsContainer>
        </WordCloudComponentWrapper>
        </>

    )
}

type StyledWordCloudType = {
    darkMode?: boolean;
};


interface IWordCloudComponentProps {
    darkMode?: boolean;
}