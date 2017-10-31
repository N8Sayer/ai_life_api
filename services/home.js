import express from 'express';

const router = express.Router();

router.get('/home', function(req, res) {
  res.send("<h1>Home!</h1>");
});
