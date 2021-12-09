// import Account from './components/Account';
// import Count from './components/Count';
// import IncButton from './components/IncButton';
// import DecButton from './components/DecButton';
import './App.css';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

const web3 = new Web3();

function App({ metamask }) {
  const [account, setAccount] = useState();
  const [input, setInput] = useState({
    to: '',
    value: '',
    gasPrice: '',
    gasLimit: '',
  })
  const onConnect = async () => {
    const address = await metamask.connectWallet();
    setAccount(address);
  }

  const onSend = () => {
    metamask.sendTransaction(input)
  }

  const onChangeInput = (e) => {
    const value = (val) => {
      if (e.target.name === 'to') {
        return val
      }

      val = val == 0 ? 0 : val * 1000000000000000000
      val = Math.round(val)
      return '0x' + val.toString(16)
    }
    setInput({
      ...input,
      [e.target.name]: value(e.target.value)
    })

  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('Metamask available')
    }
  }, [])

  return (
    <div className="App">
      <div>
        <button onClick={onConnect}>Connect</button>
        <p>Account : {account}</p>

      </div>
      <div className="transaction">
        <button onClick={onSend}>Send Ether</button>
        <div className="input_box">
          <label htmlFor="to">to : </label>
          <input type="text" id="to" name="to" onChange={onChangeInput} />
        </div>
        <div className="input_box">
          <label htmlFor="value">value : </label>
          <input type="text" id="value" name="value" onChange={onChangeInput} />
        </div>
        <div className="input_box">
          <label htmlFor="gasPrice">gas price : </label>
          <input type="text" id="gasPrice" name="gasPrice" onChange={onChangeInput} />
        </div>
        <div className="input_box">
          <label htmlFor="gasLimit">gas limit : </label>
          <input type="text" id="gasLimit" name="gasLimit" onChange={onChangeInput} />
        </div>
      </div>
    </div>
  );
}

export default App;
