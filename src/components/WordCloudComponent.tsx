import React from 'react'
import styled from 'styled-components'

const WordCloudComponentWrapper = styled.section`
height: 17vh;
background-color: #26374C;
margin: 10px;
resize: horizontal;


background-color: #26374C;
margin: 10px;

overflow: hidden;
resize: horizontal;
max-width: 100vw;

overflow: auto;
    resize: vertical;
` 

const Text = styled.div`

`
export default function WordCloudComponent() {
    return (
        <>
        <WordCloudComponentWrapper>
            <Text>
            This is the WordCloudComponent
            </Text>
        </WordCloudComponentWrapper>
        <div>bjksdbhfsdbhfsbhsfb</div>
        </>

    )
}
