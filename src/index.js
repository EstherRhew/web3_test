import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import { Web3ReactProvider } from "@web3-react/core"
//import getLibrary from './library';
import detectEthereumProvider from '@metamask/detect-provider';

// const getProvider = async () => {
//   const provider = await detectEthereumProvider();
//   return provider;
// }


ReactDOM.render(
  <React.StrictMode>
    {/* <Web3ReactProvider getLibrary={getLibrary}> */}
    <App />
    {/* </Web3ReactProvider> */}

  </React.StrictMode>,
  document.getElementById('root')
);
