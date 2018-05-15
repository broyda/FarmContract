
const contracts = require('./compile');
const farmFactoryContract =contracts[':FarmFactoryContract'];
const farmContract =contracts[':FarmContract'];
const {interface, bytecode} = farmFactoryContract;

const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

const provider = new HDWalletProvider(
  'canyon surprise disorder bomb fossil card about cement sorry december dog vocal',
  'https://rinkeby.infura.io/fzlIQSWc47A4Y7xOMoG3'
);

console.log(farmContract.interface);

const web3 = new Web3(provider);

const deploy = async () =>{
  const accounts = await web3.eth.getAccounts();
  const farmContractObj = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data: bytecode, arguments:[]})
  .send({from: accounts[0], gas:3000000});

  console.log(interface);
  console.log('Contract deployed to -> ', farmContractObj.options.address);

  await farmContractObj.methods.createFarmContract("10.1.2",
  "10.2.3", 1200, 300, "NO RAIN for 6 Months").send({from: accounts[0], gas:2000000});

  const contractAddress = await farmContractObj.methods.contractAddressMap(accounts[0]).call();
  console.log(contractAddress);
};

deploy();
