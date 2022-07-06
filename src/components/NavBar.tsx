import React, { useEffect } from "react";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "./Menu";
import TimeSelectorPicker from "./TimeSelectorPicker";
import { RadioButton } from "stories/RadioButton";
import EyeClosedIcon from "@material-ui/icons/VisibilityOff";
import {colors} from "utils/theme/colors"
import {
  clearData,
} from "../slices/currentDataSlice";
import { useDispatch } from "react-redux";

const StyledNavWrapper = styled.nav`
  display: flex;
  position: fixed;
  height: 8rem;
  width: 100%;
  opacity: 0.9;

  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
  z-index: 8;
`;

const StyledNav = styled.nav<StyledNavType>``;

const UnhideComponentItem = styled.sup<StyledNavType>`
  position: relative;
  margin-right: 1rem;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
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
  height: 1.5rem;
  border: none;
  border-radius: 10px;
  font-family: "IBM Plex Mono", sans-serif;
  margin-left: 10px;
  position: relative;
  top: -5px;

  &:focus {
    outline: solid 3px ${colors.purple};
  }
`;

const MenuButtonWrapper = styled.button<StyledNavType>`
  width: 8rem;
  height: 8rem;
  background: ${colors.vividBlue};
  color: ${colors.white};
  border: none;
  cursor: pointer;

  &:hover {
    background: ${colors.lightGrayBlue};
  }
`;

const RadioButtonGroup = styled.div`
  display: flex;
  color: ${colors.white};

  > div {
    margin-left: 0.3rem;
    font-size: 0.8rem;
  }
`;

const RadioButtonWrapper = styled.p`
  &:hover {
    transform: scale(1.1);
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
  color: ${colors.white};
`;

const TimeSelectorPickerWrapper = styled.div`
  padding-top: 10px;
`;

const StyledEyeIcon = styled(EyeClosedIcon)`
  vertical-align: middle;
  padding-bottom: 3px;
  color: ${colors.white};
`;

export default function NavBar(props: INavBarProps) {
  const [menu, setMenu] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState("Templates");
  const [inputValue, setInputValue] = React.useState("");
  const dispatch = useDispatch();
  const handleMenu = () => {
    setMenu(false);
  };

  useEffect(() => {
    setInputValue(props.tailSearch);
  }, [props.tailSearch]);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
      dispatch(clearData('clear')); 
      props.updateTailSearchResultsHandler(inputValue);
      props.setVisibility({ type: "toggleParsedDataTableVisibility", visible: false });
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
              <RadioButtonWrapper>
                <RadioButton
                  value="Templates"
                  label="Templates"
                  checked={radioValue === "Templates" ? true : false}
                  onClick={() => {
                    props.handleTemplateVersionChange("1");
                    setRadioValue("Templates");
                  }}
                />
              </RadioButtonWrapper>
              <RadioButtonWrapper>
                <RadioButton
                  value="Variables"
                  label="Variables"
                  checked={radioValue === "Variables" ? true : false}
                  onClick={() => {
                    props.handleTemplateVersionChange("2");
                    setRadioValue("Variables");
                  }}
                />
              </RadioButtonWrapper>
              <RadioButtonWrapper>
                <RadioButton
                  value="Both"
                  label="Both"
                  checked={radioValue === "Both" ? true : false}
                  onClick={() => {
                    props.handleTemplateVersionChange("3");
                    setRadioValue("Both");
                  }}
                />
              </RadioButtonWrapper>
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
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" ? handleSubmit(e) : null}
          />

          <ShowingResultsWrapper>
            <UnhideComponentWrapper>
              {!props.logtailIsVisible && (
                <div
                  onClick={() => {
                    props.unhideComponent("logtailComponent");
                  }}
                >
                  <UnhideComponentItem>
                    <b>
                      <StyledEyeIcon fontSize="small" /> Logtail
                    </b>
                  </UnhideComponentItem>
                </div>
              )}
              {!props.templateIsVisible && (
                <div
                  onClick={() => {
                    props.unhideComponent("templateComponent");
                  }}
                >
                  <UnhideComponentItem>
                    <b>
                      <StyledEyeIcon fontSize="small" /> Template Table
                    </b>
                  </UnhideComponentItem>
                </div>
              )}
              {!props.wordCloudIsVisible && (
                <div
                  onClick={() => {
                    props.unhideComponent("wordCloud");
                  }}
                >
                  <UnhideComponentItem>
                    <b>
                      <StyledEyeIcon fontSize="small" /> Word Cloud
                    </b>
                  </UnhideComponentItem>
                </div>
              )}
              {!props.parsedSideInfoIsVisible && (
                <div
                  onClick={() => {
                    props.unhideComponent("parsedSideInfoIsVisible");
                  }}
                >
                  <UnhideComponentItem>
                    <b>
                      <StyledEyeIcon fontSize="small" /> Parsed Table
                      Sidebar
                    </b>
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
        handleSavedParsedDataModal={props.handleSavedParsedDataModal}
      />
    </>
  );
}

type StyledNavType = {
  animateMenu?: boolean;
  darkMode?: boolean;
};

interface INavBarProps {
  unhideComponent: (nameOfComponents: string) => void;
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
  handleSavedParsedDataModal: any;
  setVisibility: any;
}
