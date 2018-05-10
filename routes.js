const routes = require('next-routes')();

routes.add("/createContract", "/create")
      .add("/view/:address", "/view")
      .add("/ViewContractInsurer", "/ViewContractInsurer");

module.exports = routes;
