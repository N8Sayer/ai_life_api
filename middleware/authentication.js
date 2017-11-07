var { User } = require('../models/User');

const authentication = function(req, res, next) {
  var token = req.cookies.token;

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
  next();
};

module.exports = {
  io_authenticate,
  authentication
}
