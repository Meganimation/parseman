import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Exit from "stories/Exit";
import { RootState } from "slices/store";
import { useSelector, useDispatch } from "react-redux";

const ParsedDataComponentWrapper = styled.section`
  height: 75vh;
  display: flex;
`;

const InfoBar = styled.aside`
  background-color: (props) => (props.darkMode ? "#182331": "white");
  margin: 10px;
  max-width: 27vw;
  resize: horizontal;
  overflow-y: auto;
  display: grid;
  flex-direction: column;
  grid-template-columns: 0.2fr 1fr;
`;

const ParsedTableWrapper = styled.div`
  background-color: red;
  height: 100%;
  width: 100%;
`;

const InfoItem = styled.div`
  margin-top: 2px;
  font-size: 0.8rem;
`;

const ParsedTableResultsWrapper = styled.section<StyledParsedTableType>`
  background-color: ${(props) => (props.darkMode ? "#1C2937; " : "white")};
  border-radius: 10px;
  overflow: auto;
  height: 50vh;

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



export default function ParsedDataComponent({
  templateId = "123456789",
  version = "1",
  templateLiteral = "20px",
  darkMode = false,
  handleExit = () => {},
  parsedSideInfoIsVisible = true,
  ...props
}: IParsedDataComponentProps) {


      const parsedData: any = useSelector(
        (state: RootState) => state.returnedData.parsedData
      );



  const [data, setData] = useState("place some data here");

  const temptemplateData =
    "<<<TIMESTAMP>>> INFO org.apache.hadoop.hdfs.StateChange : Na166 9381672_879402 1pam_unix(sshd : auth): authentication failure; logname = uid = 0 euid = 0 tty = ssh ruser = rhost = 106.51.76.14 user = root<<<TIMESTAMP>>> INFO org.apache.hadoop.hdfs.StateChange : Na1669381672_879402 1pam_unix(sshd : auth): authentication failure; logname = uid = 0 euid = 0 tty = ssh ruser = rhost = 106.51.76.14 user = root<<<TIMESTAMP>>> INFO org.apache.hadoop.hdfs.StateChange : Na1669381672_879402 1pam_unix(sshd : auth): authentication failure; logname = uid = 0 euid = 0 tty = ssh ruser = rhost = 106.51.76.14 user = 73 root<<<TIMESTAMP>>> INFO org.apache.hadoop.hdfs.StateChange : Na1669381672_879402 1pam_unix(sshd : auth): authentication failure; logname = uid = 0 euid = 0 tty = ssh ruser = rhost = 106.51.76.14 user = root";

  // useEffect(() => {
  //     if (props.parsedDataIsVisible)
  //   }, [parsedDataIsVisible]);

  return (
    <ParsedDataComponentWrapper>
      {parsedSideInfoIsVisible && (
        <>
          <Exit onExit={handleExit} />

          <InfoBar>
            <InfoItem>
              <b>Template Id:</b>
              <p>{templateId}</p>
            </InfoItem>
            <InfoItem>
              <b>Version:</b>
              <p>{version}</p>
            </InfoItem>
            <InfoItem>
              <b>Template Literal:</b>
              <p>{temptemplateData}</p>
            </InfoItem>
          </InfoBar>
        </>
      )}
      <ParsedTableWrapper>
      <>


      <ParsedTableResultsWrapper
        darkMode={darkMode}
      >
        <TableHeaderWrapper>
          {/* map the following out: */}
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

          <button onClick={()=>{console.log(parsedData)}}>
            click to log data
          </button>
      </ParsedTableResultsWrapper>

      
    </>
     </ParsedTableWrapper>
    </ParsedDataComponentWrapper>
  );
}


type StyledParsedTableType = {
  templateIsVisible?: boolean;
  wordCloudIsVisible?: boolean;
  darkMode?: boolean;
};


interface IParsedDataComponentProps {
  parsedDataIsVisible?: boolean;
  templateId?: string;
  version?: string;
  templateLiteral?: string;
  darkMode: boolean;
  handleExit: () => void;
  parsedSideInfoIsVisible: boolean;
}
