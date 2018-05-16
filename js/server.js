var express = require('express');
var app = express();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var crypto= require("crypto")
function hashPassword(password){
  var hash= crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex')
}

var auth = require('./routes/auth');
var routes= require("./routes/index")
var signup = require('./signup');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// var User = require('../models/models').User;
var Email = require('../models/models').Email;

var mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connect(process.env.MONGODB_URI);

var pg = require ('pg');
var pool = new pg.Pool({
  host: process.env.DBHOST,
  port: 5432,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  ssl: true,
});

app.use('/', signup);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, "../static")))

var session = require('express-session');
app.use(session({
    secret: 'secret cat',
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Tell Passport how to set req.user
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  pool.query({
    text: `select * from users where email = $1`,
    values: [id],
  }).then((i) => {
      var user = i.rows[0]
      done(null, {user})
  })
});

passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  pool.query({
    text:`select * from users where email like $1`,
    values:[username]
  })
  .then((i) => {
    var passwordb = i.rows[0].password
    var user = i.rows[0]
    if(passwordb !== hashPassword(password)){
      return done(null, false)
  }
  return done(null, {_id: username})
})

}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/', routes);


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

app.listen(process.env.PORT || 3005, function () {
    console.log('Server listening on:', process.env.PORT);
});
module.exports = app;
