const generationManager = require('../../generation/generationManager');
const memoryMap = require('../../db/memoryMap');
const users = require('../../db/Sockets');
//const Realm = require('../../models/Realm');

const update = (socket, data, callback) => {

  console.log(data);
  var valid = false;

  switch(data.update) {
    case 'realmUp':
      valid = realmUp(socket, data.content); break;
    case 'realmDown':
      valid = realmDown(socket, data.content); break;
    case 'realmLeft':
      valid = realmLeft(socket, data.content); break;
    case 'realmRight':
      valid = realmRight(socket, data.content); break;
    case 'move':
      valid = move(data.content); break;
    case 'stat':
      valid = stat(data.content); break;
    default:
      break;
  }

  callback(valid);
};

const stat = (content) => {

}

const move = (content) => {

}

const realmUp = (socket, content) => {
  var user = users.getUser(socket.id);
  var realmPosition = user.realm.position;
  var realm = memoryMap.getRealm(realmPosition.x + "-" + realmPosition.y);
  realm.players = realm.players.filter((player) => player.id === user.id);
  memoryMap.setRealm(realm.position.x + '-' + realm.position.y, realm);
  socket.emit(user.realm.id, {'removePlayer': user.id});

  var realmPos = user.realm.position;
  realmPos.y+=1;

  var newRealm = memoryMap.getRealm(realmPos.x + "-" + realmPos.y);
  if(newRealm) {
    user.realm = newRealm;
    newRealm.players.push(user);
    memoryMap.setRealm(newRealm.position.x + '-' + newRealm.position.y, newRealm);
    users.setUser(user.id, user);
    socket.emit(user.realm.id, {'addPlayer': user});
    callback(newRealm);
  } else {
    newRealm = generationManager(realmPos);
    Realm.save(newRealm).then(() => {
      user.realm = newRealm;
      newRealm.players.push(user);
      memoryMap.setRealm(newRealm.position.x + '-' + newRealm.position.y, newRealm);
      users.setUser(user.id, user);
    });
  }
}

const realmDown = (socket, content) => {

}

const realmLeft = (socket, content) => {

}

const realmRight = (socket, content) => {

}

module.exports = update;
