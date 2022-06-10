const express = require('express');
const router = express.Router();
const Album = require('../models/albuns');

router.get('/albuns', (req, res) => {
  Album.findAll ({
    order: [
      ['nome', 'ASC']
    ]
  }).then(albuns => {
    res.render('albuns/index', {albuns: albuns});
  })
});

router.get('/albuns/add-albuns', (req, res) => {
  res.render('albuns/add-albuns');
});

router.post('/albuns/salvar', (req, res) => {
  var nome = req.body.nome;

  Album.findOne ({
    where: {
      nome : nome
    }
  }).then(album => {
    if (album == undefined) {
      Album.create ({
        nome: nome
      }).then(() => {
        res.redirect('/albuns');
      })
    } else {
      res.redirect('/albuns');
    }
  })
});

router.get('/albuns/excluir/:id', (req, res) => {
  var id = req.params.id;

  Album.destroy({
    where: {
      id: id
    }
  }).then(() => {
    res.redirect('/albuns')
  })
})

module.exports = router;

