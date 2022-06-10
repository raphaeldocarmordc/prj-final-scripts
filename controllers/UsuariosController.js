const express = require('express');
const router = express.Router();
const Usuarios = require('../models/usuarios');
const bcrypt = require('bcryptjs'); 

router.get('/usuarios', (req, res) => {
  Usuarios.findAll({
    order: [
      ['nome', 'ASC']
    ]
  }).then(usuarios => {
    res.render('usuarios/subscribe', {usuarios: usuarios})
  })
});

router.post('/usuarios/salvar', (req, res) => {
  var nome = req.body.nome;
  var email = req.body.email;
  var senha = req.body.senha;

  Usuarios.findOne ({
    where: {
      email : email
    }
  }). then (usuario => {
    if (usuario == undefined) 
    {
      var salt = bcrypt.genSaltSync(10);
      var senhaCripto = bcrypt.hashSync(senha, salt);

      Usuarios.create ({
        nome : nome,
        email : email,
        senha : senhaCripto
      }).then (() => {
        res.redirect('/')
      })
    }
    else
    {
      res.redirect('/')
    }
  })

})



module.exports = router;
