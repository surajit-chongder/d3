var createNumberDivs = function(numbers){
	var divs = d3.select(".container").selectAll("div").data(numbers);

    divs.enter().append("div")
    	.attr("class","number")
    	// .style("font-size",function(d){return (d === 0) ? "12px/30px":(d*10)+"px"+"/"+(d*18)+"px"})
    	.style("font-size",function(d){return (d === 0) ? 12+"px":(12*d)+"px"})
    	// .style("height","50px")
		.text(function(d){ return d })
		.style("float","left")
}

var showNumbers = function () {
	var numbers = [0,1,2,3,4,5,6,7,8,9,10];
	createNumberDivs(numbers);
}
window.onload = showNumbers;
