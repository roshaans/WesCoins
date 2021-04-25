# WesCoin

## A Platform for Wesleyan University Students Powered by WesCoins that allows the exchange of services

### A First Look

We have created two things:  WesCoin, a ERC-20 token that runs on that specific network and a platform called WesTasks to utilize those coins.


### WesCoins

Token supply of 5,000,000.

Contract Address: 0x75afA21C74B4619eE7e910CEcfc93a16f5c0b731

### Launching of Platform

Upon visiting the website, you will login using a crypto wallet on your phone via QR code or download the metamask extension in a chrome browser.  Ensure that you are on the ROPSTEN test netowrk for Athereum becasue WesCoin is a ERC-20 token that runs on that specific network.

New users will automatically receive 5,000 WesCoins upon registration of their public wallet through a google form. 

Upon login, you can accept services that others have offered or propse new ones that

If you head to the View Tasks tab, you can view in real tiem tasks being added.  If you are happy with the reward the person is offering you can accept the offer by clicking on the toggle button.

### Features

1. You can accept people's offers.  Once an offer is accepted, it is updated in real time across all platforms.  Only one person can accept an offer

2. Upon completion of the task, the user who propsoed the task can release the funds to the user who complete the task at hand.

3. You can create, edit and delete tasks.

4. Your identity on this platform is anonymous because we use your crypto wallet's public key to identify you.  Users are not limited to transacting coins on the system. They can easily use the send coins tab to send WesCoins to any Athereum address.

5. Your wallet and your WesCoin token balance are synchronized in real time with the blockchain.

6. To view all WesCoin transactions visit the following website: https://ropsten.etherscan.io/address/0x2a4e752108518faa91deb3af330c9e6f0939b527



### Launching of Platform



Your wallet address is your identification

We didn't want to creat a a central coin stystem in the app so we ade it into a token so that people can use it in the app for several different things.


# Getting Started with Create React dApp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts:

In the project directory, you can run:
   
### `npm install` or `yarn`

Need to install all packages first of all. This is required.   
Installed packages placed in `node_modules` folder.   

### `touch .env`

Fill ```.env.development```. Check ```.env.example```

```
# Testnet / Mainnet switcher (true - ropsten, false - mainnet)   
REACT_APP_TEST_MODE=true   
   
# YOUR INFURA PROJECT ID   
REACT_APP_INFURA_ACCESS_TOKEN=xxxxxx   
    
# Credentials of the sender    
REACT_APP_WALLET_ADDRESS=xxxxxx   
REACT_APP_WALLET_PRIVATE_KEY=xxxxxx   
    
# Address of the receiver   
REACT_APP_DESTINATION_WALLET_ADDRESS=xxxxxx    
```
   
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Transaction scripts:
```
./src/scripts/prepare-transaction.js
```
Script creates a file ```data.dat``` with serialized transaction inside placed in ```data``` directory

```
./src/scripts/sign-transaction.js
```
Script signs transaction from ```data/data.dat```. Can be changed with other script you prefer.

```
./src/scripts/broadcast-transaction.js
```
Script send raw transaction from ```data/signed-data.dat``` to the blockchain.
   
