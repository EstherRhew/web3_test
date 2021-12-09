class Metamask {

  async getAccount() {
    let account = await window.ethereum.selectedAddress
    if (account == null) {
      account = await this.connectWallet();
      return account;
    }
    return account;
  }

  async connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = accounts[0]
    console.log(account, typeof account)
    return account
  }

  async sendTransaction(input) {
    const account = await this.getAccount();
    const transactionParam = {
      to: input.to,
      from: account,
      value: input.value,
      gasPrice: input.gasPrice,
      gasLimit: input.gasLimit,

    }
    console.log(transactionParam)
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParam]
    })
    console.log(txHash, 'transaction succeed!')
  }


}

export default Metamask;