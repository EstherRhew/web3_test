import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Metamask from './wallet/metamask';

const metamask = new Metamask();

ReactDOM.render(
  <React.StrictMode>
    <App metamask={metamask} />
  </React.StrictMode>,
  document.getElementById('root')
);
