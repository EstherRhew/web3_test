// import Account from './components/Account';
// import Count from './components/Count';
// import IncButton from './components/IncButton';
// import DecButton from './components/DecButton';
import './App.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

function App({ }) {
  const [currentAccount, setCurrentAccount] = useState(null);

  // const handleAccountsChanged = (accounts) => {
  //   if (accounts.length === 0) {
  //     console.log('Please connect to MetaMask');
  //   } else if (accounts[0] !== currentAccount) {
  //     setCurrentAccount(accounts[0]);
  //     console.log('account changed!', currentAccount, accounts[0])
  //   }
  // }

  const connect = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    console.log(account)
    // .then(handleAccountsChanged)
    // .catch((err) => {
    //   if (err.code === 4001) {
    //     console.log('Please connect to MetaMask');
    //   } else {
    //     console.error(err);
    //   }
    // })
  }

  useEffect(() => {
    console.log(Web3)
    if (typeof window.ethereum !== 'undefined') {
      console.log('he')
    }
  }, [])


  // useEffect(() => {
  //   getProvider()
  //     .then((provider) => {
  //       if (!provider) {
  //         console.log('Please Install MetaMask!')
  //         return;
  //       } else if (provider !== window.ethereum) {
  //         console.log(provider)
  //         console.error('Do you have multiple wallets installed??');
  //       } else {
  //         console.log(provider)
  //         return;
  //       }
  //     })
  // }, [getProvider])

  return (
    <div className="App">
      <div>
        <button onClick={connect}>Connect</button>
      </div>

    </div>
  );
}

export default App;
