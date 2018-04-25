var express = require('express');
var router = express.Router();

var User=require("../../models/models.js").User
var pg =require ('pg');
var pool = new pg.Pool({
  host: "localhost",
  max:20,
  database:"munchmates"
  //connectionSring: process.env.DATABASE_URL
});

if (!pool){
  console.log("Connection Error");
}

//const request = require('request');
router.get('/hi', function(req, res, next){
  res.send("hi")
})
router.get('/places', function(req, res, next) {
  pool.query('SELECT * FROM vendors')
  .then(function (result){
    console.log(result.rows[0])
    res.json(result.rows)
  })
  .catch(function(err){
    console.log(err, "ERR")
    res.json({"err": err})
  })
})
router.get('/users/userId', function(req, res, next){
  pool.query(`select * from users where id = ${userId}`)
  .then(function(result){
    res.json(result.rows[0])
  })
})

router.get('/favorites/userId', function(req, res, next){
  pool.query(`select favorites from users where id = ${userId}`)
  .then(function(result){
    res.json(result.rows[0])
  })
})




module.exports = router;
