const express = require('express');
const router = express.Router();
const Musica = require('../models/musicas');
const Cantor = require('../models/cantores');
const Genero = require('../models/generos');
const Album = require('../models/albuns');

router.get('/musicas', (req, res) => {
  Musica.findAll ({
    order: [
      ['nome', 'ASC']
    ],
    include: [{
      model: Cantor
    }]
  }).then(musicas => {
    res.render('musicas/index', {musicas: musicas});
  })
});

router.get('/musicas/add-musica', (req, res) => {
  Cantor.findAll({
    order: [
      ['nome', 'ASC']
    ]
  }).then(cantores => {
    Genero.findAll ({
      order: [
        ['genero', 'ASC']
      ]
    }).then(generos => {
      Album.findAll ({
        order: [
          ['nome', 'ASC']
        ]
      }).then(albuns => {
        res.render('musicas/add-musica', {cantores: cantores, generos: generos, albuns: albuns});
      })
    })
  });
});

router.post('/musicas/salvar', (req, res) => {
  var nome = req.body.nome;
  var tempoDuracao = req.body.tempoDuracao;
  var cantoreId = req.body.cantoreId;
  var albunId = req.body.albunId;
  var generoId = req.body.generoId;

  Musica.findOne ({
    where: {
      nome : nome
    }
  }).then(musica => {
    if (musica == undefined) {
      Musica.create ({
        nome: nome,
        tempoDuracao: tempoDuracao,
        cantoreId: cantoreId,
        albunId: albunId,
        generoId: generoId
      }).then(() => {
        res.redirect('/musicas')
      })
    } else {
      res.redirect('/musicas')
    }
  });
});

router.get('/musicas/excluir/:id', (req, res) => {
  var id = req.params.id;

  Musica.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/musicas')
  });
});

module.exports = router;