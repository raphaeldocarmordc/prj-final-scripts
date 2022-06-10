const Sequelize = require('sequelize');
const connection = require('../database/database');

const Cantor = require('./cantores');
const Genero = require('./generos');
const Album = require('./albuns');

const Musica = connection.define('musicas', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  tempoDuracao: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Musica.belongsTo(Cantor);
Musica.belongsTo(Album);
Musica.belongsTo(Genero);

// Musica.sync({ force: true });

module.exports = Musica;
