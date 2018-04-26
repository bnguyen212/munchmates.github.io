var express = require('express');
var router = express.Router();
var User=require("../../models/models.js").User
var crypto =require('crypto');
var User=require("../../models/models.js").User
var pg =require ('pg');

var pool = new pg.Pool({
  connectionSring: process.env.DATABASE_URL
});
function hashPassword(password){
  var hash= crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex')
}
module.exports = function(passport) {
  router.get("/", function(req, res){
    if (!req.user) {
      res.redirect("/login",);
    }else{
      res.redirect("/contacts");
    }
  });


  router.post("/signupa", function(req, res){
    console.log(req.body)
    pool.query(
     'insert into users(email, password) values($1, $2)',
     [req.body.username, hashPassword(req.body.password)],
     (err, resp)=> {if(err){
       console.log(err)
     }
     else{
       res.json({"ok":true})
     }
   })
  })

  router.post("/login", passport.authenticate('local'), function(req, res){
    res.json({"authenticated": true})
  })

  router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/login");
  })

  return router;
}
