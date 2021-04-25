// import React from 'react';
// import './style.scss';
// import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import {ServiceOfferings, PostOffer, MyTasks} from '../ServiceOfferings'
import { TransactionCreator } from '../TransactionCreator';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// import { InjectedConnector } from '@web3-react/injected-connector';
// import { MetaMaskLogo } from './MetaMaskLogo';
// import {
//     injected,

//     walletconnect,
    
//   } from '../connectors'
// export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });


// export const MetaMaskButton: React.FunctionComponent = () => {
//     const {
//         account,
//         activate,
//         connector,
//         error,
//     } = useWeb3ReactCore<Web3Provider>();
//     const [activatingConnector, setActivatingConnector] = React.useState<any>();

//     const handleConnectWalletInjected = React.useCallback(() => {
//         if (account) {
//             window.console.log('[MetaMask] - successfully connected');
//         } else {
//             setActivatingConnector(injected);
//             activate(injected);
//         }
//     }, [account, activate]);

//     const handleConnectWalletConnect = React.useCallback(() => {
//         if (account) {
//             window.console.log('[WalletConnect] - successfully connected');
//         } else {
//             setActivatingConnector(injected);
//             activate(injected);
//         }
//     }, [account, activate]);

//     React.useEffect(() => {
//         if (activatingConnector &&
//             activatingConnector === connector &&
//             account
//         ) {
//             window.console.log('[MetaMask] - successfully connected');
//             setActivatingConnector(undefined);
//         }
//     }, [activatingConnector, connector, account]);

//     React.useEffect(() => {
//         if (!!error) {
//             window.console.error('[MetaMask] - something went wrong!');
//         }

//     }, [error]);

//     return (
//         <div className="pg-metamask">
//             <MetaMaskLogo
//                 className="pg-metamask__logo-icon"
//                 onClick={handleConnectWallet}

//             />
//             {account ? (
//                 null
//             ) : (
//                 <span className="pg-metamask__account--disconnected">Please connect your wallet to start using this service.</span>
//             )}
//         </div>
//     );
// };
import React, {useState} from 'react'
import { Web3ReactProvider, useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected
} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import { Web3Provider } from '@ethersproject/providers'
import { formatEther } from '@ethersproject/units'
import { useEagerConnect, useInactiveListener } from '../../hooks'
import {
  injected,
  network,
  walletconnect
} from '../../connectors'
import { Spinner } from '../Spinner'
import { X } from 'react-feather'
import { Wallet } from 'web3-eth-accounts';

enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',

}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,

  [ConnectorNames.WalletConnect]: walletconnect,
  
}

const dict = {
    "Injected": {"name": "MetaMask - Chrome Extension", "description": "Connect with the Metamask Chrome Extension", "url": "assets/images/metamask.png"}, 
    "WalletConnect": {"name": "WalletConnect - Phone","description": "Scan QR Code", "url": "assets/images/walletconnect.svg" }
}




function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

