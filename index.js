const express = require('express');
const app = express();
const session = require('express-session');
const connection = require('./database/database');
const bcrypt = require('bcryptjs');
const checkLogin = require('./middleware/checkLogin');

// setup do ambiente
// View engine
app.set('view engine', 'ejs');

// Sessions
app.use(session({
  secret: 'projetomusica',
  cookie: {
    maxAge: 1200000,
  },
  resave: false,
  saveUninitialized: false
}));

// Ativar os arquivos estáticos
app.use(express.static('public'));

// Banco de Dados
connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com sucesso!');
  })
  .catch(erro => {
    console.log('Problemas na conexão');
  });

// Parser de formulários
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Models
const Usuario = require('./models/usuarios');
const Genero = require('./models/generos');
const Album = require('./models/albuns');
const Cantor = require('./models/cantores');
const Musica = require('./models/musicas');

// Controllers
const UsuariosController = require('./controllers/UsuariosController');
const CantoresController = require('./controllers/CantoresController');
const GenerosController = require('./controllers/GenerosController');
const AlbunsController = require('./controllers/AlbunsController');
const MusicasController = require('./controllers/MusicasController');

// Rotas
app.get('/', (req, res) => {
  res.render('login', { msg: '' });
});

app.post('/', (req, res) => {
  var email = req.body.email;
  var senha = req.body.senha;

  Usuario.findOne({
    where: {
      email: email
    }
  }).then(usuario => {
    if (usuario != undefined) {
      res.render('home')
    } else {
      res.render('login', { msg: 'Usuário ou senha inválidas!' });
    }
  })
});

// Rotas externas
app.use('/', UsuariosController);
app.use('/', CantoresController);
app.use('/', GenerosController);
app.use('/', AlbunsController);
app.use('/', MusicasController);

app.listen(8080, () => {
  console.log('O servidor está ativo')
});