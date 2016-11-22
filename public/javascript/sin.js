var lineData = [{ x: 0, y: 5},  { x: 1, y: 9},{ x: 2, y: 7},
	            { x: 3, y: 5}, { x: 4, y: 3},{ x: 6, y: 4},
	            { x: 7, y: 2},  { x: 8, y: 3},{ x: 9, y: 2}];

const HEIGHT = 800;
const WIDTH = 800;
const MARGIN = 50;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var curves = {
    "curveLinear" : d3.curveLinear,
    "curveStep" : d3.curveStep,
    "curveStepBefore" : d3.curveStepBefore,
    "curveStepAfter" : d3.curveStepAfter,
    "curveBasis" : d3.curveBasis,
    "curveBasisClosed" : d3.curveBasisClosed,
    "curveBasisOpen" : d3.curveBasisOpen,
    "curveCardinal" : d3.curveCardinal,
    "curveCardinalClosed" : d3.curveCardinalClosed,
    "curveCardinalOpen" : d3.curveCardinalOpen,
    "curveBundle" : d3.curveBundle,
    "curveMonotoneX" : d3.curveMonotoneX,
    "curveMonotoneY" : d3.curveMonotoneY,
    "curveCatmullRom" : d3.curveCatmullRom,
    "curveCatmullRomClosed" : d3.curveCatmullRomClosed,
    "curveCatmullRomOpen" : d3.curveCatmullRomOpen,
};

var translate = function (x, y) {
 return "translate(" + x + "," + y + ")";
};

var _xScale = d3.scaleLinear()
   .domain([0, 1])
   .range([0, INNER_WIDTH]);

var _yScale = d3.scaleLinear()
   .domain([0, 1])
   .range([INNER_HEIGHT, 0]);

var line = d3.line()
	    	 .x(function (d) {return _xScale(d.x/10)})
	    	 .y(function (d) {return _yScale(d.y/10)});

var sinValue  = new Array(10);

var sinLine = d3.line()
   .x(function(d,i){return _xScale(i/10); })
   .y(function(d,i){return _yScale((Math.sin(i)/10)+0.5) });

var xAxis = d3.axisBottom(_xScale);

var yAxis = d3.axisLeft(_yScale);

var loadChart = function () {
	createAxis();
	createLineAndCircle();
	createButtons();
};

var createAxis = function(){
	var svg = d3.select('body').append('svg')
	  .attr('width', WIDTH)
	  .attr('height', HEIGHT);

	svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(xAxis);

	svg.append('g')
	.attr('transform', translate(MARGIN, MARGIN))
	.call(yAxis);
}

var crateLine = function(data,method,lineClass,curveType){
	var g = d3.select('svg').append('g')
	    .attr('transform', translate(MARGIN,MARGIN))
	    .attr('class', lineClass)
	    .append('path');

	g.attr('d', method(data));

}

var createPointCircle = function(lineData,sinData){
	var circles = d3.select('svg').append('g').attr('transform', translate(MARGIN, MARGIN))
		.selectAll("dot");

    circles.data(lineData).enter().append("circle")
        .attr("cx", function(d) { return _xScale(d.x/10); })
        .attr("cy", function(d) { return _yScale(d.y/10); });

    circles.data(sinData).enter().append("circle")
        .attr("cx", function(d,i){return _xScale(i/10); })
        .attr("cy", function(d,i){return _yScale((Math.sin(i)/10)+0.5) });
}


var createLineAndCircle = function(){
	d3.select("svg").select(".lineChart").remove();
	d3.select("svg").select(".sinChart").remove();

	crateLine(lineData,line,'lineChart');
	crateLine(sinValue,sinLine,'sinChart');
	createPointCircle(lineData,sinValue);
}

var updateCurve = function(curveType){
	line.curve(curves[curveType]);
	sinLine.curve(curves[curveType]);
}

var createButtons = function(){
var data = Object.keys(curves);
	d3.select(".container").selectAll('button').data(data)
		.enter().append("button")
		.on("click",function(d){ 	
			updateCurve(d);
			createLineAndCircle();
		})
		.text(function(d){return d});
}

window.onload = loadChart;