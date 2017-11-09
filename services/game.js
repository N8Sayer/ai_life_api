const express = require('express');
const { authentication } = require('../middleware/authentication');
const bodyParser = require('body-parser');
const fs = require('fs');

const { genForest } = require('../generation/biome/');
const generationManager = require('../generation/generationManager');
const memoryMap = require('../db/memoryMap');

var game = require('express').Router();


/**
  TODO:

  POS 1: Player is getting current state of themselves. (Just stating the game)
    If the realm doesn't exist in the memoryMap, find the realm in the database and return it.
    If it doesn't exist in the database, generate a new one using the generationManager, then create a new map in the memoryMap.

  POS 2: Player is moving to new realm
    If the realm the player is currently in IS in the memoryMap, broadcast to all players that player is leaving. Players will update their local game
    If the realm the player is currently in IS NOT in the memoryMap, send the realm data back to the server.
    Find the realm in the database (based on next player position) and return it.
    If is doesn't exist in the database, generate a new one using the generationManager, then create a new map in the memoryMap.
    If the next realm does exist in the memoryMap, add the player too it and broadcast a new player added to the map. Send all
    data from memoryMap to the current player to load.

  POS 3: Player is acting within a realm
    Player transmits data to server,
    server decides if it's valid based on what it has in the memoryMap,
    server broadcasts new property of world to change to all players currently within realm
    players will update based on what move it made.

  POS 4: Player is disconnecting from game
    Player sends 'disconnect' io socket to server
    Server removes them, based on current stats on server, from the memoryMap
    If no one else is in the memoryMap, realm is saved to database.
    Otherwise, server broadcasts that a player is disconnected to all players currently within realm
    players will remove player from their local game

*/


game.use('/game', authentication);

game.use('/game', express.static(__dirname + '/game'));

game.post('/state', authentication, function(req, res) {
  /*
  var user = req.user;
  var realm = memoryMap.getRealm(user.gameState.realm.id);

  if(realm) {
    res.send(realm);
  } else {
    Realm.findByPosition({user.gameState.realm.x, user.gameState.realm.y}).then((dbRealm) => {
      if(!dbRealm) {
        var newRealm = generationManager(user.gameState.realm.position);
        newRealm.players.push(user);
        memoryMap.set(newRealm.id, newRealm);
        res.send(newRealm);
        //Generate new realm!
      } else {
        dbRealm.players.push(user);
        memoryMap.set(dbRealm.id, dbRealm);
        res.send(dbRealm);
      }
    });
  }
  */

  //var map = JSON.parse(fs.readFileSync(__dirname + '/testMap.json'));
  //res.set('Content-Type', 'application/json');

  var map = genForest();
  res.send(JSON.stringify(map));

});

game.post('/update', authentication, function(req, res) {

  var user = req.user;
  var map = req.map;

  Realm.save(map).then(() => {
    User.save(user).then(() => {



    }).catch((err) => {

    });
  }).catch((err) => {

  });


});

module.exports = game;
