import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

require('dotenv').config()
const POLLING_INTERVAL = 12000
const RPC_URLS: { [chainId: number]: string } = {
  3: 'https://rinkeby.infura.io/v3/' + process.env.REACT_APP_INFURA_ACCESS_TOKEN
}

export const injected = new InjectedConnector({ supportedChainIds: [3] })

export const network = new NetworkConnector({
  urls: {  3: RPC_URLS[3] },
  defaultChainId: 3
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 3: RPC_URLS[3] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
})
