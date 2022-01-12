import React from "react";
import styled from "styled-components";

const TemplateTableComponentWrapper = styled.section<StyledTemplateType>`
  background-color: ${(props) => (props.darkMode ? "#1C2937; " : "white")};
  border-radius: 10px;
  overflow: auto;
  height: ${(props) => (props.wordCloudIsVisible ? "49vh" : "35vw")};
`;

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
`;

const TableHeader = styled.h2`
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

const TableContent = styled.div`
  border-top: 1px solid #2d4460;
  margin: 3px;
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
      "bedue 2823b3 did290 2k3o3 dkdososb290 2k3o3 dkdososb290 2k3o3 dkdososb290 2k3o3 dkdososbdd e",
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
        <TableWrapper>
          <div>
            <TableHeader>
              <h2>Template Id</h2>
            </TableHeader>

            {testData.map((data) => (
              <TableContent>
                <input type="radio" />
                <b>{data.templateId}</b>
              </TableContent>
            ))}
          </div>

          <div>
            <TableHeader>
              <h2>Template Literal</h2>
            </TableHeader>

            {testData.map((data) => (
              <TableContent>
                <code>{data.templateLiteral}</code>
              </TableContent>
            ))}
          </div>

          <div>
            <TableHeader>
              <h2>Total Logs</h2>
            </TableHeader>

            {testData.map((data) => (
              <TableContent>
                <i>{data.totalLogs}</i>
              </TableContent>
            ))}
          </div>
        </TableWrapper>
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
