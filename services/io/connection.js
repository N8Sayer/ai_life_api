const update = require('./update');
const disconnect = require('./disconnect');
const realm = require('./realm');

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

const io_connect = (socket) => {
  console.log("User connected");

  socket.on('update', function(data, callback) { update(socket, data, callback) });
  socket.on('realm', function(data, callback) { realm(socket, data, callback) });
  socket.on('disconnect', function(data, callback) { disconnect(socket, data, callback) });
}



module.exports = io_connect;
