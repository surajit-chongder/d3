var loadTable = function(data){
	var trs = d3.select(".container").selectAll("tr").data(data);

	trs.enter().append("tr")
		.text(function(n){ return n })
		.style("background-color","orange");
}

var bindDataToChildPositionAndAppendTd = function(childPosition,data){
	var tds = d3.select(".container > tr:nth-child("+ childPosition +")").selectAll("td").data(data);
	return tds.enter().append("td");
}

var visualizeNumbersAndHeader = function(data,index){
	var tds = bindDataToChildPositionAndAppendTd(index,data);

	tds.text(function(d){ return d })
		.style("font-size","25px")

}
var visualizeNumbers = function(data,index){
	var tds = bindDataToChildPositionAndAppendTd(index,data);

	tds.text(function(d){ return d })
}
var visualizeSquareOfNumbers = function(data,index){
	var tds = bindDataToChildPositionAndAppendTd(index,data);

	tds.text(function(d){ return d*d })
}
var visualizeLogOfNumbers = function(data,index){
	var tds = bindDataToChildPositionAndAppendTd(index,data);

	tds.text(function(d){ return Math.log(d) })
}
var visualizeRoundLogOfNumbers = function(data,index){
	var tds = bindDataToChildPositionAndAppendTd(index,data);

	tds.text(function(d){ return Math.round(Math.log(d)) })
}
var executeOperations = function(operations,numbers){
	operations.forEach(function(operation,index){
		operation.method(numbers,++index);
	});
}

var load = function(){
	var numbers = [1,2,3,4,5,6,7,8,9,10];
	var headers = ["Title","n","n square","log(n)","log(n) rounded"];
	var operations = [{header:"Title",method:visualizeNumbersAndHeader},{header:"n",method:visualizeNumbers},
					{header:"n square",method:visualizeSquareOfNumbers},{header:"log(n)",method:visualizeLogOfNumbers},
					{header:"log(n) rounded",method:visualizeRoundLogOfNumbers}];

	loadTable(headers);
	executeOperations(operations,numbers);
	
} 

window.onload = load;