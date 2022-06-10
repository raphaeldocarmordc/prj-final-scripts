const Sequelize = require('sequelize');
const connection = require('../database/database');

const Cantor = connection.define('cantores', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nascimento: {
    type: Sequelize.DATE,
    allowNull: false
  },
  pais: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Cantor.sync({ force: true });

module.exports = Cantor;