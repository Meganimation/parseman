import React from 'react'
import styled from 'styled-components'



const TemplateTableComponentWrapper = styled.section<StyledTemplateType>`
overflow: auto;
background-color:${(props) => props.darkMode ? '#26374C; ' : 'white'};
height: ${(props) => props.wordCloudIsVisible ? '47vh' : '35vw'};
margin: 10px;

` 

const TableWrapper = styled.div`
`

export default function TemplateTableComponent(props: TemplateTableComponentProps) {
    return (
        <>
        <TemplateTableComponentWrapper wordCloudIsVisible={props.wordCloudIsVisible} darkMode={props.darkMode}>
            
            <TableWrapper>This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent
            </TableWrapper>
        </TemplateTableComponentWrapper>
        </>
    )
}

type StyledTemplateType = {
    templateIsVisible?: boolean;
    wordCloudIsVisible?: boolean;
    darkMode?: boolean;
    
  };

interface TemplateTableComponentProps {
    templateIsVisible: boolean;
    darkMode?: boolean;
    wordCloudIsVisible: boolean;
  }