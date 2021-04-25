import './style.scss';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { getMyWalletBalance } from '../../scripts/prepare-transaction';
import React from 'react'
import Web3Status from '../Web3Status'
import { shortenAddress } from '../../utils'
import { ShoppingBag } from 'react-feather'

export const Header = () => {
    const { account, library, chainId } = useWeb3ReactCore();
    const [balance, setBalance] = React.useState('');

    React.useEffect(() => {
        async function fetchBalance() {
            const updatedBalance = await getMyWalletBalance(account);
            setBalance(updatedBalance);
        }

        if (account != undefined){
            
            fetchBalance();
        } 
    },[account])
    return (

        <nav class="flex items-center justify-between flex-wrap bg-black p-6">
        
  <div class="flex items-center flex-no-shrink text-white mr-6">
    <svg class="h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
    <ShoppingBag className = "mr-2"> </ShoppingBag> <span class="font-semibold text-xl tracking-tight">WesTasks</span>
  </div>
 
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-white">
    <div class="text-sm lg:flex-grow">
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
        How To Guide
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white mr-4">
        Get WesCoins
      </a>
      <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-white">
        Credits
      </a>
    </div>

    <button
               className="flex items-center justify-between bg-transparent hover:bg-red text-red-dark font-semibold hover:text-white py-2 px-4 border border-red hover:bg-white rounded-full mr-2 "
                                                onClick={() => {
                                                    const params = {
                                                        type: 'ERC20',
                                                        options: {
                                                            address: '0x2a4e752108518faa91deb3af330c9e6f0939b527',
                                                            symbol: 'WES',
                                                            decimals: 0,
                                                            image:
                                                                'https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272/logo.png'
                                                        }
                                                    }

                                                    if (
                                                        library &&
                                                        library.provider.isMetaMask &&
                                                        library.provider.request
                                                    ) {
                                                        library.provider
                                                            .request({
                                                                method: 'wallet_watchAsset',
                                                                params
                                                            })
                                                            .then(success => {
                                                                if (success) {
                                                                    console.log('Successfully added Wes to MetaMask')
                                                                } else {
                                                                    throw new Error('Something went wrong.')
                                                                }
                                                            })
                                                            .catch(console.error)
                                                    }
                                                }}
                                            >
                                                <img
                                                    src="https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272/logo.png"
                                                    alt="Switch Network"
                                                    style={{ minWidth: 36, minHeight: 36, maxWidth: 36, maxHeight: 36 }}
                                                    className="rounded-md object-contain mr-2"
                                                />

                                                Add WesCoin
                </button>

                <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                                        {account && chainId && (
                                            <>
                                                <div className="py-2 px-3 text-primary text-bold">
                                                    {balance + " "}
                                                     WES
                                                </div>
                                            </>
                                        )}

                                        <div className = "flex items-center rounded-lg bg-dark-1000 text-sm text-secondary py-2 px-3" > {account && shortenAddress(account)}</div>
                                  {/* <Web3Status /> */}

                                    </div>

    {/* <div>
      <a href="#" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:text-black hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Download</a>
    </div> */}
  </div>
</nav>
        // <header className="header">
        //     <h1>WesCoins</h1>
        //     <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        //     Button
        //     </button>
        //    
        //  <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
        //                                 {account && chainId && (
        //                                     <>
        //                                         <div className="py-2 px-3 text-primary text-bold">
        //                                             {balance}
        //                                              WES
        //                                         </div>
        //                                     </>
        //                                 )}
        //                           {/* <Web3Status /> */}

        //                             </div>

        // </header>
    )
}

