var counter = 0;
var score = 0;
var high = 0;
// start slingin' some d3 here.
var svg = d3.select("body")
            .append("svg")
            .attr("width", 500)
            .attr("height", 500)
            .style({"background-color": "black"});

var drag = d3.behavior.drag().on('drag', function() {
  player.attr('cx', d3.event.x).attr('cy', d3.event.y);
});

var createEnemy = function(){
  var enemies = new Array(15);
  d3.select('svg')
    .selectAll('enemy')
    .data(enemies)
    .enter()
    .append('svg:circle')
    .attr('class', 'enemy')
    .attr("cx", function() { return Math.floor(Math.random() * 500); })
    .attr("cy", function() { return Math.floor(Math.random() * 500); })
    .attr({
      'r': 15,
      'fill': 'white'
    });
}

createEnemy();

var enemyMove = function() {
  d3.select('svg')
    .selectAll('.enemy')
    .transition()
    .duration(1500)
    .attr("cx", function() { return Math.floor(Math.random() * 500); })
    .attr("cy", function() { return Math.floor(Math.random() * 500); });
};

var player = d3.select('svg')
               .append('svg:circle')
               .attr('class', 'player')
               .attr({
                 'cx': 250,
                 'cy': 250,
                 'r': 10,
                 'fill': 'red'
               }).call(drag);


var detectCollision = function() {
  score++;
  d3.select(".high span").text(high);
  d3.select(".current span").text(score);
  var enemies = d3.selectAll('.enemy')[0];
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var playa = d3.select('.player')[0][0];
    var x = playa.cx.baseVal.value - enemy.cx.baseVal.value;
    var y = playa.cy.baseVal.value - enemy.cy.baseVal.value;
    var distance = Math.sqrt(x*x + y*y);
    if (distance < 25) {
      if (score > high) high = score;
      score = 0;
      counter++;
      d3.select(".collisions span").text(counter);
    }
  }
};

setInterval(detectCollision, 30);
setInterval(enemyMove, 2000);
