global.__basedir = __dirname;

const bodyParser = require('body-parser');
const statusMonitor = require('express-status-monitor');
const cookieParser = require('cookie-parser');

const { io_authenticate } = require('./middleware/authentication');

const home = require('./services/home');
const game = require('./services/game');

const io_connection = require('./services/io_connection');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(statusMonitor());
app.use(cookieParser());

/*
  Structure the API url like so. That way, if needed, we can
  create a version 2, or '/api/v2'
*/
app.use('/api/v1/', home);
app.use('/api/v1/game/', game);

io.use(io_authenticate);
io.on('connection', io_connection);


http.listen(5000, () => {
  console.log("Server booted on port 5000");
});
