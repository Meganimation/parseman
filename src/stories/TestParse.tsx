import React,{useState, useEffect} from 'react'

import SelectorsHelper, {
    CURRENT_ENVIRONMENT_TYPE,
  } from "utils/SelectorsHelper";

  interface TestParseProps {
    darkMode?: any;
  }

export const TestParse =({
    darkMode = false,
  }: TestParseProps)=>{

    const [data, setData] = useState([])

const fetchStuff = () => {
        const URL: string = SelectorsHelper.getURL(
          CURRENT_ENVIRONMENT_TYPE,
          "parsedDataTable"
        );
    
        const urlWithString = `${URL}/294985629_9622b6/1/?limit=1000`;
    
        fetch(urlWithString)
          .then((res) => {
            if (!res.ok) {
              throw Error(`Error code: ${res.status}. Please try again.`);
            }
            return res.json();
          })
          .then((data) => {
            console.log(data)
            setData(data)
          })
          .catch((err) => {
            console.log(err.message);
          });
        }
      
      const HASH: any = {}
      let arr: any = []
    //  let tempArrOfHeaders: any = []
     let newSet: any= []
      
        useEffect(() => {
            if (data.length < 1) fetchStuff()
        } , [data])

        function doStuff(data: any){
           
            data.lines.map((line: any) => {
                let tempArr: any = []
                let tempArrOfHeaders: any = []

                let arrayOfLines = line.itemBody


                for (let i = 0; i < arrayOfLines.length; i++) {
             
           
                    let bodyHeader = arrayOfLines[i].bodyHeader
                    let bodyValue = arrayOfLines[i].bodyValue

                    if (!HASH[bodyHeader]) {
                        HASH[bodyHeader] = []
                    }
                    HASH[bodyHeader] = HASH[bodyHeader].concat(bodyValue)

                    tempArr.push(arrayOfLines[i].bodyValue)

                    tempArrOfHeaders.push(arrayOfLines[i].bodyHeader)
                    

               
                    // for (let j = 0; j < arrayOfLines.length; j++) {
                        
                        
                    // }
                
                }
                console.log('PUSH THIS', tempArr)
                arr = [...arr, tempArr]

                //get the tempArrOfHeaders and return itself in a new set
                newSet = new Set(tempArrOfHeaders)
  

               


                
              //Object.keys(HASH).length => returns length
              //Object.keys(HASH)[3] => reutrns value at index 3
               //Object.values(HASH)[3] => reutrns the array of that key


            })
       
        }

  return (
    <div>

        i am parsed
        <button onClick={() => {console.log(data)}}>click me to view data</button>
        <button onClick={() => {debugger}}>click me to enter debugger</button>

        <button onClick={() => {doStuff(data)}}>click me for func</button>

        <button onClick={() => {console.log(HASH)}}>click me for HASH</button>
        <button onClick={() => {console.log(arr)}}>click me for arr</button>
      
        <button onClick={() => {console.log(newSet)}}>click me for set arrOfHeaders</button>
    </div>
  )
}
