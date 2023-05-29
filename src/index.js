import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/Login.js';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homebar from './components/Homebar';
import ListCafe from './components/ListCafe';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

import { IntlProvider } from 'react-intl';
import localEsMessages from './translations/es.json';
import enJson from './translations/en.json';
import esJson from './translations/es.json';

const root = ReactDOM.createRoot(document.getElementById('root'));
const web_len = navigator.language;
const messages = {
  'en': enJson,
  'es': esJson
}
root.render(
  <IntlProvider locale={web_len} messages={messages}>
    <BrowserRouter>
      <Homebar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/listCafe" element={<ListCafe />} />
      </Routes>
    </BrowserRouter>
  </IntlProvider>, document.getElementById('root')  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
