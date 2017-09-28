async function isAuth(ctx, next) {
    const isAuth = ctx.isAuthenticated();
    if(!isAuth) {
      ctx.status = 403;
      ctx.type = 'application/json';
      ctx.body = {
        auth: false
      }
    } else {
      await next();
    }
}

module.exports = isAuth;