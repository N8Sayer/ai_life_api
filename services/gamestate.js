import express from 'express';
import authenticate from '../middleware/authentication';
import bodyParser from 'body-parser';

const router = express.Router();

router.get('/gamestate', authenticate, function(req, res) {
  res.send("JSON of current game state");
});
