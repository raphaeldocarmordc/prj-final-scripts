function verificaLogin(req, res, next) {
  if (req.session.login != undefined) {
    next();
  } else {
    res.redirect('/')
  }
}

module.exports = verificaLogin;