var express = require('express');
var router = express.Router();
var Email = require('../models/models').Email;

//landing page
router.post('/signup', function(req, res) {
  var newem = new Email({
    email:req.body.email
  });
  newem.save(function(err) {

    if (err) {
      res.status(500).json(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
