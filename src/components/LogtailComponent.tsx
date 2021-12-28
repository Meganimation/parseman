import React from 'react'
import styled from 'styled-components'

// 825px

const LogtailComponentWrapper = styled.section`
height: 65vh;
width: 45vw;
background-color: #26374C;
margin: 10px;

overflow: hidden;
resize: horizontal;
max-width: 80vw;
min-width: 30vw;
overflow: auto;
` 


export default function LogtailComponent() {
    return (
        <LogtailComponentWrapper>
            This is the LogtailComponent
            This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent
        </LogtailComponentWrapper>
    )
}
