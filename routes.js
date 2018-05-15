const routes = require('next-routes')();

routes.add("/createContract", "/createContract")
      .add("/viewContractOwner/:address", "/viewContractOwner")
      .add("/viewContractInsurer", "/viewContractInsurer")
      .add("/viewContractInsurer/:address", "/viewContractInsurer")
      .add("/contractListOwner", "/contractListOwner")
      .add("/contractListInsurer", "/contractListInsurer");

module.exports = routes;
