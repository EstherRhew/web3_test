import './App.css';
import { useEffect, useState } from 'react';

function App({ metamask }) {
  const [account, setAccount] = useState();
  const [input, setInput] = useState({
    to: '',
    value: '',
    gasPrice: '',
  })
  const [loading, setLoading] = useState(false);

  const onConnect = async () => {
    setLoading(true)
    const _account = await metamask.connectWallet();
    setLoading(false)
    setAccount(_account);
  }

  const onSend = async () => {
    if (account == null) {
      alert('Please connect to your Metamask account in order to send Ether')
      return;
    }

    const validty = await metamask.checkAddress(input.to)
    if (validty == false) {
      alert('The address is not valid. Please check again')
      return;
    }
    metamask.sendTransaction(input);
    alert('Transaction successfully made!')
  }

  const onChangeInput = (e) => {
    const value = (val) => {
      if (e.target.name === 'to') {
        return val
      }
      val = val <= 0 ? 0 : val * 1000000000000000000
      val = Math.round(val)
      return '0x' + val.toString(16)
    }
    setInput({
      ...input,
      [e.target.name]: value(e.target.value)
    })

  }

  const getAccount = async () => {
    const account = await metamask.getAccount();
    setAccount(account)
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('Metamask available')
    }
    getAccount()
    metamask.getWallet();
  })

  useEffect(() => {
    console.log(window.ethereum.selectedAddress)
  })

  return (
    <div className="App">
      <div>
        <button onClick={onConnect}>{loading ? 'Connecting' : 'Connect'}</button>
        <p>Account : {account ? account : 'No Account Connected'}</p>

      </div>
      <div className="transaction">
        <button onClick={onSend}>Send Ether</button>
        <div className="input_box">
          <label htmlFor="to">to : </label>
          <input type="text" id="to" name="to" onChange={onChangeInput} />
        </div>
        <div className="input_box">
          <label htmlFor="value">value : </label>
          <input type="number" min='0' id="value" name="value" onChange={onChangeInput} />
        </div>
        <div className="input_box">
          <label htmlFor="gasPrice">gas price : </label>
          <input type="number" min='0' id="gasPrice" name="gasPrice" onChange={onChangeInput} />
        </div>

      </div>
    </div>
  );
}

export default App;
