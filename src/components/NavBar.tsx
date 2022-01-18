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

  overflow: hidden;
  resize: vertical;
  max-height: 120px;

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  z-index: 2;
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
  background: #4b0c5e;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #3b1c44;
  }
`;

const RadioButtonGroup = styled.span`
  display: flex;
  color: ${(props: StyledNavType) => (props.darkMode ? "white" : "white")};

  > div {
    margin-left: 0.3rem;
    margin-right: 0.8rem;
    font-size: 0.8rem;
  }

  > input {
    margin-left: 25px;
    margin-right: 10px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 15px;
  padding: 10px;
`;

const RadioItem = styled.div`
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

export default function NavBar(props: INavBarProps) {
  const [menu, setMenu] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const handleMenu = () => {
    setMenu(false);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.updateTailSearchResultsHandler(inputValue);
    }
  };
  return (
    <>
      <StyledNavWrapper>
        <StyledNav>
          <ContentWrapper>
            <RadioButtonGroup>
              <RadioItem
                onClick={(e) => {
                  setRadioValue("Templates");
                }}
              >
                
                <input
                  type="radio"
                  value="Templates"
                  checked={radioValue === "Templates" ? true : false}
                />
                <b>Template</b>
              </RadioItem>
              <RadioItem
                onClick={(e) => {
                  setRadioValue("Variables");
                }}
              >
                
                <input
                  type="radio"
                  value="Variables"
                  checked={radioValue === "Variables" ? true : false}
                />
                <b> Variables</b>
              </RadioItem>
              <RadioItem
                onClick={(e) => {
                  setRadioValue("Both");
                }}
              >
                
                <input
                  type="radio"
                  value="Both"
                  checked={radioValue === "Both" ? true : false}
                />
                <b>Both</b>
              </RadioItem>
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
              {!props.parsedSideInfoIsVisible && (
                <div
                  onClick={() => {
                    props.showComponent("parsedSideInfoIsVisible");
                  }}
                >
                  <UnhideComponentItem>
                    <div> x Show parsedSideInfoIsVisible</div>
                  </UnhideComponentItem>
                </div>
              )}
            </UnhideComponentWrapper>
          </ContentWrapper>
          <StyledInput
            type="text"
            placeholder="Search"
            onChange={(event) => {
              const val = event.target.value as string;
              setInputValue(val)
            }}
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
  darkMode?: boolean;
};

interface INavBarProps {
  showComponent: (nameOfComponents: string) => void;
  logtailIsVisible?: any;
  templateIsVisible: boolean;
  wordCloudIsVisible: boolean;
  parsedSideInfoIsVisible: boolean;
  darkMode: boolean;
  handleTheme: () => void;
  updateTailSearchResultsHandler?: any;
}
