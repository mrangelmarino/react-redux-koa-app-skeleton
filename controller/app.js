class App {

  static async index(ctx, next) {
    let isAuth = ctx.isAuthenticated();
    isAuth = isAuth.toString();

    ctx.cookies.set('ppaLcl', isAuth, { httpOnly: false });

    await ctx.render('index');

    await next();

  }

}

module.exports = App;