var express = require('express');
var router = express.Router();

var User=require("../../models/models.js").User
var pg =require ('pg');
var pool = new pg.Pool({
  host: process.env.DBHOST,
  port: 5432,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  ssl: true,
});

if (!pool){
  console.log("Connection Error");
}

//const request = require('request');
 router.get('/hi', function(req, res, next){
   res.send("hi")
 })
router.get('/places', function(req, res, next) {
  pool.query('SELECT * FROM vendors where lat>$1-$2 and lat<$1+$2 and long>$3-$4 and long<$3+$4',
  [req.query._lat, req.query._latdel, req.query._long, req.query._longdel],
  (result)=>{
    //console.log(result.rows[0])
    res.json(result.rows)
  }
)})
router.get("/recommendations", function(req,res, next){
  var arr= req.query.arr.split(",")
  pool.query("select * from vendors where vendorname like $1 or vendor like $2 or vendor like $3 or vendor like $4 or vendor like $5 or vendor like $6 or vendor like $7 or vendor like $8 or vendor like $9 orvendor like $10",
  [arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9]], (result)=>{
    res.json(result.rows)
  })
})
router.get('/user', function(req, res, next){
  pool.query('select * from users where email like $1', [req.query.email])
  .then(function(result){
    res.json(result.rows[0])
  })
})
// router.get('/preferences', function(req, res, next){
//   pool.query('select * from emails where _email $1', [req.wuety.email],
//   (result)=>{
//     res.json(result.rows[0])
//   })
// })
// router.get('/settings', function(req, res, next){
//   pool.query('select * from settings where _email $1', [req.wuey.email],
//   (result)=>{
//     res.json(result.rows[0])
//   })
//})
router.post('/user/preference', function(req, res, next){
  pool.query('update users set budget=$1, diet=$2, cuisines=$3, allergies=$4, otherAllergy=$5, popularityRating=$6, ratingRating=$7, proximityRating=$8, menuRating=$9,  ambienceRating=$11, where email like $12 ',
   [req.body.budget, req.body.diet, req.body.cuisines, req.body.allergies, req.body.otherAllergy, req.body.popularityRating, req.body.ratingRating, req.body.proximityRating, req.body.menuRating, req.body.ambienceRating, req.body.email],
   (err, resp)=>{
     if(err){
       console.log(err)
     }
     else{
       res.json({"ok":true})
     }
   })
  // .then(function(result){
  //   res.json(result.rows[0])
  // })
})
router.post('/user/settings', function(req, res, next){
  pool.query('update users set daily=$1, weekly=$2, vendor=$3, articles=$4 where email like $5 ',
   [req.body.daily, req.body.weekly, req.body.vendor, req.body.articles, req.body.email],
   (err, resp)=>{
     if(err){
       console.log(err)
     }
     else{
       res.json({"ok":true})
     }
   })
})
router.post('/user/profile', function(req, res, next){
  pool.query('update users set fname=$1, lname=$2, gender=$3, expertise=$4, location=$5, agerange=$6 where email like $7 ',
   [req.body.fname, req.body.lname, req.body.gender, req.body.expertise, req.body.location, req.body.agerange, req.body.email],
   (err, resp)=>{
     if(err){
       console.log(err)
     }
     else{
       console.log("here", req.body)
       res.json({"ok":true})
     }
   })
  // .then(function(result){
  //   res.json(result.rows[0])
  // })
})






module.exports = router;
