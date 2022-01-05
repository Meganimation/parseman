import React from "react";
import { Button } from "stories/Button";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "./Menu";

const StyledNavWrapper = styled.nav`
  display: flex;
  position: fixed;
  height: 80px;
  width: 100%;
  opacity: 0.9;
`;

const StyledNav = styled.nav<StyledNavType>``;

const UnhideComponentItem = styled.span<StyledNavType>`
  top: -7px;
  position: relative;
  margin-right: 1rem;
`;

const UnhideComponentWrapper = styled.div`
  height: 50px;
  display: flex;
  position: relative;
  height: fit-content;

  top: 0;
  right: 0;

  > div {
    margin-left: 0.3rem;
    margin-right: 0.8rem;
    font-size: 0.8rem;
    position: relative;
    top: 7px;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const StyledInput = styled.input`
  width: 90vw;
  margin: 3px;
  height: 2rem;
  border: none;
  border-radius: 10px;
  font-family: "IBM Plex Mono", sans-serif;
  margin-left: 10px;
`;

const MenuButtonWrapper = styled.button<StyledNavType>`
  width: 7rem;
  height: 100%;
  background: #57066f;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #3b1c44;
  }
`;

const RadioButtonGroup = styled.span`
  display: flex;

  > div {
    margin-left: 0.3rem;
    margin-right: 0.8rem;
    font-size: 0.8rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 15px;
  padding: 10px;
`;

export default function NavBar(props: INavBarProps) {
  const [menu, setMenu] = React.useState(false);

  const handleMenu = () => {
    setMenu(false);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      alert("You can search by hitting enter");
    }
  };
  return (
    <>
      <StyledNavWrapper>
        <StyledNav>
          <ContentWrapper>
            <RadioButtonGroup>
              <input type="radio" value="Templates" /> <div>Template</div>
              <input type="radio" value="Variables" />
              <div>Variables</div>
              <input type="radio" value="Both" /> <div>Both</div>
            </RadioButtonGroup>
            <UnhideComponentWrapper>
              {!props.logtailIsVisible && (
                <div
                  onClick={() => {
                    props.showComponent("logtailComponent");
                  }}
                >
                  <UnhideComponentItem>
                    <div> x Show Logtail</div>
                  </UnhideComponentItem>
                </div>
              )}
              {!props.templateIsVisible && (
                <div
                  onClick={() => {
                    props.showComponent("templateComponent");
                  }}
                >
                  <UnhideComponentItem>
                    <div> x Show Template Table</div>
                  </UnhideComponentItem>
                </div>
              )}
              {!props.wordCloudIsVisible && (
                <div
                  onClick={() => {
                    props.showComponent("wordCloud");
                  }}
                >
                  <UnhideComponentItem>
                    <div> x Show Word Cloud</div>
                  </UnhideComponentItem>
                </div>
              )}
            </UnhideComponentWrapper>
          </ContentWrapper>
          <StyledInput
            type="text"
            placeholder="Search"
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              handleSubmit(e);
            }}
          />
        </StyledNav>
        <MenuButtonWrapper
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <MenuIcon />
        </MenuButtonWrapper>
      </StyledNavWrapper>
      <Menu
        menu={menu}
        handleMenu={handleMenu}
        darkMode={props.darkMode}
        handleTheme={props.handleTheme}
      />
    </>
  );
}

type StyledNavType = {
  animateMenu?: boolean;
};

interface INavBarProps {
  showComponent: (nameOfComponents: string) => void;
  logtailIsVisible?: any;
  templateIsVisible: boolean;
  wordCloudIsVisible: boolean;
  darkMode: boolean;
  handleTheme: () => void;
}
