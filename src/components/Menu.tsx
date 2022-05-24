import React, {useState} from "react";
import styled from "styled-components";
import Exit from "stories/Exit";
import { Button } from "stories/Button";
import {Modal} from "stories/Modal"

const MenuWrapper = styled.div<StyledMenuType>`
  background: #131b25;
  position: relative;
  width: 20vw;
  height: 100vh;
  position: fixed;
  opacity: 95%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  transition: right 1s;
  right: ${(props) => (props.animateMenu ? "0" : "-500px")};
  color: ${(props: StyledMenuType) => (props.darkMode ? "white" : "white")};
  padding: 20px;
  z-index: 9;
`;

const StyledButton = styled(Button)`
  background-color: #4b0c5e;
  border-radius: 0px;
  border: none;
  font-size: 0.8rem;
  width: 100%;
  margin-bottom: 10px;
`;

const ExitWrapper = styled.span`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
`;
const MenuGreeting = styled.h3`
  padding-bottom: 3rem;
  padding-top: 2rem;
`;

const MenuBackground = styled.div<StyledMenuType>`
  display: ${(props: StyledMenuType) => (props.animateMenu ? "block" : "none")};
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: ${(props: StyledMenuType) =>
    props.animateMenu ? "gba(0, 0, 0, 5)" : "gba(0, 0, 0, 0.05)"};
  z-index: 2;
`;

function Menu(props: IStyledMenuProps) {


  const { darkMode, menu, handleTheme, handleMenu, handleSavedParsedDataModal } = props;

  return (
    <>
      <MenuWrapper animateMenu={menu} darkMode={darkMode}>
        <ExitWrapper>
          <Exit onExit={handleMenu} iconColor='white'  darkMode={darkMode}/>
        </ExitWrapper>

        <MenuGreeting>Hello!</MenuGreeting>
        <StyledButton
          onClick={handleTheme}
          label={
            darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"
          }
        />
        <StyledButton
          onClick={() => {
            props.handleSavedParsedDataModal(true)
          }}
          label={"View my saved tables"}
        />
        {/* <StyledButton
          onClick={() => {
            alert("Coming Soon!");
          }}
          label={"Change my settings"}
        />
        <StyledButton
          onClick={() => {
            alert("Coming Soon!");
          }}
          label={"Report an issue"}
        /> */}
      </MenuWrapper>
      <MenuBackground animateMenu={menu} onClick={handleMenu} />
    </>
  );
}

type StyledMenuType = {
  animateMenu?: boolean;
  darkMode?: boolean;
};

interface IStyledMenuProps {
  menu: boolean;
  darkMode: boolean;
  handleMenu: () => void;
  handleTheme: () => void;
  handleSavedParsedDataModal: any;
}

export default Menu;
