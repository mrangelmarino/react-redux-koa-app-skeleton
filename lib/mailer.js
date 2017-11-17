const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN
  }
}

const nodemailerMailgun = nodemailer.createTransport(mailgun(auth));

const confirmation = (email, hash) => {
  const encodedHash = encodeURIComponent(hash)

  return new Promise((resolve, reject) => {
    nodemailerMailgun.sendMail({
      from: process.env.MAILGUN_EMAIL,
      to: email,
      subject: 'Confirm your account',
      html: '<p><a href="http://localhost:3000/confirm/' + encodedHash + '">Click here</a> to confirm your account.</p>',
      text: 'Please confirm you account by going to the following url: http://localhost:3000/confirm/' + encodedHash
    }, function(error, info){
      if(error) {
        console.log(error);
        reject(error);
      } else {
        console.log(info);
        resolve(info);
      }
    })
  })
}

const reset = (email, hash) => {
  const encodedHash = encodeURIComponent(hash)

  return new Promise((resolve, reject) => {
    nodemailerMailgun.sendMail({
      from: process.env.MAILGUN_EMAIL,
      to: email,
      subject: 'Reset your password',
      html: '<p><a href="http://localhost:3000/reset/' + encodedHash + '">Click here</a> to reset your password. This link will expire in 30 minutes.</p>',
      text: 'Reset your password by going to the following url: http://localhost:3000/reset/' + encodedHash + '. This link will expire in 30 minutes.'
    }, function(error, info){
      if(error) {
        console.log(error);
        reject(error);
      } else {
        console.log(info);
        resolve(info);
      }
    })
  });
}

module.exports = async (ctx, next) => {
  ctx.email ={
    confirmation,
    reset
  }
  await next();
}