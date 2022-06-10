const Sequelize = require('sequelize');
const connection = require('../database/database');

const Album = connection.define('albuns', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Album.sync({ force: true });

module.exports = Album;