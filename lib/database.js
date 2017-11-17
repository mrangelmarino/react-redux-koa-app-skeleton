const Sequelize = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(()=>{
    console.log('Database connection established');
  })
  .catch(err => {
    throw err;
});

const Model = {};
const models = fs.readdirSync('model');
models.forEach((file) => {
  const model = file.toLowerCase().replace('.js','');
  Model[model] = sequelize.import('../model/' + file);
});

sequelize.sync()

async function init(ctx, next) {
  ctx.db = Model;
  await next()
}

module.exports = () => {
  return {
    init: init,
    db: Model
  }
};