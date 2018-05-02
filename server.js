const next = require('next');
const routes = require('./routes');

const {createServer} = require('http');

const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

const requestHandler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(requestHandler).listen(3000, (error) =>{
    if(error) throw error;
    console.log('Ready and listening on 3000!');
  })
});
