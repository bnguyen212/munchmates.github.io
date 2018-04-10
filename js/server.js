var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser= require('body-parser')
var path= require("path")
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connect(process.env.MONGODB_URI);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
var routes = require('./routes');
app.use('/', routes);

app.use(express.static(path.resolve(__dirname, "../static")))


console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
