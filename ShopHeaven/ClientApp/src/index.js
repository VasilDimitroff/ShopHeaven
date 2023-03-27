import 'bootstrap/dist/css/bootstrap.css';
import { ThemeProvider } from "@emotion/react";
import React from 'react';
import { ReactDOM } from "react-dom";
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {theme} from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(

  <React.StrictMode>
      <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider> 
     </BrowserRouter>
  </React.StrictMode>

);

/*
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/