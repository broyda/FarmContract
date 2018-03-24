const {interface, bytecode} = require('./compile');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
  'canyon surprise disorder bomb fossil card about cement sorry december dog vocal',
  'https://rinkeby.infura.io/fzlIQSWc47A4Y7xOMoG3'
);

const web3 = new Web3(provider);

const deploy = async () =>{
  const accounts = await web3.eth.getAccounts();

  const farmContractObj = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode, arguments:[]})
  .send({from: accounts[0], gas:1000000});

  console.log('Contract deployed to -> ', farmContractObj.options.address);
};

deploy();
