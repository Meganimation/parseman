import React from 'react'
import styled from 'styled-components'

const WordCloudComponentWrapper = styled.section`
height: 17vh;
background-color: #26374C;
margin: 10px;
resize: both;
` 

export default function WordCloudComponent() {
    return (
        <WordCloudComponentWrapper>
            This is the WordCloudComponent
        </WordCloudComponentWrapper>
    )
}
