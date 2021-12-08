

const optionDefinitions = [
  { name: "infuraFileToken", type: String },
  { name: "privateKey", type: String },
]

const commandLineArgs = require("command-line-args")
const options = commandLineArgs(optionDefinitions)

const Web3 = require("web3");
const Tx = require("ethereumjs-tx")
// const infura_token = process.env.REACT_APP_INFURA_TOKEN
// const private_key = process.env.REACT_APP_PRIVATE_KEY
var fs = require("fs")
var infura_token = fs.readFileSync(options.infuraFileToken, "utf8")
var private_key = fs.readFileSync(options.privateKey, "utf8")
const node_host = `https://ropsten.infura.io/v3/${infura_token}`

const web3 = new Web3(node_host)

const send_account = "0xF2050Aa76D860167e35D4b34CDB4Ccc841d215F6"
const receive_account = "0x8A2fd42c47C41888FaA695cd3272Ca0B048a2eA7"

const privateBuffer = Buffer.from(private_key, "hex")

web3.eth.getTransactionCount(send_account, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("0.001", "gwei")),
    to: receive_account,
    value: "0x2C68AF0BB140000" //0.2hexcode 변경
  }

  const tx = new Tx(txObject)
  tx.sign(privateBuffer);

  const serializedTx = tx.serialize()
  const raw = `0x${serializedTx.toString("hex")}`

  web3.eth.sendSignedTransaction(raw)
    .once("transactionHash", hash => {
      console.info("transactionHash", "https://ropsten.etherscan.io/tx/" + hash)
    }).once("receipt", receipt => {
      console.info("receipt", receipt)
    }).on("error", console.error)
})

