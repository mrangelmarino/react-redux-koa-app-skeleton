const bcrypt = require('bcrypt');
const passport = require('koa-passport');

// Controller class
class ApiUser {

  static async signUp(ctx, next) {
    const formData = ctx.request.body;

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(formData.password, salt);
    const emailHash = await bcrypt.hash(formData.email, salt);

    let isUserCreated;
    let user;

    const errorMessage = {
      message: 'There was an error processing your request. Please contact us for help.'
    };
    let errorStatus = 500;

    try {
      user = await ctx.db.user.findOrCreate({
        where: {
          name_first: formData.firstName,
          name_last: formData.lastName,
          email: formData.email,
          password: passwordHash,
          confirmation: emailHash
        }
      });

      isUserCreated = user[1];

    } catch(error) {
      console.log(error)
      if(error) {
        if(error.name === 'SequelizeUniqueConstraintError') {
          errorMessage.message = 'A user with that email already exists';
          errorStatus = 409;
        }
      }
      isUserCreated = false;
    }

    await next();

    ctx.set('Content-Type', 'application/json');

    if(isUserCreated) {
      let confirmationEmail;

      try {
        confirmationEmail = await ctx.email.confirmation(user[0].get('email'), user[0].get('confirmation'));
      } catch(error) {
        ctx.status = 503;
        ctx.body = JSON.stringify({
          message: 'There was a problem sending your confirmation email. Please contact us for help.',
        })
      }

      if(confirmationEmail) {
        ctx.status = 201;
        ctx.body = JSON.stringify({
          message: '',
          active: user[0].get('active')
        })
      }

    } else {
      ctx.status = errorStatus;
      ctx.body = JSON.stringify(errorMessage);
    }

  }

  static async login(ctx, next) {

    await passport.authenticate('local', async function(err, user, info, status){

      if(err) {
        ctx.status = 500;
      }

      if(user) {
        ctx.login(user);
        ctx.status = 200;
      } else {
        ctx.status = 401;
      }

      ctx.set('Content-Type', 'application/json');
      ctx.body = info.message;

    })(ctx, next);

    await next();

  }

  static async logout(ctx, next) {
    const body = ctx.request.body;

    await next();

    ctx.set('Content-Type', 'application/json');

    if(body.id === ctx.state.user.get('id')) {
      ctx.logout();
      ctx.status = 200;
      ctx.body = JSON.stringify({ auth : false });
    } else {
      ctx.status = 400;
      ctx.body = JSON.stringify({
        message: 'There was a problem processing your request'
      })
    }

  }

  static async confirmation(ctx, next) {
    const confirmation = decodeURIComponent(ctx.params.confirmation);

    let user;
    let validHash;

    try {
      user = await ctx.db.user.findOne({
        where: {
          confirmation: confirmation
        }
      });
    } catch(error) {
      console.log(error);
    }

    if(user) {
      const email = user.get('email');
      validHash = await bcrypt.compare(email, confirmation);
      if(validHash) {
        user.update({
          confirmation: null,
          active: true
        });
      }
    }

    await next();

    if(validHash) {
      ctx.status = 200;
      ctx.body = JSON.stringify({
        active: true,
        message: 'Email confirmed. Please log in to continue.'
      })
    } else {
      ctx.status = 401;
      ctx.body = JSON.stringify({
        active: '',
        message: 'Invalid confirmation code. Try logging in, signing up, or recovering your password.'
      })
    }
  }

  static async resetPasswordCode(ctx, next) {

    const email = ctx.request.body.email;
    let user;
    let message;

    try {
      user = await ctx.db.user.findOne({
        where: {
          email: email
        }
      })
    } catch(error) {
      console.log(error);
    }

    await next();

    if(user) {
      const salt = await bcrypt.genSalt(10);
      const emailHash = await bcrypt.hash(email, salt);
      const emailHashAndTime = emailHash + 'bckts' + (new Date().getTime()).toString();
      let mailer;

      try{
        mailer = await ctx.email.reset(email, emailHashAndTime);
      } catch(error) {
        console.log(error);
      }

      if(mailer) {

        user.update({
          password_temp: emailHashAndTime
        })

        ctx.status = 200;
        message = 'An email with a link to reset your password has been sent to your email address.';

      } else {
        ctx.status = 500;
        message = 'There was a problem sending your reset email. Try again later, or contact us for help.'
      }


    } else {
      ctx.status = 404;
      message = 'A user with that email address does not exit.';
    }

    ctx.body = {
      message: message
    }

  }

  static async resetPassword(ctx, next) {
    let resetCode = decodeURIComponent(ctx.request.body.resetCode);
    const resetTime = resetCode.split('bckts')[1] || 0;
    let user;
    let message;

    try {
      user = await ctx.db.user.findOne({
        where: {
          password_temp: resetCode
        }
      });
    } catch(error) {
      console.log(error);
    }

    if(user) {
      if((new Date().getTime() - resetTime) > 1800000) {
        ctx.status = 401;
        message = 'Your reset password link has expired. Please try resetting your password again.'
      } else {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(ctx.request.body.password, salt);
        user.update({
          password: passwordHash,
          password_temp: null
        })
        ctx.status = 200;
        message = 'Your password has successfully been updated. Please login.'
      }
    } else {
      ctx.status = 401;
      message = 'Your reset password link is either invalid or expired. Please try resetting your password again.'
    }

    await next();

    ctx.body = {
      message: message
    }
  }

}

module.exports = ApiUser;
