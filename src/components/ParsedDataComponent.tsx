import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ParsedDataComponentWrapper = styled.section`
  height: 65vh;
  display: flex;
`;

const InfoBar = styled.aside`
  background-color: #26374b;
  margin: 10px;
  width: 15rem;

  resize: horizontal;

`;

const ParsedTableWrapper = styled.div`

    background-color: red;
    height: 100%;
    width: 100%;

`

export default function ParsedDataComponent(props: IParsedDataComponentProps) {
  const [data, setData] = useState("place some data here");

  // useEffect(() => {
  //     if (props.parsedDataIsVisible)
  //   }, [parsedDataIsVisible]);

  return (
    <ParsedDataComponentWrapper>
      <InfoBar>This is the side bar</InfoBar>
      <ParsedTableWrapper>
        This is the ParsedDataComponent
      </ParsedTableWrapper>
    </ParsedDataComponentWrapper>
  );
}

interface IParsedDataComponentProps {
  parsedDataIsVisible?: boolean;
}
