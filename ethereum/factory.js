import web3 from './web3';

const abi = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contractAddresseArray","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_latitude","type":"string"},{"name":"_longitude","type":"string"},{"name":"_coverageAmount","type":"uint256"},{"name":"_listedPrice","type":"uint256"},{"name":"_description","type":"string"}],"name":"createFarmContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contractAddressMap","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];

export default new web3.eth.Contract(abi, '0x52459B66413a56D8F8Fa0d22a91c3620f2EE67B9');
