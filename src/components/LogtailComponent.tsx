import React from 'react'
import styled from 'styled-components'


const LogtailComponentWrapper = styled.section<StyledLogtailType>`

background-color: #26374C;
margin: 10px;
overflow: hidden;
resize: horizontal;
max-width: ${(props) => props.templateIsVisible ? '70vw' : '97vw'};
min-width: ${(props) => props.templateIsVisible ? '30vw' : '97vw'};
height: ${(props) => props.wordCloudIsVisible ? '47vh' : '100vw'};
width: ${(props) => props.templateIsVisible ? '45vw' : '90vw'};
overflow: auto;
` 


export default function LogtailComponent(props: LogtailComponentProps) {
    return (
        <LogtailComponentWrapper templateIsVisible={props.templateIsVisible} wordCloudIsVisible={props.wordCloudIsVisible} >
            This is the LogtailComponent 
            This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent  This is the LogtailComponent
        </LogtailComponentWrapper>
    )
}

type StyledLogtailType = {
    templateIsVisible?: boolean;
    wordCloudIsVisible?: boolean;
  };

interface LogtailComponentProps {
    templateIsVisible: boolean;
    wordCloudIsVisible: boolean;
  }