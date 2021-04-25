
import React from 'react'
import './App.scss';
import { Header } from '../components/Header';
import { TransactionCreator } from '../components/TransactionCreator';
import { GasPrices } from '../components/GasPrices';
import { ConnectWallet } from '../components/MetaMaskButton';
import { Web3ProviderWrapper } from '../utils/providers';
import {ServiceOfferings} from '../components/ServiceOfferings'

function App() {

    return (
        <div className="App">
            <Web3ProviderWrapper>
                <Header />
                <ConnectWallet />
                {/* <GasPrices /> */}
                {/* <TransactionCreator  />
                 */}
            </Web3ProviderWrapper>


        </div>
    );
}

export default App;
