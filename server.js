const Koa = require('koa');
const app = new Koa();

const static = require('koa-static');
const views = require('koa-views');
const bodyParser = require('koa-body');
const database = require('./lib/database')();
const router = require('./routes');
const session = require('koa-session');
const passport = require('koa-passport');
const mailer = require('./lib/mailer');

const https = require('https');
const env = process.env.NODE_ENV;
const path = require('path');
const fs = require('fs');

// ssl
const options = {
  key: fs.readFileSync('./cert/server.key'),
  cert: fs.readFileSync('./cert/server.crt')
}

// middleware
app.use(static('public'));

app.use(views(path.join(__dirname, '/view'), { extension: 'nunjucks' }));

app.use(bodyParser());

app.use(mailer);

// load database and add models to ctx
app.use(database.init);

// sesssion and authentication
app.keys = ['63CCYRXU3VQXp3Pr6KzOVZzaZrJbSjhCVxZQj5Ru'];
app.use(passport.initialize());
app.use(passport.session());
require('./lib/authentication')(database.db);

// router
app.use(router(session({ key: 'lclApp' }, app)));

// start server
https.createServer(options, app.callback()).listen(3000, console.log('Server started'));