var home = require('express').Router();

home.get('/home', function(req, res) {
  res.send("<h1>Home!</h1>");
});

home.get('/', function(req, res) {
  res.send("<h1>Home!</h1>");
});

module.exports = home;
