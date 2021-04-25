import React from 'react';
import * as RB from 'react-bootstrap';
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { broadcastTransaction } from '../../scripts/broadcast-transaction';
import { prepareTransaction } from '../../scripts/prepare-transaction';
import { signTransaction } from '../../scripts/sign-transaction';
import { BalanceComponent } from '../Balance';
import './style.scss';

export const TransactionCreator = () => {


    const { account, library} = useWeb3ReactCore<Web3Provider>();
    const [isTxLoading, setIsTxLoading] = React.useState(false);
    const [amount, setAmount] = React.useState('');
    const [executedTxId, setExecutedTxId] = React.useState(undefined);
    const [address, setAddress] = React.useState('');
    const handlePrepareTransaction = () => {
        setIsTxLoading(true)
        setExecutedTxId(undefined)

        prepareTransaction(amount, account, address, library).then(transaction => {
        
            setIsTxLoading(false)
            
            // setExecutedTxId(transaction)
        }).then((err) => console.log(err))

    }
 
    const handleChangeAmount = (amount: string) => setAmount(amount); 

    return (
        <div className="mt-4 transaction-creator">
              
            <RB.Container>
                <RB.Row className="justify-content-md-center mb-7 mt-4">
                    <div className="form">
                        <RB.Col>
                            <RB.InputGroup className="mb-3 mw-50">
                                <RB.FormControl
                                    placeholder="Enter destination address"
                                    aria-label="Address to send"
                                    aria-describedby="basic-addon2"
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </RB.InputGroup>
                            <RB.InputGroup className="mb-3 mw-50">
                                <RB.FormControl
                                    placeholder="Enter amount to send"
                                    aria-label="Amount to send"
                                    aria-describedby="basic-addon2"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                                <RB.InputGroup.Append>
                                    <RB.InputGroup.Text id="basic-addon2">WES</RB.InputGroup.Text>
                                </RB.InputGroup.Append>
                            </RB.InputGroup>
                            {console.log("account", account)}
                            <BalanceComponent handleChangeAmount={handleChangeAmount} account={account}/>
                            <RB.Button
                                onClick={ () => handlePrepareTransaction()}
                                variant="primary"
                                className="w-100"
                            >
                                Send
                            </RB.Button>
                        </RB.Col>
                    </div>
                </RB.Row>
                {executedTxId ? (
                    <RB.Row className="justify-content-md-center mt-3">
                        <a
                            href={`https://ropsten.etherscan.io/tx/${executedTxId}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {`https://ropsten.etherscan.io/tx/${executedTxId}`}
                        </a>
                    </RB.Row>
                ) : null}
                {isTxLoading ? (
                    <RB.Spinner animation="border" role="status" className="mt-3">
                        <span className="sr-only">Loading...</span>
                    </RB.Spinner>
                ) : null}
            </RB.Container>
        </div>
    )
}
