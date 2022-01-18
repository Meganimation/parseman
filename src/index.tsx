import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import styled from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'slices/store'


const StyledFooter = styled.footer`

color: black;
font-size: 0.2em;
display: absolute;
bottom: 0;

`

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
    <StyledFooter>©2022 SliceUp, Inc. All rights reserved.</StyledFooter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
