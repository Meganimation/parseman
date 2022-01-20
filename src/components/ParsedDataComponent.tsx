import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Exit from "stories/Exit";
import { RootState } from "slices/store";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "stories/Modal";

//import the edit icon from material ui
import EditIcon from "@material-ui/icons/Edit";

const ParsedDataComponentWrapper = styled.section`
padding-top: 3rem;
  height: 75vh;
  display: flex;
`;

const InfoBar = styled.aside`
  background-color: (props) => (props.darkMode ? "#182331": "white");
  margin: 10px;
   width: 25vw;

  overflow-y: auto;


`;

const ParsedTableWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const InfoItem = styled.div`
  margin-top: 2px;
  font-size: 0.8rem;
  width: 15vw;
`;

const ParsedTableResultsWrapper = styled.section<StyledParsedTableType>`
width: 70vw;



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



const GridContainer = styled.div`
display: grid;
grid-auto-flow: column;
overflow: auto;

background: #34404E;
border: 1px solid #C1C1C1;




`;

const GridItem = styled.div`
background: rgba(51, 170, 51, .01);
border-radius: 3px;
text-align: left;
min-width: fit-content;



height: 70vh;


`;

const TitleContainer = styled.div`
height: 65px;
resize: horizontal;
cursor: pointer;

`

const HeaderContainer = styled.div`
display: flex;
border-right: 1px solid #C1C1C1;
padding-left: 10px;
padding-right: 10px;
  font-size: 1em;
  background: #2d4460;
  align-items: center;
  height: 4rem;

  h2 {
    font-size: 1em;
    font-family: "IBM Plex", sans-serif;
    display: inline-block;
    vertical-align: middle;
  }

&:hover: {
  backgroundColor: #3A3A3A;
}

`

const Title = styled.div`
cursor: pointer;
margin-top: auto;
margin-bottom: auto;
color: white;
`

const Test = styled.div`
margin: 10px;


&:hover {
  background: rgba(51, 170, 51, .1);
 }

`

const StyledEditTemplateWrapper = styled.div`

  display: flex;
  alignItems: center;
  flexWrap: wrap;
  cursor: pointer;
  svg {
    opacity: 0.5;
  }

  &:hover {
    svg {
      opacity: 1;
    }
  }
}

`

export interface ISubmitState {
  headers: string[];
  both: {
    array: any;
    arrow: string;
  };
}



export default function ParsedDataComponent({
  templateId = "123456789",
  version = "1",
  templateLiteral = "20px",
  darkMode = false,
  handleExit = () => {},
  parsedSideInfoIsVisible = true,
  ...props
}: IParsedDataComponentProps) {


      const returnedData: any = useSelector(
        (state: RootState) => state.returnedData.parsedData
      );



  const [modal, setModal] = useState(false);

  const [arrow, setArrow] = useState("V");

  const [editInput, setEditInput] = useState([0, 0]);

  const [state, setState] = useState<ISubmitState>({
    headers: [],
    both: { array: [], arrow: "V" },
  });

  useEffect(() => {
    if (returnedData.headers) {
      showParsedInfo();
      console.log("now", returnedData);
    }
  }, [returnedData]);

  let arrKey: string[] = [];
  let arrBoth: any[] = [];
  let i = 0;

    const showParsedInfo = () => {
    if (!returnedData) return console.log("no data");
    else {
      while (i < returnedData.headers.length) {
        arrKey = [
          ...arrKey,
          returnedData.lines
            .map((line: any) => line.itemBody)
            .map((y: any) => y[i].bodyHeader)[0],
        ];

        arrBoth[i] = {
          key: returnedData.lines
            .map((line: any) => line.itemBody)
            .map((y: any) => y[i].bodyHeader)[0],
          value: [
            returnedData.lines
              .map((line: any) => line.itemBody)
              .map((y: any) => y[i].bodyValue),
          ],
        };

        i = i + 1;
      }

      setState({ headers: arrKey, both: { array: arrBoth, arrow: "V" } });
    }
  };

  const showColumns = () => {
    if (i < state.both.array.length) {
      return (
        <GridContainer>
 
          {state.both.array.map(
            (array: { key: string; value: string[] }, key: number) => (
              <GridItem>
                <HeaderContainer
                  onClick={(e) => {
        
                    setEditInput([e.pageY - 50, e.clientX - 100]);
                  }}
                >
                  <TitleContainer>
                    <h1
                      id={"header" + key}
                      contentEditable="true"
                    >
                      {array.key} 
                    </h1>
                  </TitleContainer>

               
                </HeaderContainer>
                <b
                  onClick={(e) => {
                    // handleSort(e, array.key);
                  }}
                >

                </b>
                {array.value.map((value: any) =>
                  value.map((val: any, key: any) => {
                    return (
                      < Test
                      key={key} >
                        {val}
                      </Test>
                    );
                  })
                )}
              </GridItem>
            )
          )}
        </GridContainer>
      );
    }
  };


  return (
    <ParsedDataComponentWrapper>
      {parsedSideInfoIsVisible && (
        <>
          <Exit onExit={handleExit} />

          <InfoBar>
            <InfoItem>
              
              <StyledEditTemplateWrapper onClick={()=>{setModal(true)}}> <b>Template Id: {returnedData.templateId} <EditIcon style={{transform: 'scale(0.6)'}}/></b>  </StyledEditTemplateWrapper>
              {modal && (
        <Modal
          onExit={() => {
            setModal(false);
          }}
          title="Enter Template Id Name"
          darkMode={darkMode}
        >
          SAVED
        </Modal>
      )}
         
            </InfoItem>
            <InfoItem>
              
              <p><b>Version:</b> {returnedData.version}</p>
            </InfoItem>
            <InfoItem>
              <b>Template Literal:</b>
              <p>{props.checkedTemplateLiteral}</p>
            </InfoItem>
          </InfoBar>
        </>
      )}
      <ParsedTableWrapper>
      <>


   

      <div >
        {!state.headers.length ? (
       <p>parse some information above</p>
        ) : (
          <ParsedTableResultsWrapper>{showColumns()}</ParsedTableResultsWrapper>
        )}

  
      </div>

      
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
  checkedTemplateLiteral: string;
}
