var generateArrayOfRandomNumber = function(){
  var numbers = [];
  for (var start = 0, end = 10; start < end; start++){
    numbers.push(_.random(30,70))
  }
  return numbers;
}

const WIDTH = 1280;
const HEIGHT = 800;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var translate = function(x, y){
	return "translate("+ x +","+ y +")";
};

var _xScale = d3.scaleLinear()
	    .domain([0,9])
	    .range([0, WIDTH - (2 * MARGIN)]);

var _yScale = d3.scaleLinear()
    .domain([0,100])
    .range([HEIGHT - (2 * MARGIN), 0]);

var _xAxis = d3.axisBottom(_xScale).ticks(10);
var _yAxis = d3.axisLeft(_yScale).ticks(10);

var line = d3.line()
		.x(function(d,i){return _xScale(i)})
		.y(function(d){return _yScale(d)});

var createChartAndSetInterval = function(){
	var data = generateArrayOfRandomNumber();
	setInterval(function () {
        data.push(_.random(1,100));
        createLineChart(data);
       	data.shift();
    }, 430);
}

var loadChart = function(){
	var svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

	svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(_xAxis)

	svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.call(_yAxis);

	svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.attr('class', "lineChart")
		.append('path')
	
	createChartAndSetInterval();
	
};

var createLineChart = function(data){
	// console.log(data);
	var path = d3.select(".lineChart").selectAll('path').datum(data);

	path.attr("d",line)
		.attr("transform",null)
		.transition()
		.duration(400)
		.ease(d3.easeLinear)
		.attr('transition',translate(_xScale(-1),0));
}

var createBarChart = function(data){
	var g = d3.select("svg");

	var rects = g.selectAll("rect").data(data);

	  rects.enter().append("rect");
	  rects.attr("x", function(d,i) { return _xScale(i) + MARGIN; })
	    .attr("y", function(d) { return _yScale(d) + MARGIN; })
	    .attr("width","6px")
	    .attr("height", function(d) { return INNER_HEIGHT - _yScale(d); })

	  //remove
	  rects.exit().remove();
};

window.onload = loadChart;