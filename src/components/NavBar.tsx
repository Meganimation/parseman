import React, { useEffect } from "react";
import { Button } from "stories/Button";
import styled from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "./Menu";
import TimeSelectorPicker from "./TimeSelectorPicker";
import { RadioButton } from "stories/RadioButton";

const StyledNavWrapper = styled.nav`
  display: flex;
  position: fixed;
  min-height: 110px;
  width: 100%;
  opacity: 0.9;
  overflow: hidden;
  resize: vertical;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  z-index: 2;
`;

const StyledNav = styled.nav<StyledNavType>`

`;

const UnhideComponentItem = styled.sup<StyledNavType>`
  position: relative;
  margin-right: 1rem;
`;

const UnhideComponentWrapper = styled.div`
  display: flex;
  padding-left: 0.5rem;

  > div {
    margin-left: 0.3rem;
    margin-right: 0.8rem;
    font-size: 0.8rem;
    position: relative;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const StyledInput = styled.input`
  width: 90vw;
  height: 2rem;
  border: none;
  border-radius: 10px;
  font-family: "IBM Plex Mono", sans-serif;
  margin-left: 10px;
  position: relative;
`;

const MenuButtonWrapper = styled.button<StyledNavType>`
  width: 7rem;
  height: 7rem;
  background: #4b0c5e;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #3b1c44;
  }
`;

const RadioButtonGroup = styled.div`
  display: flex;
  color: white;

  > div {
    margin-left: 0.3rem;
    font-size: 0.8rem;
  }


`;

const ContentWrapper = styled.nav`
  width: 90vw;
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding-top: 10px;
`;

const ShowingResultsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 0.8em;
  padding-right: 10px;
  position: absolute;
  bottom: 0;
  right: 8%;
  color: white;
`;

const TimeSelectorPickerWrapper = styled.div`
  padding-top: 10px;
`;

export default function NavBar(props: INavBarProps) {
  const [menu, setMenu] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("Templates");
  const [inputValue, setInputValue] = React.useState("");

  const handleMenu = () => {
    setMenu(false);
  };

  useEffect(() => {
    setInputValue(props.tailSearch);
  }, [props.tailSearch]);

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
              <TimeSelectorPickerWrapper>
                <TimeSelectorPicker
                  handleStartDateChange={props.handleStartDateChange}
  
                  handleEndDateChange={props.handleEndDateChange}

  

                  selectedStartDateAndTime={props.selectedStartDateAndTime}

                  selectedEndDateAndTime={props.selectedEndDateAndTime}
                />
              </TimeSelectorPickerWrapper>
              <>
              <RadioButton 
              value="Templates" 
              label="Templates"
              checked={radioValue === "Templates" ? true : false}
              onClick={() => {
                props.handleTemplateVersionChange("1");
                setRadioValue("Templates");
              }}
              />
              </>
              <>
              <RadioButton 
              value="Variables" 
              label="Variables"
              checked={radioValue === "Variables" ? true : false}
              onClick={() => {
                props.handleTemplateVersionChange("2");
                setRadioValue("Variables");
              }}
              />
              </>
              <>
              <RadioButton 
              value="Both" 
              label="Both"
              checked={radioValue === "Both" ? true : false}
              onClick={() => {
                props.handleTemplateVersionChange("3");
                setRadioValue("Both");
              }}
              />
              </>
            </RadioButtonGroup>

            <UnhideComponentWrapper></UnhideComponentWrapper>
          </ContentWrapper>
          <StyledInput
            type="text"
            value={inputValue}
            placeholder={"Search..."}
            onChange={(event) => {
              const val = event.target.value as string;
              setInputValue(val);
            }}
            onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
              handleSubmit(e);
            }}
          />

          <ShowingResultsWrapper>
            <UnhideComponentWrapper>
              {!props.logtailIsVisible && (
                <div
                  onClick={() => {
                    props.showComponent("logtailComponent");
                  }}
                >
                  <UnhideComponentItem>
                    <b> x Show Logtail</b>
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
                    <b> x Show Template Table</b>
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
                    <b> x Show Word Cloud</b>
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
                    <b> x Show parsedSideInfoIsVisible</b>
                  </UnhideComponentItem>
                </div>
              )}
            </UnhideComponentWrapper>
          </ShowingResultsWrapper>
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
  tailSearch: string;
  handleTemplateVersionChange: any;
  selectedStartDateAndTime: string[];
  selectedEndDateAndTime: string[];
  handleEndDateChange: any;
  handleStartDateChange: any;
  
}
