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

const StyledClearIcon = styled(ClearIcon)<StyledExitType>`
color: ${(props) => (props.iconColor ? props.iconColor : props.darkMode ? "white" : "#5D266F")};
`

function Exit(props: IExitProps) {
    return (
             <ExitWrapper><StyledClearIcon iconColor={props.iconColor} darkMode={props.darkMode} onClick={props.onExit} /> </ExitWrapper>
    )
}

type StyledExitType = {
  darkMode?: boolean;
  iconColor?: string;
};

interface IExitProps {
    onExit?: () => void;
    darkMode: boolean;
    iconColor?: string;
  }
  

export default Exit
