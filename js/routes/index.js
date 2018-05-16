var express = require('express');
var router = express.Router();

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

// router.get('/vendors', function(req, res, next) {
//   pool.query('SELECT * FROM vendors',
//   (result) => {
//     res.json(result.rows)
//   }
// )})

// router.get("/recommendations", function(req,res, next){
//   var arr= req.query.arr.split(",")
//   pool.query("select * from vendors where vendorname like $1 or vendor like $2 or vendor like $3 or vendor like $4 or vendor like $5 or vendor like $6 or vendor like $7 or vendor like $8 or vendor like $9 orvendor like $10",
//   [arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9]], (result) => {
//     res.json(result.rows)
//   })
// })

router.get('/user', function(req, res, next){
  pool.query('select * from users where email like $1', [req.query.email])
  .then((result) => {
    res.json(result.rows[0])
  })
})

//update user preferences
// router.post('/user/preference', function(req, res, next){
//   pool.query('update users set budget=$1, diet=$2, cuisines=$3, allergies=$4, otherAllergy=$5, popularityRating=$6, ratingRating=$7, proximityRating=$8, menuRating=$9,  ambienceRating=$11, where email like $12 ',
//    [req.body.budget, req.body.diet, req.body.cuisines, req.body.allergies, req.body.otherAllergy, req.body.popularityRating, req.body.ratingRating, req.body.proximityRating, req.body.menuRating, req.body.ambienceRating, req.body.email],
//    (err, resp) => {
//      if(err){
//        console.log(err)
//      }
//      else{
//        res.json({"ok":true})
//      }
//    })
// })

//update user settings
router.post('/user/settings', function(req, res, next){
  pool.query('update users set daily=$1, weekly=$2, vendor=$3, articles=$4 where email like $5 ',
   [req.body.daily, req.body.weekly, req.body.vendor, req.body.articles, req.body.email],
   (err, resp) => {
     if(err){
       console.log(err)
     }
     else{
       res.json({"ok":true})
     }
   })
})

//update user profile
router.post('/user/profile', function(req, res, next){
  pool.query('update users set fname=$1, lname=$2, gender=$3, expertise=$4, location=$5, agerange=$6 where email like $7 ',
   [req.body.fname, req.body.lname, req.body.gender, req.body.expertise, req.body.location, req.body.agerange, req.body.email],
   (err, resp) => {
     if(err){
       console.log(err)
     }
     else{
       res.json({"ok":true})
     }
   })

})


module.exports = router;
