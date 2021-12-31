import React from 'react'
import { Button } from 'stories/Button'
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear'
import MenuIcon from '@material-ui/icons/Menu'

const StyledNavWrapper = styled.nav`
display: flex;
position: fixed;
height: 100px;
width: 100%;
opacity: 0.9;   
`


const StyledNav = styled.nav<StyledNavType>`

  
    
`

const UnhideComponentItem = styled.span<StyledNavType>`
top: -7px;
position: relative;
margin-right: 1rem;
`

const UnhideComponentWrapper = styled.div`
height: 50px;
display: flex;
position: relative;
top: 0;
right: 0;

`

const StyledInput = styled.input`

    width: 90vw;
    margin: 3px;
    height: 2rem;
    border: none;
    border-radius: 10px;
`



const MenuButtonWrapper = styled.button`

    width: 7rem;
    height: 100%;
    background: #57066F;
    color: white;
    border: none;
    cursor: pointer;
`

const RadioButtonGroup = styled.span`
    display: flex;
`

const ContentWrapper = styled.div`
display: flex;
justify-content: space-between;
`


export default function NavBar(props: INavBarProps) {
    //if logtail is not visible (or any other component), render the show button with a function in a higher order component
    return (
        <StyledNavWrapper>
        <StyledNav>
            <ContentWrapper>
        <RadioButtonGroup>
                <input type="radio"  value="Templates" /> Template
                <input type="radio"  value="Variables"/> Variables
                <input type="radio"  value="Both"/> Both
            </RadioButtonGroup>
            <UnhideComponentWrapper>
            {(!props.logtailIsVisible && <div onClick={()=>{props.showComponent('logtailComponent')}}><ClearIcon/><UnhideComponentItem >Show Logtail</UnhideComponentItem></div>)}
            {(!props.templateIsVisible &&  <div onClick={()=>{props.showComponent('templateComponent')}}><ClearIcon/><UnhideComponentItem >Show Template Table</UnhideComponentItem></div>)}
            {(!props.wordCloudIsVisible &&  <div onClick={()=>{props.showComponent('wordCloud')}}><ClearIcon/><UnhideComponentItem >Show Word Cloud</UnhideComponentItem></div>)}
            </UnhideComponentWrapper>
            </ContentWrapper>
            <StyledInput type="text" placeholder="Search" />
            
        </StyledNav>
        <MenuButtonWrapper><MenuIcon/></MenuButtonWrapper>
        </StyledNavWrapper>
    )
}

type StyledNavType = {

  };

interface INavBarProps {
    showComponent: (nameOfComponents: string) => void;
    logtailIsVisible?: any;
    templateIsVisible: boolean;
    wordCloudIsVisible: boolean;
  }
