const authentication = function(req, res, next) {
  var token = req.cookies.token;
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
