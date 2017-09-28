const router = require('koa-router')();
const controller = require('../controller');

module.exports = (middleware) => {

  router.use(middleware);

  router.prefix('/api');

  router.post('/user/signup', controller.apiUser.signUp);

  router.post('/user/login', controller.apiUser.login);

  router.post('/user/logout', controller.apiUser.logout);

  router.post('/user/confirm/:confirmation', controller.apiUser.confirmation);

  router.post('/user/reset', controller.apiUser.resetPasswordCode);

  router.post('/user/reset/:resetCode', controller.apiUser.resetPassword);

  return router;

}