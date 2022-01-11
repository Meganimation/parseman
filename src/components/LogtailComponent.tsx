import React from 'react'
import styled from 'styled-components'

//background-color:${(props) => props.darkMode ? '#26374C; ' : 'white'};
const LogtailComponentWrapper = styled.section<StyledLogtailType>`
overflow: hidden;
resize: horizontal;
max-width: ${(props) => props.templateIsVisible ? '60vw' : '95vw'};
min-width: ${(props) => props.templateIsVisible ? '30vw' : '95vw'};
height: ${(props) => props.wordCloudIsVisible ? '43vh' : '35vw'};
width: ${(props) => props.templateIsVisible ? '45vw' : '90vw'};
overflow: auto;
padding: 20px;

background-color:${(props) => props.darkMode ? '#1C2937; ' : 'white'};
border-radius: 10px;
` 


export default function LogtailComponent(props: LogtailComponentProps) {
    return (
        <LogtailComponentWrapper templateIsVisible={props.templateIsVisible} wordCloudIsVisible={props.wordCloudIsVisible} darkMode={props.darkMode} >
            This is the LogtailComponent 
            This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent
        </LogtailComponentWrapper>
    )
}

type StyledLogtailType = {
    templateIsVisible?: boolean;
    wordCloudIsVisible?: boolean;
    darkMode: boolean;
  };

interface LogtailComponentProps {
    templateIsVisible: boolean;
    wordCloudIsVisible: boolean;
    darkMode: boolean;
  }