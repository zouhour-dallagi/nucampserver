var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const campsiteRouter=require('./routes/campsiteRouter');
const partnerRouter=require('./routes/partnerRouter');
const promotionRouter = require('./routes/promotionRouter');
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/nucampsite';
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
app.use(cookieParser('12345-67890-09876-54321'));
function auth(req,res,next){
  if(!req.signedCookies.user){
    const authHeader=req.headers.authorization;
    if(!authHeader){
      const err=new Error('you are not authenticated!');
      res.setHeader('WWW-Authenticate','basic');
      err.status=401;
      return next(err);
    }
  
  const auth=Buffer.from(authHeader.split('')[1],'base64').toString().split(':');
  const user =auth[0];
  const pass=auth[1];
  if(use==='admin'&& pass==='password'){
    res.cookie('user','admin',{signed:true});
    return next();
  }else{
    const err=new Error('you are not authenticated!');
    res.setHeader('WWW-Authenticate','Basic');
    err.status=401;
    return next(err);
  }
  }
else{
  if(req.signedCookies.user==='admin'){
   return next();
  }
  else{
     const err = new Error('You are not authenticated!');
     err.status = 401;
     return next(err);
  }
}}
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
