module.exports = (middleware) => {

  const router = require('koa-router')();
  const controller = require('../controller');

  router.use(middleware);

  router.get(/^((?!api|favicon).)*$/, controller.app.index);

  return router;

}