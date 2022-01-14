import React from "react";
import styled from "styled-components";

const TemplateTableComponentWrapper = styled.section<StyledTemplateType>`
  background-color: ${(props) => (props.darkMode ? "#1C2937; " : "white")};
  border-radius: 10px;
  overflow: auto;
  height: ${(props) => (props.wordCloudIsVisible ? "49vh" : "35vw")};

  font-size: 12px;
  border-top: 10px solid #1c2937;
`;

const TableHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;

`;


const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  background: #34404E;
  cursor: pointer;
  margin: 0;
  border: 0;
  align-items: center;

  &:hover {
    background: #28313B;
  }

`;
const TableHeader = styled.h2`
  padding-left: 10px;
  font-size: 0.75em;
  background: #2d4460;
  align-items: center;
  height: 2rem;

  h2 {
    font-size: 1em;
    font-family: "IBM Plex", sans-serif;
    display: inline-block;
    vertical-align: middle;
  }
`;


const StyledRadio = styled.input`
  margin-right: 10px;
`;

const testData = [
  {
    templateId: 1234433,
    templateLiteral: "bedue 2823b3 did290 2k3o3 dkdososbdd e",
    totalLogs: 12,
  },
  {
    templateId: 12311433,
    templateLiteral:
      "bedue 2823b3 did290 2k3o3 dkdososb290 2k3o3 dkdososb290 2k3o3 dkdososb290 2 dkdososb290 2k3o3 dkdososb290 2k3o3 dkdososb k3o3 dkdososbdd e",
    totalLogs: 112,
  },
];

let testString =
  " ©2022 SliceUp, Inc All rights reserved. ©2022 SliceUp, Inc All rights reserved. ©2022 SliceUp, Inc All rights reserved. ©2022 SliceUp, Inc All rights reserved.";
export default function TemplateTableComponent(
  props: TemplateTableComponentProps
) {
  return (
    <>
      <TemplateTableComponentWrapper
        wordCloudIsVisible={props.wordCloudIsVisible}
        darkMode={props.darkMode}
      >
        <TableHeaderWrapper>
          <TableHeader>
            <h2>Template Id</h2>
          </TableHeader>

          <TableHeader>
            <h2>Template Literal</h2>
          </TableHeader>

          <TableHeader>
            <h2>Total Logs</h2>
          </TableHeader>
        </TableHeaderWrapper>

          <div>
            {testData.map((data) => (
              <TableWrapper>
               
                <div> <StyledRadio type="radio" />{data.templateId}</div>
                <div>{data.templateLiteral}</div>
                <div>{data.totalLogs}</div>
              </TableWrapper>
            ))}
          </div>

        <p>{testString}</p>
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
}
