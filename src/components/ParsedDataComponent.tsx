import React from 'react'
import styled from 'styled-components'

const ParsedDataComponentWrapper = styled.section`
height: 65vh;
background-color: #f5f5f5;
` 

export default function ParsedDataComponent() {
    return (
        <ParsedDataComponentWrapper>
            This is the ParsedDataComponent
        </ParsedDataComponentWrapper>
    )
}
