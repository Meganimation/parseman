import React, { useEffect, useState, useRef, useCallback} from "react";
import styled from "styled-components";
import { RadioButton } from "stories/RadioButton";

const TemplateTableComponentWrapper = styled.section<StyledTemplateType>`
  background-color: ${(props) => (props.darkMode ? "#1C2937 " : "white")};
  border-radius: 10px;
  overflow: auto;
  height: ${(props) => (props.wordCloudIsVisible ? "60vh" : "75vh")};

  font-size: 12px;
`;

const TableHeaderWrapper = styled.div<StyledTemplateType>`
  display: grid;
  grid-template-columns: 1.5fr 4fr 0.5fr;
  background-color: ${(props) => (props.darkMode ? "#1C2937; " : "white")};

  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const TableWrapper = styled.div<StyledTemplateType>`
  display: grid;
  grid-template-columns: 1.5fr 4fr 0.5fr;
  background-color: ${(props) => (props.darkMode ? "#34404E" : "white")};
  cursor: pointer;
  margin: 0;
  border: 0;
  align-items: center;
  overflow-wrap: break-word;
  word-break: break-all;
  grid-column-gap: 20px;
  border-bottom: 1px solid #c1c1c1;

  &:hover {
    background-color: ${(props) => (props.darkMode ? "#28313B" : "lightgrey")};
  }
`;
const TableHeader = styled.div<StyledTemplateType>`
  padding-left: 10px;
  font-size: 0.75em;
  background-color: ${(props) => (props.darkMode ? "#2d4460 " : "white")};
  align-items: center;
  height: 2rem;

  h2 {
    font-size: 1em;
    font-family: "IBM Plex", sans-serif;
    display: inline-block;
    vertical-align: middle;
  }
`;

const RadioButtonWrapper = styled.div`
  &:active {
    transform: translateY(2px);
  }
`;

export default function TemplateTableComponent(
  props: TemplateTableComponentProps
) {

  //deconstruct props
  const { loadingTemplateData, hasMore, handlePagination, templateListData} = props;

  const observer = useRef<any>();

  //@ts-ignore
  const lastElementRef = useCallback(node => {
    if (loadingTemplateData) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && templateListData.length > 1) {
        handlePagination();
      }

    })
    if (node)  observer.current.observe(node);
  }, [loadingTemplateData, hasMore, handlePagination, templateListData]);

  return (
    <>
      <TemplateTableComponentWrapper
        wordCloudIsVisible={props.wordCloudIsVisible}
        darkMode={props.darkMode}
      >
        <TableHeaderWrapper darkMode={props.darkMode}>
          <TableHeader darkMode={props.darkMode}>
            <h2>Template Id</h2>
          </TableHeader>

          <TableHeader darkMode={props.darkMode}>
            <h2>Template Literal</h2>
          </TableHeader>

          <TableHeader darkMode={props.darkMode}>
            <h2>Total Logs</h2>
          </TableHeader>
        </TableHeaderWrapper>
        {props.templateListData.map((data: any, index: any) => {
          if (props.templateListData.length === index + 1) {
            return ( <TableWrapper
              ref={lastElementRef}
                darkMode={props.darkMode}
                onClick={() => {
                  props.handleCheckedRadio(
                    data.templateId,
                    data.templateVersion,
                    data.templateLiteral
                  );
                }}
              >
                <RadioButtonWrapper style={{ paddingLeft: "10px" }}>
    
                  <RadioButton
                    value={data.templateId}
                    checked={data.templateId === props.checkedTemplateId}
                    label={data.templateId}
                  />
                </RadioButtonWrapper>
                <div>{data.templateLiteral}</div>
                <div>{data.totalTemplates}</div>
              </TableWrapper>)
          }
          else {
            return (
              <TableWrapper
                darkMode={props.darkMode}
                onClick={() => {
                  props.handleCheckedRadio(
                    data.templateId,
                    data.templateVersion,
                    data.templateLiteral
                  );
                }}
              >
                <RadioButtonWrapper style={{ paddingLeft: "10px" }}>
    
                  <RadioButton
                    value={data.templateId}
                    checked={data.templateId === props.checkedTemplateId}
                    label={data.templateId}
                  />
                </RadioButtonWrapper>
                <div>{data.templateLiteral}</div>
                <div>{data.totalTemplates}</div>
              </TableWrapper>
            )
          }
         
         
        })}
 
        {loadingTemplateData && <h1>Loading...</h1>}
      {props.error && <h1>Error</h1>}
      </TemplateTableComponentWrapper>
    
    </>
  );
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
  templateListData?: any;
  updateTailSearchResultsHandler?: any;
  handleCheckedRadio?: any;
  checkedTemplateId?: string;
  loadingTemplateData?: boolean;
  error?: boolean;
  handlePagination?: any;
  hasMore?: boolean;
}
