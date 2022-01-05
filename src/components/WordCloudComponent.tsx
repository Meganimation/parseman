import { type } from 'os'
import React from 'react'
import styled from 'styled-components'

const WordCloudComponentWrapper = styled.section<StyledWordCloudType>`
height: 15vh;
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

`
export default function WordCloudComponent(props: IWordCloudComponentProps) {
    return (
        <>
        <WordCloudComponentWrapper darkMode={props.darkMode}>
            <Text>
            This is the WordCloudComponent
            This is the WordCloudComponent
            This is the WordCloudComponent
            This is the WordCloudComponent
            This is the WordCloudComponent
            This is the WordCloudComponent
            </Text>
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