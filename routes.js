const routes = require('next-routes')();

routes.add("/createContract", "/create")
      .add("/view/:address", "/view");

module.exports = routes;
