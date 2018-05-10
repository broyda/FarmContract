const routes = require('next-routes')();

routes.add("/createContract", "/create")
      .add("/viewContractOwner/:address", "/viewContractOwner")
      .add("/ViewContractInsurer", "/ViewContractInsurer");

module.exports = routes;
