const express = require('express');
const router = express.Router();
const Genero = require('../models/generos');

router.get('/generos', (req, res) => {
  Genero.findAll ({
    order: [
      ['genero', 'ASC']
    ]
  }).then(generos => {
    res.render('generos/index', { generos: generos });
  })
});

router.get('/generos/add-generos', (req, res) => {
  res.render('generos/add-generos');
});

router.post('/generos/salvar', (req, res) => {
  var genero = req.body.genero;

  Genero.findOne ({
    where: {
      genero : genero
    }
  }).then(gen => {
    if (gen == undefined) {
      Genero.create ({
        genero: genero
      }).then(() => {
        res.redirect('/generos');
      })
    } else {
      res.redirect('/generos');
    }
  })
});

router.get('/generos/excluir/:id', (req, res) => {
  var id = req.params.id;

  Genero.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/generos');
  })
});

module.exports = router;