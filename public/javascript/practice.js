var generateArrayOfRandomNumber = function(){
  var numbers = [];
  for (var start = 0, end = 9; start < end; start++){
    numbers.push(_.random(5,100))
  }
  return numbers;
}

var createChartAndSetInterval = function(){
	var data = generateArrayOfRandomNumber();
	setInterval(function () {
        data.push(_.random(5,100));
        createChart(data);
       	data.shift();
    }, 1000);
}

var createChart = function(data){
	var divs = d3.select("body").selectAll("div")
              .data(data,function(d,i){
                return i;
              });

  divs.enter().append("div");

  divs.style("width",function(d){ return d*7+"px" })
    .text(function(d){ return d })
    .style("background-color",function(d) {return "rgb(102, "+d+", " + (d * 3) + ")"})

	divs.exit().remove();
}

window.onload = createChartAndSetInterval();