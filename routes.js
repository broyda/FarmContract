const routes = require('next-routes')();

routes.add("/createContract", "/createContract")
      .add("/viewContractOwner/:address", "/viewContractOwner")
      .add("/viewContractInsurer", "/viewContractInsurer")
      .add("/contractList", "/contractList");

module.exports = routes;
