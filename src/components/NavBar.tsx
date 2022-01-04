import React from 'react'
import { Button } from 'stories/Button'
import styled from 'styled-components'
import ClearIcon from '@material-ui/icons/Clear'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from './Menu'

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



const MenuButtonWrapper = styled.button<StyledNavType>`

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

// const Menu = styled.div<StyledNavType>`
// background: #182331C3;
// position: relative;
// width: 30vw;
// height: 100vh;
// position: fixed;
// transition: right 1s;
// opacity: 0.9;
// box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.30);
// right: ${props => props.animateMenu ? "0" : "-500px"};


// `

// transition: height 2s;
  //height: ${props => props.animateMenu ? "50vh" : "100vh"};

export default function NavBar(props: INavBarProps) {
    const [menu, setMenu] = React.useState(false)

    const handleMenu = () => {
        setMenu(false)
    }
    return (
        <>
          
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
        <MenuButtonWrapper onClick={()=>{setMenu(!menu)}}><MenuIcon/></MenuButtonWrapper>


        </StyledNavWrapper>
        <Menu menu={menu} handleMenu={handleMenu}/>
        </>
    )
}

type StyledNavType = {
    animateMenu?: boolean
  };

interface INavBarProps {
    showComponent: (nameOfComponents: string) => void;
    logtailIsVisible?: any;
    templateIsVisible: boolean;
    wordCloudIsVisible: boolean;
  }
