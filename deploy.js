const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const { TWELVE_WORDS_KEY } = require('./keys')

const provider = new HDWalletProvider(
    TWELVE_WORDS_KEY,
    'https://rinkeby.infura.io/v3/8de9dbf268ab4cf589d48884dfac68b5'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data: '0x' + bytecode}) // add 0x bytecode
     .send({from: accounts[0]}); // remove 'gas'

    console.log(interface);
    console.log('Contract deployed to ',result?.options?.address);
};

deploy();

