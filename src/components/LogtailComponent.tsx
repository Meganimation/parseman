import React, { useRef, useEffect, useState, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SelectorsHelper, {
  CURRENT_ENVIRONMENT_TYPE,
} from "utils/SelectorsHelper";
import { convertToLogged } from "slices/currentDataSlice";
import { RootState } from "slices/store";

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

    const logTailData = useSelector(
        (state: RootState) => state.returnedData.logTailData
      );

const dispatch = useDispatch();

  // useEffect(() => {
  //   const URL: string = SelectorsHelper.getURL(
  //     CURRENT_ENVIRONMENT_TYPE,
  //     "logTail"
  //   );

  //   let urlWithString = `${URL}/1/2020-01-17/2022-01-25?from=50&to=0`;

  //   if (!logTailData.length)
  //     fetch(urlWithString)
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw Error(`Error code: ${res.status}. Please try again.`);
  //         }
  //         return res.json();
  //       })
  //       .then((data) => {
  //           dispatch(convertToLogged(data));
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  // }, [logTailData, dispatch]);

  const inputEl = useRef(null);


  
    const observer = useRef<any>();
  
    //@ts-ignore
    const lastElementRef = useCallback(node => {
      if (props.loadingLogtail) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && props.logtailHasMore) {
          props.handleLogtailPagination();
        }
  
      })
      if (node)  observer.current.observe(node);
      console.log('NODE', node)
    }, [props.loadingLogtail, props.logtailHasMore]);



  const mapData = (data: any) => {
    return data.map((item: any, index: number) => {
      if (props.logtailData.length === index + 1) {
      return (
        <LogtailItem
         id={index} 
         darkMode={props.darkMode}
         ref={lastElementRef}
         >
          <code>
            {item.logTail}
          </code> 
          {/* {props.loadingLogtail && <h1>Loading...</h1>}
      {props.logtailError && <h1>Error</h1>} */}
        </LogtailItem> 
      )}
      else return (
        <LogtailItem
        id={index} 
        darkMode={props.darkMode}
        ref={lastElementRef}
        >
         <code>
           {item.logTail}
         </code> 

       </LogtailItem> 
      )
      
    });
  };

  // if (!logTailData.length) {
  //   return    <LogtailComponentWrapper
  //   templateIsVisible={props.templateIsVisible}
  //   wordCloudIsVisible={props.wordCloudIsVisible}
  //   darkMode={props.darkMode}
  // >
  //   Loading...
  // </LogtailComponentWrapper>;
  // }

  return (
    <LogtailComponentWrapper
      templateIsVisible={props.templateIsVisible}
      wordCloudIsVisible={props.wordCloudIsVisible}
      darkMode={props.darkMode}
    >
      {mapData(props.logtailData)}
             {props.loadingLogtail && <h1>Loading...</h1>}
     {props.logtailError && <h1>Error</h1>}
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


