var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gameState: {
    position: {
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      }
    },
    health: {
      type: Number,
      required: true
    },
    realm: {
      x: {
        type: Number,
        required: true
      },
      y: {
        type: Number,
        required: true
      }
    }
  },
  tokens: [{
    access: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
    _id: user._id.toHexString(),
     access
  },'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(function(user) {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
      decoded = jwt.verify(token, 'abc123');
  } catch (err) {
      return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;

    return User.findOne({email: email}).then(function(user){
      if(!user) {
        return Promise.reject();
      }

      return new Promise(function(resolve, reject){
        bcrypt.compare(password, user.password, function(err, res) {
          if(res) resolve(user);
          reject();
        });
      });
    });
};

UserSchema.statics.accountNotExists = function(email, username) {
  var User = this;

  console.log("Email: " + email);
  console.log("Username: " + username);

  return User.findOne({$or: [
    {email: email},
    {username: username}
  ]}).then(function(user) {
    console.log("User found: " + user);
    if(user) return Promise.reject("Account is being used");
    return Promise.resolve();
  });
}

UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')){
      var password = user.password;
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash){
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
});

var User = mongoose.model('Users', UserSchema);

module.exports = {
  User: User
}
