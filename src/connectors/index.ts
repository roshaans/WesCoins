import { Web3Provider } from '@ethersproject/providers'
import { ChainId } from '@sushiswap/sdk'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { NetworkConnector } from './NetworkConnector'


const RPC = {
    [ChainId.ROPSTEN]: 'https://ropsten.infura.io/v3/ba2b15fd91e74341a95e1dfd49250f21',

}
export const network = new NetworkConnector({
    defaultChainId: 3,
    urls: RPC
})


let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
    return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
    supportedChainIds: [
        3, // ropsten
       
    ]
})


export const walletconnect = new WalletConnectConnector({
    rpc: {
        [ChainId.ROPSTEN]: RPC[ChainId.ROPSTEN]
    },
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: 15000
})
