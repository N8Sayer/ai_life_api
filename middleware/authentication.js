const bodyParser = require('body-parser');
const express = require('express');

var authentication = express.Router();

authentication.get('/', function(req, res, next) {
  next();
});

const io_authenticate = (socket, next) => {
  next();
};

module.exports = {
  io_authenticate,
  authentication
}
