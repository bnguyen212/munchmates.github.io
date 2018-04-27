var express = require('express');
var app = express();
var bodyParser= require('body-parser')
var path= require("path")
var express = require('express');
var path = require('path');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
var auth = require('./routes/auth');
var routes1= require("./routes/index")
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User=require('../models/models').User;
var session = require('express-session');
var mongoose = require('mongoose');
var crypto= require("crypto")
const MongoStore = require('connect-mongo')(session);
var pg =require ('pg');
var pool = new pg.Pool({
  host: process.env.DBHOST,
  port: 5432,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  ssl: true,
});
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connect(process.env.MONGODB_URI);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
var routes = require('./routes');
app.use('/', routes);
app.use('/', routes1);
app.use(express.static(path.resolve(__dirname, "../static")))
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

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Tell Passport how to set req.user
passport.serializeUser(function(user, done) {
  console.log(user)
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  pool.query({
    text: `select * from users where email = $1`,
    values: [id],
  }).then((i)=>{
      console.log(i, id)
      var user= i.rows[0]
      done(null, {user})
  })
});

  passport.use(new LocalStrategy(function(username, password, done) {
    // Find the user with the given username
    console.log("USERNAME:"+username,"PASSWORD:"+password)
    pool.query({
      text:`select * from users where email like $1`,
      values:[username]
    }).then((i)=>{
    // console.log(password,hashPassword(password))
    // console.log(i)
    var passwordb=i.rows[0].password
    var user=i.rows[0]
    if(passwordb!==hashPassword(password)){
      console.log(user)
      return done(null, false)
    }
    return done(null, {_id: username})
  })

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

app.listen(process.env.PORT || 3005, function () {
    console.log('Server listening on:', process.env.PORT);
});
module.exports = app;
