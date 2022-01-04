import React from 'react'
import styled from 'styled-components'
import Exit from 'stories/Exit'

const MenuWrapper = styled.div<StyledMenuType>`
background: #182331C3;
position: relative;
width: 30vw;
height: 100vh;
position: fixed;
transition: right 1s;
opacity: 0.9;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.30);
right: ${props => props.animateMenu ? "0" : "-500px"};

`

function Menu(props: IStyledMenuProps) {
    return (
        <MenuWrapper animateMenu={props.menu} >
       <Exit onExit={props.handleMenu} />

       <h2>Hello!</h2>
        </MenuWrapper>
    )
}

type StyledMenuType = {
    animateMenu?: boolean
  };

interface IStyledMenuProps {
    menu: boolean
    handleMenu: () => void
  }


export default Menu
