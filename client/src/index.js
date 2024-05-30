import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

const root = ReactDOM.createRoot(document.getElementById("root"));

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
    background-color:teal;
  }

  .amplify-tabs{
    background:#c6c6c6;
  }
  .amplify-field-group__field-wrapper{
    position: relative;
    box-sizing: border-box;
    padding: 2px;
    font-size: 1rem;
    border-style: solid;
    border-width: 2px;
    border-left-color: #848584;
    border-top-color: #848584;
    border-right-color: #fefefe;
    border-bottom-color: #fefefe;
    line-height: 1.5;

  }
  .amplify-input{
    border:1px solid #000;
    background-color:#fff;
    font-family: 'ms_sans_serif';
    color: #0a0a0a;
    padding: 0 8px;
    
  }
  .amplify-button{
    border:2px solid #000;
    background-color:#c0c0c0;
    padding:4px 8px;
    font-family: 'ms_sans_serif';
  }
`;

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
