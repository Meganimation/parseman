import React, { useEffect, useState } from "react";
import SelectorsHelper, {
  CURRENT_ENVIRONMENT_TYPE,
} from "utils/SelectorsHelper";
import { convertToParsed, convertToTemplateList } from "slices/currentDataSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const TemplateTableComponentWrapper = styled.section<StyledTemplateType>`
  background-color: ${(props) => (props.darkMode ? "#1C2937; " : "white")};
  border-radius: 10px;
  overflow: auto;
  height: ${(props) => (props.wordCloudIsVisible ? "54.5vh" : "35vw")};

  font-size: 12px;

`;

const TableHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 5fr 1.5fr;

  position: -webkit-sticky; 
  position: sticky;
  top: 0;

`;


const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 4fr 0.5fr;
  background: #34404E;
  cursor: pointer;
  margin: 0;
  border: 0;
  align-items: center;
  overflow-wrap: break-word;
  word-break: break-all;
  grid-column-gap: 20px;
  border-bottom: 1px solid #C1C1C1;

  &:hover {
    background: #28313B;
  }

`;
const TableHeader = styled.div`
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


let testString =
  " ©2022 SliceUp, Inc All rights reserved. ©2022 SliceUp, Inc All rights reserved. ©2022 SliceUp, Inc All rights reserved. ©2022 SliceUp, Inc All rights reserved.";

export default function TemplateTableComponent(
  props: TemplateTableComponentProps
) {

  const [templateId, setTemplateId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const URL: string = SelectorsHelper.getURL(
      CURRENT_ENVIRONMENT_TYPE,
      "templateList"
    );

    let urlWithString = `${URL}/1/2020-01-17/2022-01-17?filter=build&from=500&to=0`;

    if (!props.templateListData.length)
      fetch(urlWithString)
        .then((res) => {
          if (!res.ok) {
            throw Error(`Error code: ${res.status}. Please try again.`);
          }
          return res.json();
        })
        .then((data) => {
          //@ts-ignore
          dispatch(convertToTemplateList(data));
          console.log(data);
     

        })
        .catch((err) => {
          console.log(err.message);
        });
    // }
  }, [props.templateListData, dispatch]);

  if (!props.templateListData) return <h1>Loading...</h1>;

  return (
    <>
      <TemplateTableComponentWrapper
        wordCloudIsVisible={props.wordCloudIsVisible}
        darkMode={props.darkMode}
      >
        <TableHeaderWrapper>
          <TableHeader >
            <h2  >Template Id</h2>
          </TableHeader>

          <TableHeader>
            <h2>Template Literal</h2>
          </TableHeader>

          <TableHeader>
            <h2>Total Logs</h2>
          </TableHeader>
        </TableHeaderWrapper>

          <>
            {props.templateListData.map((data: any) => (
              <TableWrapper onClick={()=>{props.handleCheckedRadio(data.templateId, data.templateVersion, data.templateLiteral)}}>
                <div > <StyledRadio type="radio" checked={props.checkedTemplateId === data.templateId} /> {data.templateId} </div>
                <div>{data.templateLiteral}</div>
                <div>{data.totalTemplates}</div>
              </TableWrapper>
            ))}
          </>

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
  templateListData?: any;
  updateTailSearchResultsHandler?: any;
  handleCheckedRadio?: any;
  checkedTemplateId?: string;
  
}
