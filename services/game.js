const express = require('express');
const { authentication } = require('../middleware/authentication');
const bodyParser = require('body-parser');
var game = require('express').Router();

game.use(authentication); 
game.use('/game', express.static(__dirname + '/game'));

game.get('/state', function(req, res) {
  res.send("JSON of current game state");
});

module.exports = game;
