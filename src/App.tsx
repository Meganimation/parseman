import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import styled from "styled-components";


const StyledApp  = styled.div<Custom>`
  background-color: ${props => props.darkMode ? 'blue' : 'green'};
  `

  type Custom = {
    darkMode?: boolean
  }


function App() {

  const [darkMode, setDarkMode] = useState(true);

  return (
    <StyledApp darkMode={darkMode} > TBC</StyledApp>
  );
}

export interface TestProps {
  darkMode: boolean;
}

export default App;
