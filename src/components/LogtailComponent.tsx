import React, { useRef, useEffect, useState, useCallback} from "react";
import styled from "styled-components";


//background-color:${(props) => props.darkMode ? '#26374C; ' : 'white'};
const LogtailComponentWrapper = styled.section<StyledLogtailType>`
  overflow: hidden;
  resize: horizontal;
  max-width: ${(props) => (props.templateIsVisible ? "60vw" : "95vw")};
  min-width: ${(props) => (props.templateIsVisible ? "30vw" : "95vw")};
  height: ${(props) => (props.wordCloudIsVisible ? "60vh" : "75vh")};
  width: ${(props) => (props.templateIsVisible ? "40vw" : "90vw")};
  overflow: auto;
  background-color: ${(props) => (props.darkMode ? "#1C2937; " : "white")};
  border-radius: 10px;
`;

const LogtailItem = styled.div<StyledLogtailType>`
  background: ${(props) => (props.id % 2 === 0 ?(props.darkMode ? "#34404E" : 'white') : (props.darkMode ? "#2B3543" : '#F5F5F5'))};
  font-size: 12px;
  color: #c5c7cb;
  overflow-wrap: break-word;
  word-break: break-all;

   code {
     color: ${(props) => (props.darkMode ? "#c5c7cb" : "#1C2937")};
    }
`;

export default function LogtailComponent(props: LogtailComponentProps) {
  const {loadingLogtail, logtailHasMore, darkMode, templateIsVisible, wordCloudIsVisible, logtailData, logtailError, handleLogtailPagination} = props;
  
    const observer = useRef<any>();
  
    //@ts-ignore
    const lastElementRef = useCallback(node => {
      if (loadingLogtail) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && logtailHasMore) {
          handleLogtailPagination();
        }
  
      })
      if (node)  observer.current.observe(node);
    }, [loadingLogtail, logtailHasMore]);



  const mapData = (data: any) => {
    return data.map((item: any, index: number) => {
      if (logtailData.length === index + 1) {
      return (
        <LogtailItem
         id={index} 
         darkMode={darkMode}
         ref={lastElementRef}
         >
          <code>
            {item.logTail}
          </code> 
        </LogtailItem> 
      )}
      else return (
        <LogtailItem
        id={index} 
        darkMode={darkMode}
        ref={lastElementRef}
        >
         <code>
           {item.logTail}
         </code> 

       </LogtailItem> 
      )
      
    });
  };

  return (
    <LogtailComponentWrapper
      templateIsVisible={templateIsVisible}
      wordCloudIsVisible={wordCloudIsVisible}
      darkMode={darkMode}
    >
      {mapData(logtailData)}
             {loadingLogtail && <h1>Loading...</h1>}
     {logtailError && <h1>Error</h1>}
    </LogtailComponentWrapper>
  );
}

type StyledLogtailType = {
  templateIsVisible?: boolean;
  wordCloudIsVisible?: boolean;
  darkMode?: boolean;
  id?: any;
};

interface LogtailComponentProps {
  templateIsVisible: boolean;
  wordCloudIsVisible: boolean;
  darkMode: boolean;
  loadingLogtail: boolean;
  logtailData: any;
  logtailError: any;
  logtailHasMore: boolean;
  handleLogtailPagination?: any;
  
}


