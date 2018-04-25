var express = require('express');
var router = express.Router();
var User=require("../../models/models.js").User
var crypto =require('crypto');
var User=require("../../models/models.js").User
var pg =require ('pg');
var pool = new pg.Pool({
  host: "localhost",
  max:20,
  database:"munchmates"
  //connectionSring: process.env.DATABASE_URL
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
    console.log(req.body, "aaaaa")
    console.log(req.body.username, "bbbb");
    pool.query({
      text: `insert into vendors(email, password) values($1, $2)`,
      values: [req.body.username, req.body.password]
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
