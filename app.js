var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const authenticate = require('./authenticate');
const config = require('./config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const campsiteRouter=require('./routes/campsiteRouter');
const partnerRouter=require('./routes/partnerRouter');
const promotionRouter = require('./routes/promotionRouter');
const mongoose = require('mongoose');
const session=require('express-session');
const fileStore=require('session-file-store')(session);

const url = config.mongoUrl;
const connect = mongoose.connect(url, {});

connect.then(() => console.log('Connected correctly to server'),
  err => console.log(err)
);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
   name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));
app.use('/',indexRouter);
app.use('/users',usersRouter);


app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/campsites',campsiteRouter);
app.use('/promotion',promotionRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
