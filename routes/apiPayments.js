const router = require('koa-router')();
const controller = require('../controller');
const isAuth = require('../lib/isAuth');

module.exports = (middleware) => {

  router.use(middleware);

  router.prefix('/api');

  router.use('/payments', isAuth);

  router.post('/payments', controller.apiPayments.subscribe);

  return router;

}