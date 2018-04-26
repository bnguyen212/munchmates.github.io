var express = require('express');
var router = express.Router();

var User=require("../../models/models.js").User
var pg =require ('pg');
var pool = new pg.Pool({
  connectionSring: process.env.DATABASE_URL
});

if (!pool){
  console.log("Connection Error");
}

//const request = require('request');
// router.get('/hi', function(req, res, next){
//   res.send("hi")
// })
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
router.get('/user', function(req, res, next){
  pool.query('select * from users where _email $1' [req.body.email])
  .then(function(result){
    res.json(result.rows[0])
  })
})
router.get('/preferences', function(req, res, next){
  pool.query('select * from emails where _email $1', [req.body.email],
  (result)=>{
    res.json(result.rows[0])
  })
})
router.get('/settings', function(req, res, next){
  pool.query('select * from settings where _email $1', [req.body.email],
  (result)=>{
    res.json(result.rows[0])
  })
})
router.post('/user/preference', function(req, res, next){
  pool.query('update preferences budget=$1, diet=$2, cuisines=$3, allergies=$4, otherAllergy=$5, popularityRating=$6, ratingRating=$7, proximityRating=$8, menuRating=$9,  ambienceRating=$11, where _email like $12 ',
   [req.body.budget, req.body.diet, req.body.cuisines, req.body.allergies, req.body.otherAllergy, req.body.popularityRating, req.body.ratingRating, req.body.proximityRating, req.body.menuRating, req.body.ambienceRating, req.body.email],
   (err, resp)=>{
     {if(err){
       console.log(err)
     }
     else{
       res.json({"ok":true})
     }
   })
  .then(function(result){
    res.json(result.rows[0])
  })
})
router.post('/user/settings', function(req, res, next){
  pool.query('update settings daily=$1, weekly=$2, vendor=$3, articles=$4 where _email like $12 ',
   [req.body.daily, req.body.weekly, req.body.vendor, req.body.articles, req.body._email],
   (err, resp)=>{
     {if(err){
       console.log(err)
     }
     else{
       res.json({"ok":true})
     }
   })
  .then(function(result){
    res.json(result.rows[0])
  })
})






module.exports = router;
