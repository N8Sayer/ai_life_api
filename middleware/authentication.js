var { User } = require('../models/User');
const users = require('../db/Sockets');

const authentication = function(req, res, next) {
  var token = req.cookies.token;

  //var token = req.body.token;

  console.log("Token: " + token);

  var user = users.getUser(token);
  if(!user) users.setUser(token, {token, position: {x: 50, y: 50}, health: 100});

  /*User.findByToken(token).then((user) => {
    if(!user) return Promise.reject();

    req.user = user;
    req.token = token;

    next();
  }).catch((err) => {
    res.send('/api/v1/home');
  });*/
  //find by token;
  //res.sendStatus(404);
  next();
};

const io_authenticate = (socket, next) => {
  console.log("IO Cookie: " + socket.cookies.token);
  console.log("io authentication...")
  next();
};

module.exports = {
  io_authenticate,
  authentication
}
