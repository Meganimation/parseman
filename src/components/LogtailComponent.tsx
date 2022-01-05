import React from 'react'
import styled from 'styled-components'


const LogtailComponentWrapper = styled.section<StyledLogtailType>`

background-color:${(props) => props.darkMode ? '#26374C; ' : 'white'};
margin: 17px;
overflow: hidden;
resize: horizontal;
max-width: ${(props) => props.templateIsVisible ? '65vw' : '97vw'};
min-width: ${(props) => props.templateIsVisible ? '30vw' : '97vw'};
height: ${(props) => props.wordCloudIsVisible ? '47vh' : '35vw'};
width: ${(props) => props.templateIsVisible ? '45vw' : '90vw'};
overflow: auto;
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