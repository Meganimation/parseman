import React,{useEffect, useState} from 'react'
import styled from 'styled-components'


const ParsedDataComponentWrapper = styled.section`
height: 65vh;
background-color: #f5f5f5;

` 

export default function ParsedDataComponent(props: IParsedDataComponentProps) {

const [data, setData] = useState('place some data here')

    // useEffect(() => {
    //     if (props.parsedDataIsVisible)
    //   }, [parsedDataIsVisible]);

      
    return (
        <ParsedDataComponentWrapper>
            This is the ParsedDataComponent
        </ParsedDataComponentWrapper>
    )
}


interface IParsedDataComponentProps {
    parsedDataIsVisible?: boolean;
}