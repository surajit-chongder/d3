var records = [
	{name:'ramesh',subject:'maths',score:87},
	{name:'suresh',subject:'maths',score:45},
	{name:'pokemon',subject:'english',score:65},
	{name:'mary',subject:'kannada',score:44},
	{name:'riya',subject:'science',score:72},
	{name:'katie',subject:'social studies',score:82},
	{name:'katie',subject:'maths',score:98},
	{name:'ramesh',subject:'bengali',score:25},
	{name:'suresh',subject:'science',score:55},
	{name:'riya',subject:'tamil',score:75},
	{name:'pokemon',subject:'sports',score:95},
	{name:'pokemon',subject:'social studies',score:32}
]

var uniqueSubject = function(){
	return _.uniq(_.map(records, 'subject'));
}

var generateColor = function(subject){
	return	d3.schemeCategory10[uniqueSubject().indexOf(subject)];
}

var loadStudentChart = function(data,key){
	var divs = d3.select(".container").selectAll("div").data(data);

    divs.enter().append("div")
    	.attr("class","bar")
    	.style("width",function(d){return d.score*5 + "px"})
		.text(function(d){ return d.name+" "+d.score })
		.style("background-color",function(d) {return generateColor(d.subject)});
}

var updateStudentChart = function(sortBy){
	d3.selectAll("div.bar")
		.sort(function (a,b) {
			return d3.ascending(a[sortBy], b[sortBy])
		})
}

var loadSubject = function(data){
	var tds = d3.select(".color_container").selectAll("td")
		.data(data)
		.enter().append("td")
		.style("width",function(d){return 100 + "px"})
		.text(function(d){ return d })
		.style("background-color",function(d) {return generateColor(d)});

	tds.exit().remove();
}

var loadDefault = function(){
	loadStudentChart(records);
	loadSubject(uniqueSubject());
}

var sortStudent = function (sortBy) {
    updateStudentChart(sortBy);
}

window.onload = loadDefault;