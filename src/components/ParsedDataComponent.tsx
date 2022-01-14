import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Exit from 'stories/Exit'

const ParsedDataComponentWrapper = styled.section`
  height: 75vh;
  display: flex;
`;

const InfoBar = styled.aside`
  background-color: (props) => (props.darkMode ? "#182331" : "white");
  margin: 10px;
  max-width: 27vw;
  resize: horizontal;
  overflow-Y: auto;
  display: grid;
  flex-direction: column;
  grid-template-columns: 0.2fr 1fr;
`;

const ParsedTableWrapper = styled.div`

    background-color: red;
    height: 100%;
    width: 100%;

`

const InfoItem = styled.div`
margin-top: 2px;
font-size: 0.8rem;

`


export default function ParsedDataComponent({
  templateId = '123456789', 
  version = '1',
  templateLiteral = '20px',
  darkMode = false,
  handleExit=()=>{},
  parsedSideInfoIsVisible=true,
  ...props
}: IParsedDataComponentProps) {
  const [data, setData] = useState("place some data here");

  const temptemplateData='<<<TIMESTAMP>>> INFO org.apache.hadoop.hdfs.StateChange : Na166 9381672_879402 1pam_unix(sshd : auth): authentication failure; logname = uid = 0 euid = 0 tty = ssh ruser = rhost = 106.51.76.14 user = root<<<TIMESTAMP>>> INFO org.apache.hadoop.hdfs.StateChange : Na1669381672_879402 1pam_unix(sshd : auth): authentication failure; logname = uid = 0 euid = 0 tty = ssh ruser = rhost = 106.51.76.14 user = root<<<TIMESTAMP>>> INFO org.apache.hadoop.hdfs.StateChange : Na1669381672_879402 1pam_unix(sshd : auth): authentication failure; logname = uid = 0 euid = 0 tty = ssh ruser = rhost = 106.51.76.14 user = 73 root<<<TIMESTAMP>>> INFO org.apache.hadoop.hdfs.StateChange : Na1669381672_879402 1pam_unix(sshd : auth): authentication failure; logname = uid = 0 euid = 0 tty = ssh ruser = rhost = 106.51.76.14 user = root'

  // useEffect(() => {
  //     if (props.parsedDataIsVisible)
  //   }, [parsedDataIsVisible]);

  return (
    <ParsedDataComponentWrapper>
             {parsedSideInfoIsVisible &&
      <>
      <Exit onExit={handleExit}/>
 
 
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
              }
      <ParsedTableWrapper>
        This is the ParsedDataComponent
      </ParsedTableWrapper>
    </ParsedDataComponentWrapper>
  );
}

interface IParsedDataComponentProps {
  parsedDataIsVisible?: boolean;
  templateId?: string;
  version?: string;
  templateLiteral?: string;
  darkMode: boolean;
  handleExit: () => void;
  parsedSideInfoIsVisible: boolean;
}
