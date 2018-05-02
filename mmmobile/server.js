
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
var auth = require('./routes/auth');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User=require('./models/models').User;
var session = require('express-session');
var app = express();
var mongoose = require('mongoose');
var crypto= require("crypto")
const MongoStore = require('connect-mongo')(session);


function hashPassword(password){
  var hash= crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex')
}
mongoose.connect(process.env.MONGODB_URI);
//app.use(session({ secret: 'keyboard cat' }));
app.use(session({
    secret: 'secret cat',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Tell Passport how to set req.user
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Tell passport how to read our user models
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  User.findOne({ username: username }, function (err, user) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      console.log("giremedi")
      return done(err);
    }
    // if no user present, auth failed
    if (!user) {
      console.log(user);
      console.log("giremedi1")
      return done(null, false);
    }
    // if passwords do not match, auth failed
    if (user.password !== hashPassword(password)) {
      console.log("giremedi2")
      return done(null, false);
    }
    // auth has has succeeded
    console.log("girdi")
    return done(null, user);
  });
}));
app.use(passport.initialize());
app.use(passport.session());

// Uncomment these out after you have implemented passport in step 1
app.use('/', auth(passport));
//app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log('hit 404 handler')
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.json({
    message: err.message,
    error: {}
  });
});

app.listen(3000, function () {
    console.log(' server listening on: 3000');
});
module.exports = app;
