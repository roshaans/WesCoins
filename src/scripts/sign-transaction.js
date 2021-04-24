/**
 * Require the credentials that you entered in the .env file
 */
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
require('dotenv').config()

const EthereumTx = require('ethereumjs-tx')
const txDecoder = require('ethereum-tx-decoder');
const web3 = require('web3')

export const signTransaction = async (encodedTx) => {

    const decodedTx = txDecoder.decodeTx(encodedTx);

    const details = {
        "to": decodedTx.to,
        "value": decodedTx.value._hex,
        "gas":  decodedTx.gasLimit._hex,
        "gasPrice":  decodedTx.gasPrice._hex,
        "nonce":  decodedTx.nonce,
        "chainId": 3
    }
    const updatedTx = new EthereumTx(details);
    
    updatedTx.sign( Buffer.from(process.env.REACT_APP_WALLET_PRIVATE_KEY, 'hex') )
    const updatedTxSerialized =  updatedTx.serialize()

    console.log("Signed it!")

    return updatedTxSerialized;
}
