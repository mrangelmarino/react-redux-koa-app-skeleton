const fs = require('fs');
const path = require('path');

function Controllers () {
  controller = {};
  const controllers = fs.readdirSync('./controller').filter((file) => file !== 'index.js');
  controllers.forEach((file) => {
    const fileName = file.replace('.js', '');
    const filePath = path.resolve(__dirname, file);
    controller[fileName] = require(filePath);
  });
  return controller;
}

module.exports = Controllers();