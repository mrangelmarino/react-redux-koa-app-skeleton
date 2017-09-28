const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function(db) {

  async function getUser(id) {
    const user = await db.user.findOne({
      where: { id: id }
    });
    return user;
  }

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    try {
      const user = await getUser(id);
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  });

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async function(username, password, done) {

    let user;
    let userMatch = false;
    let auth = false;
    let passwordMatch = null;
    let id = null;
    let nameFirst = null;
    let nameLast = null;
    let active = null;
    let message = '';
    let failed_logins;


    try {
      user = await db.user.findOne({
        where: {
          email: username,
          password: { $ne: null }
        }
      });
    } catch(error) {
      console.log(error);
    }

    if(user) {
      userMatch = true;

      const updatedAt = Date.parse(user.get('updated_at'));
      const now = new Date().getTime();
      const timeDiff = (now - updatedAt);

      if(timeDiff > 600000) {
        user.update({
          failed_logins: 0
        })
      }

      failed_logins = user.get('failed_logins') || 0

      if(failed_logins < 4 && true) {
        const passwordHash = user.get('password');

        try {
          passwordMatch = await bcrypt.compare(password, passwordHash);
          if(!passwordMatch) {
            user.update({
              failed_logins: failed_logins + 1
            });
          }
        } catch(err) {
          console.log(err);
        }
      }
    }

    user = user && passwordMatch ? user : false;

    if(user && passwordMatch) {
      auth = user && passwordMatch;
      id = user.get('id');
      nameFirst = user.get('name_first');
      nameLast = user.get('name_last');
      active = user.get('active');

      user.update({
        failed_logins: 0
      })
    }

    if(userMatch === false) {
      message = 'User doesn\'t exist.';
    } else if (failed_logins >= 4) {
      message = 'Too many failed login attempts. Try again in 10 minutes.'
    } else if(userMatch === true && passwordMatch !== true) {
      message = 'Password is incorrect. You have ' + (4 - failed_logins) + ' more attempts.'
    }

    return done(null, user, { message: {
      auth,
      id,
      nameFirst,
      nameLast,
      active,
      message
    }});

  }));
}
