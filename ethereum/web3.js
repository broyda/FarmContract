const Web3 = require('web3');
let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  web3 = new Web3(window.web3.currentProvider);
}else{
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/fzlIQSWc47A4Y7xOMoG3'
      );
  web3 = new Web3(provider);
}

export default web3;