const StatusButton = (props) => {
    return (
    <div className = "flex p-4 justify-end">
    <div className = "flex flex-row items-center rounded-xl cursor-pointer bg-pink-400 border hover:border-pink-800 text-base p-2 font-medium">
    {/* <button className = " flex align-center justify-center text-base p-2 rounded-2xl font-medium   "> */}
    <p className = "mx-2 text-pink-700">Connect to Wallet </p>
     {/* </button> */}
   
  
    </div>
    </div>)
  }
  const WalletModal = (props) => {
  
    return (
      <>
      <div className = "flex fixed inset-0 items-center justify-center bg-black bg-opacity-10 ">
      <div className = "flex bg-white p-0 align-center rounded-5 max-w-md w-96 rounded-3xl font-medium text-black h-18 max-h-64" >
      {/* <div className = "flex flex-nowrap m-0 p-0 w-full">  */}
      
  
      <div className = "flex flex-col font-medium p-0 w-full">
      <div className = "flex flex-row justify-between w-full px-2 py-4"> 
      <div className = "font-medium">
      Connect to a wallet
       </div>
       <div >
         <button className = "focus:outline-none"> 
        <X className = "text-darkgray "/>
        </button>
      </div>
      </div>
      
       <div className = "p-8 rounded-bl-3xl rounded-br-3xl bg-gray-100 w-full">
  <div className = "grid gap-2 "> 
  
  <WalletConnector className = "outline-none" name = "Metamask"> 
  <img className = "h-6 w-6"src="assets/images/metamask.png" alt=""/>
  </WalletConnector>
  
  <WalletConnector className = "outline-none" name = "WalletConnect"> 
  <img className = "h-6 w-6"src="assets/images/walletconnect.svg" alt=""/>
  </WalletConnector>
  </div>
        </div>
       </div>
      {/* </div> */}
    
  
      </div>
      </div>
      </>
    )
  
  }
  
  const WalletConnector = (props) => {
    return(
    
    <button className = "border border-gray hover:border-red rounded-xl p-4 flex align-center justify-between w-full focus:outline-none shadow-none">
    <div className = "text-base"> 
    {props.name}
    
    </div>
    <p> {props.description} </p>
    <div className = "flex align-center justify-center focus:outline-none">
    {props.children}
    </div>
    
    </button>
    )
  }


export function ConnectWallet() {
    const context = useWeb3React<Web3Provider>()
    const { account} = context
    const [key, setKey] = useState('ViewTasks');

    return (

       

    <>
    {!account ? <MetaMaskButton/> : (
    <Tabs>
    <TabList>
      <Tab>View Tasks</Tab>
      {/* <Tab>Realtime Tasks Activity</Tab> */}
      <Tab>Create New Task</Tab>
      <Tab>My Tasks</Tab>
      <Tab>Send Coins</Tab>
    </TabList>

    <TabPanel>
    <ServiceOfferings/> 
    </TabPanel>
    {/* <TabPanel>
    <h1> Activity</h1>
    </TabPanel> */}
    <TabPanel>
    <JobPosts />
    </TabPanel>
    <TabPanel>
    <MyTasks account =  {account}/>
    </TabPanel>
    <TabPanel>
    <TransactionCreator/>
    </TabPanel>
  </Tabs>
    )}
   
    </>)

}

