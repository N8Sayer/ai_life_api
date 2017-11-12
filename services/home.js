var home = require('express').Router();
const express = require('express')
const { User } = require('../models/User');

home.get('/home', function(req, res) {
  res.send("<h1>Home!</h1>");
});

home.get('/', function(req, res) {
  res.send("<h1>Home!</h1>");
});

home.use('/login', express.static(__basedir + '/temp'));

home.get('/login', function(req, res) {
  res.sendFile(__basedir + '/temp/login.html');
});

home.post('/create', function(req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;

    User.accountNotExists(email, username).then((user) => {

        var newUser = new User({
          email: email,
          password: password,
          username: username,
          firstName: firstname,
          lastName: lastname,
          gameState: {
            position: { x: 50, y: 50 },
            health: 100,
            realm: { x: 0, y: 0 }
          }
        });

        newUser.save().then(function() {
          return newUser.generateAuthToken();
        }).then(function(token) {
          res.cookie('token', token, {maxAge: 36000000}).send({status: 200});
        }).catch(function() {
          res.send({message: "Failed to authenticate", status: 404});
        });

    }).catch((err) => {
      res.send({message: err, status: 404});
    });
});

home.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.findByCredentials(email, password).then(function(user){
    user.tokens = [];
    return user.save().then(function(){
      return user.generateAuthToken().then(function(token) {
        res.cookie('token', token, {httpOnly: false}).send({ status: 200 });
      });
    }).catch(function(err){
      res.send({ message: 'Failed to login to account. Please try again.', status: 400 });
    });
  }).catch(function(err){
    res.send({ message: 'User account does not exist!', status: 400 });
  });
});

module.exports = home;
