import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const appElement = document.getElementById('battleship-root');
const root = ReactDOM.createRoot(appElement);

root.render(
  <App />
);
