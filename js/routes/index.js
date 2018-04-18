var express = require('express');
var router = express.Router();
//var User=require("../../models/models.js").User;
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

module.exports = router;
