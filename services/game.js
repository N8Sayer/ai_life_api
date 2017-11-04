const express = require('express');
const { authentication } = require('../middleware/authentication');
const bodyParser = require('body-parser');
var game = require('express').Router();

game.use('/game', authentication);
game.use('/game', express.static(__dirname + '/game'));

/*game.post('/game', authentication, function(req, res) {
  res.sendFile(__dirname + '/game/index.html');
});

game.get('/game', authentication, function(req, res) {

});

game.get('/state', function(req, res) {
  res.send("JSON of current game state");
});*/

module.exports = game;
