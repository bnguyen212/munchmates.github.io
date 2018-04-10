var i = 0;

var svg = d3.select("body").append("svg")

svg.append("rect")
    .on("mousemove", particle);

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
