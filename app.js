var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// app.set('view engine', 'html');
const http = require('http');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
// app.use(function (req, res, next) {
//   const accept = req.accepts('html', 'json');
//   if (accept === 'html') {
//     res.sendFile('./dist/joyplace/index.html');
//   }
// })
const playerLib = require('./server/lib/player');
const comUtil = require('./server/lib/commonUtil');
const managePlayer = require('./server/management/player');
app.use(function (req, res, next) {
  // check if client sent cookie
  var sessionId = req.cookies.sessionId;
  if (!sessionId) {
    // no: set a new cookie
    sessionId = comUtil.generateSessionId(20);
    while (!managePlayer.isValidNewSessionId(sessionId)) {
      sessionId = comUtil.generateSessionId(20);
    }
    // playerLib.getNewSessionId();
    // var randomNumber = Math.random().toString();
    // randomNumber = randomNumber.substring(2, randomNumber.length);

    console.log('cookie created successfully');
    // } else {
    //   // yes, cookie was already present 

    //   res.cookie('sessionId', sessionId, {
    //     maxAge: 90000000000,
    //     httpOnly: true
    //   });
    //   console.log('cookie exists', sessionId);
  }

  res.cookie('sessionId', sessionId, {
    maxAge: 90000000000,
    httpOnly: true
  });
  next(); // <-- important!
});
app.use(express.static(path.join(__dirname, 'dist', 'joyplace')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/joyplace/index.html'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

var debug = require('debug')('orignode:server');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

const Socket = require('./server/socketHandler/socketMain');
const io = new Socket(server);
io.init();
// let io = require('socket.io').listen(server);

// const playerHandler = require('./server/socketHandler/player');
// io.on('connection', (socket) => {

//   // Log whenever a user connects
//   console.log('user connected', socket.handshake.headers.cookie);

//   io.emit('message', {
//     type: 'new-message'
//   });
//   // Log whenever a client disconnects from our websocket server
//   socket.on('disconnect', function () {
//     console.log('user disconnected');
//   });

//   // When we receive a 'message' event from our client, print out
//   // the contents of that message and then echo it back to our client
//   // using `io.emit()`
//   socket.on('message', (message) => {
//     console.log("Message Received: " + message);
//     io.emit('message', {
//       type: 'new-message',
//       text: message
//     });
//   });
//   socket.on('user', data => {
//     const newHandler = new playerHandler(socket, data);
//   });
//   // socket.on('updateUser', data => {
//   //   console.log('updateUser', data);
//   //   socket.emit('user', Object.assign({}, {
//   //     where: 'here'
//   //   }, data));
//   // })
// });
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


const db = require('./server/lib/mongoUtil');
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}


module.exports = app;
