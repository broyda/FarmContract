import web3 from './web3';

const abi =
[{"constant":false,"inputs":[{"name":"_latitude","type":"string"},{"name":"_longitude","type":"string"},{"name":"_coverageAmount","type":"uint256"},{"name":"_listedPrice","type":"uint256"},{"name":"_description","type":"string"}],"name":"createFarmContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"ownerAddressArray","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"contractListByAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"getContractByAddress","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getContractOwners","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contractAddressMap","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];

export default new web3.eth.Contract(abi, '0x6A02173D9ACC44211Dc24015A43a0eFAa1b80a5D');

//0x4A00a80Fa74b7C147582016F0b62174B11E1B86B
