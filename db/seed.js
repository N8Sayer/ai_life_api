const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://192.168.1.23/ailifegame');

const { User } = require('../models/User');
const { Realm } = require('../models/Realm');

const userID = new ObjectID();

const user = [{
  _id: userID,
  email: 'jackmead515@gmail.com',
  firstName: 'Jack',
  lastName: 'Mead',
  username: 'VocoJax',
  password: 'password1!',
  gameState: {
    position: {
      x: 50,
      y: 50
    },
    realm: {
      x: 0,
      y: 0
    }
  },
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userID, access: 'auth'}, 'abc123').toString()
  }]
}];

const realm = [{
  position: {
    x: 0,
    y: 0
  },
  background: {
    height: 1000,
    width: 2000,
    key: 'background'
  },
  entites: [{
    name: 'Llama',
    position: {
      x: 200,
      y: 200
    }
  }],
  items: [{
    name: 'Tree',
    position: {
      x: 600,
      y: 300
    }
  }]
}]

/*User.remove({}).then(() => {
  return User.insertMany(user).then(() => {
    console.log("Saved user?");
  });
});*/

Realm.remove({}).then(() => {
  return Realm.insertMany(realm).then(() => {
    console.log("Saved realm?");
  });
});
