import React from 'react'
import styled from 'styled-components'



const TemplateTableComponentWrapper = styled.section<StyledTemplateType>`
overflow: auto;
background-color: #26374C;
height: ${(props) => props.wordCloudIsVisible ? '47vh' : '35vw'};
margin: 10px;

` 

const TableWrapper = styled.div`
`

export default function TemplateTableComponent(props: TemplateTableComponentProps) {
    return (
        <>
        <TemplateTableComponentWrapper wordCloudIsVisible={props.wordCloudIsVisible}>
            
            <TableWrapper>This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent This is the TemplateTableComponent
            </TableWrapper>
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