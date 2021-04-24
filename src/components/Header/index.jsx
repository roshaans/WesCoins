import './style.scss';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { getMyWalletBalance } from '../../scripts/prepare-transaction';
import React from 'react'
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
        <header className="header">
            <h1>WesCoins</h1>
            
            <div
               className="hidden sm:inline-block rounded-md bg-dark-900 hover:bg-dark-800 p-0.5 hover:cursor-pointer"
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
                                                    className="rounded-md object-contain"
                                                />
                                            </div>
         <div className="w-auto flex items-center rounded bg-dark-900 hover:bg-dark-800 p-0.5 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto">
                                        {account && chainId && (
                                            <>
                                                <div className="py-2 px-3 text-primary text-bold">
                                                    {balance}
                                                     WES
                                                </div>
                                            </>
                                        )}
                                  {/* <Web3Status /> */}

                                    </div>

        </header>
    )
}
