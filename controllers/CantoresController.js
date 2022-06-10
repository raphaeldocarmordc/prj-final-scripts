const express = require('express');
const router = express.Router();
const Cantor = require('../models/cantores');

router.get('/cantores', (req, res) => {
  Cantor.findAll ({
    order: [
      ['nome', 'ASC']
    ]
  }).then(cantores => {
    res.render('cantores/index', { cantores: cantores });
  })
});

router.get('/cantores/add-cantores', (req, res) => {
  res.render('cantores/add-cantores');
});

router.post('/cantores/salvar', (req, res) => {
  var nome = req.body.nome;
  var nascimento = req.body.nascimento;
  var pais = req.body.pais;

  Cantor.findOne ({
    where: {
      nome : nome
    }
  }).then(cantor => {
    if (cantor == undefined) {
      Cantor.create ({
        nome: nome,
        nascimento: nascimento,
        pais: pais
      }).then(() => {
        res.redirect('/cantores')
      })
    } else {
      res.redirect('/cantores')
    }
  })
});

router.get('/cantores/excluir/:id', (req, res) => {
  var id = req.params.id;

  Cantor.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/cantores');
  });
});

module.exports = router;