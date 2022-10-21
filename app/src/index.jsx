import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import backendApi from './backendApi';
import Providers from './context';
import App from './App';
import reportWebVitals from './reportWebVitals';

const api = backendApi();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Providers api={api}>
    <App />
  </Providers>
  // </React.StrictMode>
  ,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
