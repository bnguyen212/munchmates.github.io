var express = require('express');
var router = express.Router();
var crypto =require('crypto');
var pg =require ('pg');

var pool = new pg.Pool({
  host: process.env.DBHOST,
  port: 5432,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
  ssl: true,
});

function hashPassword(password){
  var hash= crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex')
}

module.exports = function(passport) {

  router.post("/register", function(req, res){
    pool.query(
     'select * from users where email = $1',
     [req.body.email]
    )
    .then((i) => {
      if (i.rows.length === 0) {
        pool.query(
          'insert into users(email, password, weekly, daily, vendor, articles) values($1, $2, true, true, true, true)',
          [req.body.email, hashPassword(req.body.password)],
          (err, resp) => {
            if (err) {
            res.json({success: false, "err":err})
            } else {
             res.json({"success": true})
            }
        })
      } else {
        res.json({success: false, "err": "user already exists"})
     }
   })
  })

  router.post("/login", passport.authenticate('local'), function(req, res){
    res.json({"authenticated": true})
  })

  return router;
}