function JobPosts() {
    const context = useWeb3React<Web3Provider>()
    // const [showCreatePost, setShowCreatePost] = useState(false)
    const { account} = context

    return (
    <div> 
         {/* <button className='my-4 bg-blue-600 hover:bg-blue-700 duration-300 text-black shadow p-2 rounded'onClick = {() => setShowCreatePost(prev => !prev)}> 
        {!showCreatePost ? 'Show Job Offer Form' : "Hide Job Offer Form"}
        </button> */}
        <div  className = "flex flex-col justify-center w-full items-center"> 
       <PostOffer account = {account}></PostOffer>
        </div>
       
        {/* <ServiceOfferings/>  */}
   </div>)
}
export function MetaMaskButton() {
    // const { account,
    //         activate,
    //         connector,
    //         error} = useWeb3ReactCore<Web3Provider>();
        const [activatingConnector, setActivatingConnector] = React.useState<any>();
           
        const context = useWeb3React<Web3Provider>()
        const { connector, library, chainId, account, activate, deactivate, active, error } = context
      
        // handle logic to recognize the connector currently being activated
        // const [activatingConnector, setActivatingConnector] = React.useState<any>()

        const handleConnectWalletInjected = React.useCallback(() => {
            if (account) {
                window.console.log('[MetaMask] - successfully connected');
            } else {
                setActivatingConnector(injected);
                activate(injected);
            }
        }, [account, activate]);
    
        const handleConnectWalletConnect = React.useCallback(() => {
            if (account) {
                window.console.log('[WalletConnect] - successfully connected');
            } else {
                setActivatingConnector(WalletConnector);
                activate(injected);
            }
        }, [account, activate]);
    
        React.useEffect(() => {
            if (activatingConnector &&
                activatingConnector === connector &&
                account
            ) {
                window.console.log('[MetaMask] - successfully connected');
                setActivatingConnector(undefined);
            }
        }, [activatingConnector, connector, account]);
    
        React.useEffect(() => {
            if (!!error) {
                window.console.error('[MetaMask] - something went wrong!');
            }
    
        }, [error]);
    

    React.useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined)
      }
    }, [activatingConnector, connector])
  
    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect()
  
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector)
  
    return (
      <>
        {/* <hr style={{ margin: '2rem' }} /> */}
        
        <div className = "flex fixed inset-0 items-center justify-center bg-black bg-opacity-10 ">
      <div className = "flex bg-white p-0 align-center rounded-5 max-w-md w-96 rounded-3xl font-medium text-black h-18 max-h-64" >
      {/* <div className = "flex flex-nowrap m-0 p-0 w-full">  */}
      
  
      <div className = "flex flex-col font-medium p-0 w-full">
      <div className = "flex flex-row w-full px-2 py-4 justify-between"> 
  
      <div className = "font-medium">
      Connect to a wallet
      
       </div>
       <button className = "focus:outline-none"> 
        {/* <X className = "text-darkgray "/> */}
        </button>
      </div>
     


        <div className = "p-8 rounded-bl-3xl rounded-br-3xl bg-gray-100 w-full">
        <div className = "grid gap-2 "> 
        <div>
          {Object.keys(connectorsByName).map(name => {
      
            const currentConnector = connectorsByName[name]
            const activating = currentConnector === activatingConnector
            const connected = currentConnector === connector
            const disabled = !triedEager || !!activatingConnector || connected || !!error
  
            return (
                <>
                
                <button onClick = {() => {
                       setActivatingConnector(currentConnector)
                       activate(connectorsByName[name])
                }}
                    // () => connector && "Injector" ?  handleConnectWalletInjected : handleConnectWalletConnect
                // } 
                className = "border border-gray hover:border-red rounded-xl p-4 flex align-centerw-full focus:outline-none shadow-none justify-between w-full">
                <div className = "text-base"> 
                {dict[name]["name"]}
                
                </div>
                {/* <p className = "text-xs"> {dict[connector]["description"]}</p> */}
                <div className = "flex align-center justify-center focus:outline-none">
               
                <img className = "h-6 w-6" src={dict[name]["url"]} alt=""/>

                </div>
                
                </button>
                </>
                )
            }  ) 
        } </div>
     
     
        
  </div>
        
      </div>
</div>
</div>
</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {(active || error) && (
            <button
              style={{
                height: '3rem',
                marginTop: '2rem',
                borderRadius: '1rem',
                borderColor: 'red',
                cursor: 'pointer'
              }}
              onClick={() => {
                deactivate()
              }}
            >
              Deactivate
            </button>
          )}
  
          {!!error && <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>{getErrorMessage(error)}</h4>}
        </div>
  
        <hr style={{ margin: '2rem' }} />
  
        <div
          style={{
            display: 'grid',
            gridGap: '1rem',
            gridTemplateColumns: 'fit-content',
            maxWidth: '20rem',
            margin: 'auto'
          }}
        >
          {!!(library && account) && (
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                cursor: 'pointer'
              }}
              onClick={() => {
                // library
                //   .getSigner(account)
                //   .signMessage('👋')
                //   .then((signature: any) => {
                //     window.alert(`Success!\n\n${signature}`)
                //   })
                //   .catch((error: any) => {
                //     window.alert('Failure!' + (error && error.message ? `\n\n${error.message}` : ''))
                //   })
              }}
            >
              Sign Message
            </button>
          )}
          {connector === connectorsByName[ConnectorNames.WalletConnect]["name"] && (
            <button
              style={{
                height: '3rem',
                borderRadius: '1rem',
                cursor: 'pointer'
              }}
              onClick={() => {
                ;(connector as any).close()
              }}
            >
              Kill WalletConnect Session
            </button>
          )}
         
        </div>
      </>
    )
  }
  
  