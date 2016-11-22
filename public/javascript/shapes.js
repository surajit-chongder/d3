var WIDTH = 100 , MARGIN = 50;

var translate = function(position){
	return "translate("+position+")";
}

var createContainer = function(){
	d3.select(".container").append("svg").append("g");
}

var line = function(position){
	var g = d3.select("g");
	g.append("line")
		.attr("x1", 0)
    	.attr("y1", WIDTH)
    	.attr("x2", WIDTH)
    	.attr("y2", 0)
    	.attr("transform", translate(position));
}

var circle = function(position){
	var g = d3.select("g");
	g.append("circle")
		.attr("cx", MARGIN)
	    .attr("cy", MARGIN)
        .attr("r", MARGIN)
        .attr("transform", translate(position));
}

var rectangle = function(position){
	var g = d3.select("g");
	g.append("rect")
		.attr("x", 0)
	    .attr("y", 0)
	    .attr("rx",10)
	    .attr("ry",10)
	    .attr("transform", translate(position));

}

var triangle = function(position){
	var g = d3.select("g");
	g.append("polygon")
		.attr("points", "0,100 50,0 100,100")
		.attr("transform", translate(position));
}

var createShapes = function(shapes){
	var position = 0;
	shapes.forEach(function(shape){
		shape.create(position);
		position += WIDTH+MARGIN;
	})
}

var loadShapes = function() {
	createContainer();
	var shapes = [{"create":line},{"create":circle},{"create":rectangle},{"create":triangle}];
	createShapes(shapes);
}

window.onload = loadShapes;