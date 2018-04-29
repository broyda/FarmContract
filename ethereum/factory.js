import web3 from './web3';

const abi = ['{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contractAddresses","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_latitude","type":"string"},{"name":"_longitude","type":"string"},{"name":"_coverageAmount","type":"uint256"},{"name":"_listedPrice","type":"uint256"}],"name":"createFarmContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"}'];

export default new web3.eth.Contract(abi, '0xB3dd002A9e35bca2B8D02A883195267dd908e001');
