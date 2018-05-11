const routes = require('next-routes')();

routes.add("/createContract", "/create")
      .add("/viewContractOwner/:address", "/viewContractOwner")
      .add("/viewContractInsurer", "/viewContractInsurer");

module.exports = routes;
