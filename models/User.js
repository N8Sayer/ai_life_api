import db from '../db/mongo';
var Schema = require('mongoose').Schema;

var User = new Schema({
  name: {
    first: String,
    last: String,
  },
  username: String,
  email: String,
  password: String,
  lastLoggedIn: Date,
  gameState: {
    position: {
      x: Number,
      y: Number
    },
    realm: {
      id: Number,
      x: Number,
      y: Number
    }
  }
});
