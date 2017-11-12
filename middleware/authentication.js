var { User } = require('../models/User');
const users = require('../db/Sockets');

const authentication = function(req, res, next) {
  var token = req.cookies.token;

  User.findByToken(token).then((user) => {
    if(!user) return Promise.reject();

    req.user = user;
    req.token = token;

    next();
  }).catch((err) => {
    res.send('/api/v1/login');
  });
};

const io_authenticate = (socket, next) => {
  console.log("io authentication...")
  next();
};

module.exports = {
  io_authenticate,
  authentication
}
