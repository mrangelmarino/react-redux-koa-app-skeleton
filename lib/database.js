const Sequelize = require('sequelize');
const fs = require('fs');

const sequelize = new Sequelize('app', 'app', '', {
  host: 'localhost',
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