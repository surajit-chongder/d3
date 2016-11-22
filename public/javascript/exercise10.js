var pointValues = new Array (10);
const HEIGHT = 800;
const WIDTH = 800;
const MARGIN = 50;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var createPointCircle = function(lineData){
  var circles = d3.select('svg').append('g')
    .attr('transform', translate(MARGIN, MARGIN))
    .selectAll("dot");

    circles.data(lineData).enter().append("circle")
        .attr("cx", function(d,i) {return _xScale(i)})
        .attr("cy", function(d,i) {return _yScale( (Math.sin(3*i)+1)/2 )});
}



var translate = function (x, y) {
 return "translate(" + x + "," + y + ")";
};

var _xScale = d3.scaleLinear()
   .domain([0, 10])
   .range([0, INNER_WIDTH]);

var _yScale = d3.scaleLinear()
   .domain([0, 1])
   .range([INNER_HEIGHT, 0]);

var loadAxis = function(svg){
    var xAxis = d3.axisBottom(_xScale);
    var yAxis = d3.axisLeft(_yScale);
    
    svg.append('g')
      .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
      .call(xAxis);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .call(yAxis);
}

var valueOfY = function(x){
  return (Math.sin(3*x)+1)/2;
}

var line = d3.line()
                .x(function (d,i) {return _xScale(i)})
                .y(function (d,i) {return _yScale(valueOfY(i))})

var createLine = function(tensionValue){
  var g = d3.select("svg").append('g')
             .attr('transform', translate(MARGIN,MARGIN))
             .attr('class', 'lineChart');

  g.append('path')
     .attr('d', line(pointValues))

  line.curve(d3.curveCardinal.tension(tensionValue));
}

var loadDefault = function () {
  var svg = d3.select('.svg_container').append('svg')
              .attr('width', WIDTH)
              .attr('height', HEIGHT);

  loadAxis(svg);
  tensionController();
  createLineAndCircle(1,pointValues);

};

var createLineAndCircle = function(tensionLevel,values){
  createLine(tensionLevel);
  createPointCircle(values);
}

var tensionController = function(){
  var tensionLevel = {'level 1': -1.5,'level 2': -1,'level 3': -.5,'level 4': 0,'level 5': 1}

  d3.select(".container").selectAll('button')
    .data(Object.keys(tensionLevel))
    .enter().append('button')
    .text(function(d){return d})
    .on("click",function(d) {
      createLine(tensionLevel[d]);
      createPointCircle(pointValues);
      d3.select("svg").select(".lineChart").remove();
    });   
}

window.onload = loadDefault;



