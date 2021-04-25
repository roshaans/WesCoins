export {}
// import { AbstractConnector } from '@web3-react/abstract-connector'
// import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
// import React, { useMemo } from 'react'
// import {injected} from "../../connectors"
// import { shortenAddress } from '../../utils'
// import styled, { css } from 'styled-components'
// import { ButtonSecondary } from '../ButtonLegacy'
// import { darken, lighten } from 'polished'
// import { Activity } from 'react-feather'


// const IconWrapper = styled.div<{ size?: number }>`
// ${({ theme }) => theme.flexColumnNoWrap};
// align-items: center;
// justify-content: center;
// & > * {
//     height: ${({ size }) => (size ? size + 'px' : '32px')};
//     width: ${({ size }) => (size ? size + 'px' : '32px')};
// }
// `

// const Web3StatusGeneric = styled(ButtonSecondary)`
// ${({ theme }) => theme.flexRowNoWrap}
// width: 100%;
// align-items: center;
// padding: 0.5rem;
// border-radius: ${({ theme }) => theme.borderRadius};
// cursor: pointer;
// user-select: none;
// :focus {
//     outline: none;
// }
// `
// const Web3StatusError = styled(Web3StatusGeneric)`
// background-color: ${({ theme }) => theme.red1};
// border: 1px solid ${({ theme }) => theme.red1};
// color: ${({ theme }) => theme.white};
// font-weight: 500;
// :hover,
// :focus {
//     background-color: ${({ theme }) => darken(0.1, theme.red1)};
// }
// `

// const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded ? : boolean }>`
// background-color: ${({ theme }) => theme.primary4};
// border: none;
// color: ${({ theme }) => theme.primaryText1};
// font-weight: 500;

// :hover,
// :focus {
//     border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
//     color: ${({ theme.toString() }) => theme.primaryText1};
// }

// ${({ faded }) =>
//     faded &&
//     css`
//         background-color: ${({ theme }) => theme.primary5};
//         border: 1px solid ${({ theme }) => theme.primary5};
//         color: ${({ theme }) => theme.primaryText1};

//         :hover,
//         :focus {
//             border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
//             color: ${({ theme }) => darken(0.05, theme.primaryText1)};
//         }
//     `}
// `

// const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean }>`
// background-color: ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg2)};
// border: 1px solid ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg3)};
// color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
// font-weight: 500;
// :hover,
// :focus {
//     background-color: ${({ pending, theme }) =>
//         pending ? darken(0.05, theme.primary1) : lighten(0.05, theme.bg2)};

//     :focus {
//         border: 1px solid
//             ${({ pending, theme }) => (pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg3))};
//     }
// }
// `

// const Text = styled.p`
// flex: 1 1 auto;
// overflow: hidden;
// text-overflow: ellipsis;
// white-space: nowrap;
// margin: 0 0.5rem 0 0.25rem;
// font-size: 1rem;
// width: fit-content;
// font-weight: 500;
// `

// const NetworkIcon = styled(Activity)`
// margin-left: 0.25rem;
// margin-right: 0.5rem;
// width: 16px;
// height: 16px;
// `



// function Web3StatusInner() {
//     const { account, connector, error } = useWeb3React()



//     if (account) {
//         return (
//             <div
//                 id="web3-status-connected"
//                 className="flex items-center rounded-lg bg-dark-1000 text-sm text-secondary py-2 px-3"
//             >
               
                
//                     <div className="mr-2">{ shortenAddress(account)}</div>
              
//             </div>
//         )
//     } else if (error) {
//         return (
//             <Web3StatusError>
//                 <NetworkIcon />
//                 <Text>{error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}</Text>
//             </Web3StatusError>
//         )
//     } else {
//         return (
//             <Web3StatusConnect id="connect-wallet" faded={!account}>
//                 <Text>{'Connect to a wallet'}</Text>
//             </Web3StatusConnect>
//         )
//     }
// }

// export default function Web3Status() {
//     const { active, account } = useWeb3React()
//     // const contextNetwork = useWeb3React("NETWORK")

//     return (
//         <>
//             <Web3StatusInner />
           
//         </>
//     )
// }
