// start slingin' some d3 here.
var svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .style({"background-color": "black"});

var createEnemy = function(){
  var arr = [];
  for (var i = 0; i < 15; i ++){
    var x = Math.floor(Math.random()*500);
    var y = Math.floor(Math.random()*500);
    var temp = [x,y];
    arr.push(temp);
  }
  d3.select('svg')
    .selectAll('image')
    .data(arr)
    .enter()
    .append('svg:image')
    .attr("x", function(d){ return d[0]; })
    .attr("y", function(d){ return d[1]; })
    .attr({
      "height": 50,
      "width": 50,
      "xlink:href": "asteroid.png"
    });
}

createEnemy();

var enemyMove = function() {
  var arr = [];
  for (var i = 0; i < 15; i ++){
    var x = Math.floor(Math.random()*500);
    var y = Math.floor(Math.random()*500);
    var temp = [x,y];
    arr.push(temp);
  }

  d3.select('svg')
    .selectAll('svg image')
    .data(arr)
    .transition()
    .duration(800)
    .attr("x", function(d){ return d[0]; })
    .attr("y", function(d){ return d[1]; });
};

setInterval(enemyMove, 2000);
