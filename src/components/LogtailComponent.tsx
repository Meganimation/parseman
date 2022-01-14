import React, {useRef} from 'react'
import styled from 'styled-components'

//background-color:${(props) => props.darkMode ? '#26374C; ' : 'white'};
const LogtailComponentWrapper = styled.section<StyledLogtailType>`
overflow: hidden;
resize: horizontal;
max-width: ${(props) => props.templateIsVisible ? '60vw' : '95vw'};
min-width: ${(props) => props.templateIsVisible ? '30vw' : '95vw'};
height: ${(props) => props.wordCloudIsVisible ? '49vh' : '35vw'};
width: ${(props) => props.templateIsVisible ? '45vw' : '90vw'};
overflow: auto;
padding-top: 10px;


background-color:${(props) => props.darkMode ? '#1C2937; ' : 'white'};
border-radius: 10px;
` 

const LogtailItem = styled.div<StyledLogtailType>`
background: ${(props) => (props.id % 2 === 0) ? '#34404E' : '#2B3543'};
font-size: 12px;
color: #C5C7CB;

`



export default function LogtailComponent(props: LogtailComponentProps) {

    const inputEl = useRef(null)

    const tempData = [
        {id: 1, result: '2809-2733097930409-3-02- 2-38832- 2-83382- 2-80230-20932 3-2-2-29393932- 09-273309 7930409-3-022-29393932- 09-273309 7930409-3-02 293939 32-80230-20932 3- 2-2939393 2-80230-20932 3 -2-29393932-80230-20932 3-2-2939393'},
        {id: 2, result: '28932 3 -2-29393932- 09-273309 7930409-3-02- 2-38832- 2-83382- 2-80230-20932 3-2-293939 32-80230-20932 3- 2-2939393 2-80230-2 80230-20932 3-2-2939393'},
        {id: 3, result: '2809-2733097930409 2-29393932- 09-273309 7930409-3-02 2-29393932- 09-273309 7930409-3-02 2-29393932- 09-273309 7930409-3-02 2-29393932- 09-273309 7930409-3-02-3-02- 2-38832- 2-83382- 2-80230-20932 3-2-293939 32-80230-20932 3- 2-2939393 2-80230-20932 3 -2-29393932-80230-20932 3-2-2939393'},
        {id: 4, result: '28932 3 -2-29393932- 09-273309 7930409-3-02- 2-38832- 2-83382- 2-80230-20932 3-2-293939 32-80230-20932 3- 2-2939393 2-80230-2 80230-20932 3-2-2939393'},
        {id: 5, result: '28932 3 -2-29393932- 09-22-29393932- 09-273309 7930409-3-02 2-29393932- 09-273309 7930409-3-02 2-29393932- 09-273309 7930409-3-02 2-29393932- 09-273309 7930409-3-0273309 7930409-3-02- 2-38832- 2-83382- 2-80230-20932 3-2-293939 32-80230-20932 3- 2-2939393 2-80230-2 80230-20932 3-2-2939393'},
    ]
    
    const mapData = (data: any) => {
        return data.map((item: any) => {
            return (<LogtailItem id={item.id} ><code>{item.result} {item.id}</code></LogtailItem>)
        })
    }

   



    return (
        <LogtailComponentWrapper templateIsVisible={props.templateIsVisible} wordCloudIsVisible={props.wordCloudIsVisible} darkMode={props.darkMode} >

         {mapData(tempData)}
        </LogtailComponentWrapper>
    )
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

  }