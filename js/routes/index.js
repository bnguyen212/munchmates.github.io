var express = require('express');
var router = express.Router();
var User=require("../../models/models.js").User;
var place= //require something
const request = require('request');

router.get('/places', function(req, res, next) {
  // Your code here.
  console.log(req.user.username)
})

module.exports = router;
