var width = "110%",
    height = "110%";

var i = 0;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("position", "absolute")
    .attr("z-index", "1")
    .attr("transform", "translate(0,-490)")
    .attr("overflow", "hidden")

svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("overflow", "hidden")
    .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

function particle() {
  var m = d3.mouse(this);

  svg.insert("circle", "rect")
      .attr("cx", m[0])
      .attr("cy", m[1])
      .attr("r", 5) // 1e-6
      .style("stroke", d3.hsl(48, 1, .51))
      .style("stroke-opacity", 1)
    .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr("r", 50)
      .style("stroke-opacity", 1e-6)
    	.style("stroke-width", 1)
      .remove();

  d3.event.preventDefault();
}
var Email = require("./models/models").Email
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
$('#email-list').on('submit', function () {

  var newem=$("input").val();
  var tosave = new Email({
    email: newem
  });
  tosave.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send(newem+" saved");
    }
  });
  return false;
});
