var WIDTH = 1000,
    HEIGHT = 500,
    RADIUS = Math.min(WIDTH, HEIGHT) / 2;

var data = [1, 1, 2, 2, 1, 2, 1];
var color = d3.schemeCategory20;

var degree = Math.PI / 180;

var halfPie = d3.pie().sort(null).startAngle(0).endAngle(180 * degree)(data);
var pie = d3.pie().sort(null)(data);

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};

var arc = d3.arc()
    .outerRadius(RADIUS - 10)
    .innerRadius(0);

function createPieChart(svg, pie) {
    var g = svg.selectAll("g")
        .data(pie)
        .enter();

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d, i) {
            return color[i];
        });
}

function createPieSvg(container) {
    return d3.select("." + container).append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .append("g")
        .attr("transform", translate(WIDTH / 2, HEIGHT / 2));
}

var loadPie = function () {
    var pieSvg = createPieSvg("container");
    createPieChart(pieSvg, pie);
    var halfPieSvg = createPieSvg("half_pie_container");
    createPieChart(halfPieSvg, halfPie);
};
window.onload = loadPie;