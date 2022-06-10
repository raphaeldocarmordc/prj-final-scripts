const Sequelize = require('sequelize');

const connection = new Sequelize('projetomusica', 'root', 'your@password', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '-03:00'
});

module.exports = connection;