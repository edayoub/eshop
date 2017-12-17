const express = require('express');
const mongoose =require('mongoose');
const passport=require('passport');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session =require('express-session');
let index = require('./routes/index');
let users = require('./routes/users');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/user', {
    useMongoClient: true,
})
    .then(()=>console.log('Mongodb connected'))
    .catch(err=>console.log(err));
let app = express();
//use session
 app.use(session({
     secret:'key crypt',
     resave:true,
     saveUninitialized:true
 }));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
//require local strategy passport
require('./config/passport')(passport);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
