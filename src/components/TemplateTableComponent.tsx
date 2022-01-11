import React from 'react'
import styled from 'styled-components'



const TemplateTableComponentWrapper = styled.section<StyledTemplateType>`
background-color:${(props) => props.darkMode ? '#1C2937; ' : 'white'};
border-radius: 10px;
overflow: auto;
height: ${(props) => props.wordCloudIsVisible ? '43vh' : '35vw'};
padding: 20px;



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