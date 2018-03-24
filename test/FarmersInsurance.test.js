const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let farmersInsuranceContract;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  farmersInsuranceContract = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({data:bytecode, arguments:[]})
  .send({from: accounts[0], gas:1000000});

  farmersInsuranceContract.setProvider(provider);
});

describe('Verify FarmersInsurance contract', () => {
  it('deploy contract', () =>{
    assert.ok(farmersInsuranceContract.options.address);
  });

  it('verify contract owner address', async () =>{
    const address = await farmersInsuranceContract.methods.getOwnerAddress().call();
    assert.equal(accounts[0], address);
  });
});
