import React from 'react'
import ClearIcon from '@material-ui/icons/Clear'
import styled from 'styled-components'


const ExitWrapper = styled.span`
padding-right: 20px;
cursor: pointer;
&:hover {
  transform: scale(1.1);
}
&:active {
  opacity: 0.5;
}
`

function Exit(props: IExitProps) {
    return (
        <div>
             <ExitWrapper><ClearIcon onClick={props.onExit} /> </ExitWrapper>
        </div>
    )
}

interface IExitProps {
    onExit?: () => void;
  }
  

export default Exit
