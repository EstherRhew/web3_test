import Web3 from 'web3';

const web3 = new Web3();

class Metamask {
  async getWallet() {
    try {
      const wallet = await web3.eth.accounts.wallet;
      console.log(wallet._accounts.givenProvider._state.accounts[0])
    } catch (err) {
      console.log(err)
    }
  }

  async getAccount() {
    try {
      const account = await window.ethereum.selectedAddress
      console.log(account)
      return account;
    } catch (err) {
      console.log(err)
    }
  }

  async connectWallet() {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const account = accounts[0]
      console.log(account, typeof account)
      return account
    } catch (err) {
      console.log(err)
    }
  }

  async sendTransaction(input) {
    try {
      const account = await this.getAccount();
      const transactionParam = {
        to: input.to,
        from: account,
        value: input.value,
        gasPrice: input.gasPrice,

      }
      console.log(transactionParam)
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParam]
      })
      console.log(txHash, 'transaction succeed!')
    } catch (err) {
      console.log(err)
    }
  }

  async checkAddress(address) {
    try {
      const validity = await web3.utils.isAddress(address);
      return validity
    } catch (err) {
      console.log(err)
    }
  }
}

export default Metamask;