const bodyParser = require('body-parser');
const express = require('express');

const authentication = function(req, res, next) {
  next();
};

const io_authenticate = (socket, next) => {
  next();
};

module.exports = {
  io_authenticate,
  authentication
}
