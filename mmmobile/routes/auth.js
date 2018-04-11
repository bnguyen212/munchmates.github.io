var express = require('express');
var router = express.Router();
var User=require("../models/models.js").User
var crypto =require('crypto');
function hashPassword(password){
  var hash= crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex')
}
module.exports = function(passport) {
  // Add Passport-related auth routes here, to the router!
  // YOUR CODE HERE
  router.get("/", function(req, res){
    if (!req.user) {
      res.redirect("/login",);
    }else{
      res.redirect("/contacts");
    }
  });


  router.post("/signup", function(req, res){
    console.log(req.body, "aaaaa")
    if(req.body.username && req.body.password) {
      var newUser= new User({
        username:req.body.username,
        password:hashPassword(req.body.password)
      })
      newUser.save(function(err, user) {
        if (err) {
          console.log(err);
          res.status(500).redirect('/signup');
          return;
        }
        console.log(user);
        res.json({});
      })
    }else{
      console.log("invalid entry");
      res.status(400).send(req.body.username, req.body.password)
    }

  })

  router.post("/login", passport.authenticate('local'), function(req, res){
    res.redirect('/contacts');
  })

  router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/login");
  })

  return router;
}
