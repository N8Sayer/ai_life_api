const express = require('express');
const { authentication } = require('../middleware/authentication');
const genForest = require('../generation/genForest');
const bodyParser = require('body-parser');
const fs = require('fs');
var game = require('express').Router();

game.use('/game', authentication);
game.use('/game', express.static(__dirname + '/game'));

/*game.post('/game', authentication, function(req, res) {
  res.sendFile(__dirname + '/game/index.html');
});

game.get('/game', authentication, function(req, res) {

});*/

game.post('/state', authentication, function(req, res) {

  //var map = JSON.parse(fs.readFileSync(__dirname + '/testMap.json'));
  //res.set('Content-Type', 'application/json');
  var map = genForest();

  res.send(JSON.stringify(map));

});

module.exports = game;
