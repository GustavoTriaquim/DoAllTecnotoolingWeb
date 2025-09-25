import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-width: none;
  }

  body {
    font-family: 'Jura', sans-serif;
    background: linear-gradient(135deg, #fff 0%, #a7a7a7 100%);
    height: 100vh;
    width: 100%;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
