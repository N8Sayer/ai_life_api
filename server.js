import bodyParser from 'body-parser';
import statusMonitor from 'express-status-monitor';

import home from './services/home';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(statusMonitor());

/*
  Structure the API url like so. That way, if needed, we can
  create a version 2, or '/api/v2'
*/
app.use('/api/v1/', home);

/*io.on('connection', function(socket){
  console.log('a user connected');
});*/

http.listen(3000, () => {
  console.log("Server booted on port 3000");
});
