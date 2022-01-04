import React from 'react'
import styled from 'styled-components'



const TemplateTableComponentWrapper = styled.section<StyledTemplateType>`
width: 100%;
overflow: auto;
background-color: #26374C;
height: ${(props) => props.wordCloudIsVisible ? '47vh' : '100vw'};
margin: 10px;
` 


export default function TemplateTableComponent(props: TemplateTableComponentProps) {
    return (
        <>
        <TemplateTableComponentWrapper wordCloudIsVisible={props.wordCloudIsVisible}>
            
            This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent
        </TemplateTableComponentWrapper>
        </>
    )
}

type StyledTemplateType = {
    templateIsVisible?: boolean;
    wordCloudIsVisible?: boolean;
  };

interface TemplateTableComponentProps {
    templateIsVisible: boolean;
    wordCloudIsVisible: boolean;
  }