module.exports = (middleware) => {

  const compose = require('koa-compose');
  const fs = require('fs');
  const path = require('path');

  function getRoutes() {
    return fs.readdirSync('routes').filter((file) => file !== 'index.js').map((file) => {
      const filePath = path.resolve(__dirname, file);
      const requiredFile = require(filePath)(middleware);
      return requiredFile.routes();
    });
  }

  const routes = getRoutes();

  return compose(routes);

}