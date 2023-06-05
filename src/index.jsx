import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

let appElement = document.getElementById('battleship-root');
if (!appElement) {
  appElement = document.createElement('div');
  appElement.setAttribute('id', 'battleship-root');
  document.body.appendChild(appElement);
}
const root = ReactDOM.createRoot(appElement);

root.render(
  <App />
);
