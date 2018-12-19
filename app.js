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
let http = require('http').Server(app);


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

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});
// app.get('/*', function (req, res) {
//   res.sendFile('./dist/joyplace/index.html'); // load the single view file (angular will handle the page changes on the front-end)

// });
// app.get('*', function (req, res) {
//   res.sendFile('./dist/joyplace/index.html'); // load the single view file (angular will handle the page changes on the front-end)

// });
module.exports = app;
