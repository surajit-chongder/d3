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
    .outerRadius(RADIUS - 10);

function createPieChart(svg, pie, arcInnerRadius) {
    arc.innerRadius(arcInnerRadius);

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

var pieOperating = {donutInnerRadius: 140, pieInnerRadius: 0};

var operate = function (chart, svg) {
    switch (chart) {
        case "Pie Chart":
            createPieChart(svg, pie, pieOperating.pieInnerRadius);
            break;
        case "Donut Pie Chart":
            createPieChart(svg, pie, pieOperating.donutInnerRadius);
            break;
        case "Half Pie Chart":
            createPieChart(svg, halfPie, pieOperating.pieInnerRadius);
            break;
        case "Half Donut Pie Chart":
            createPieChart(svg, halfPie, pieOperating.donutInnerRadius);
            break;
    }
};

var createButtons = function () {
    var data = ["Pie Chart", "Donut Pie Chart", "Half Pie Chart", "Half Donut Pie Chart"];
    d3.select('body').append("div")
        .attr('class', 'button')
        .selectAll('button').data(data)
        .enter().append("button")
        .on("click", function (d) {
            d3.select(".container").select("svg").remove();
            var pieSvg = createPieSvg("container");
            operate(d, pieSvg);
        })
        .text(function (d) {
            return d
        });
};

var loadPie = function () {
    createButtons();
    var pieSvg = createPieSvg("container");
    createPieChart(pieSvg, pie, 0);
};

window.onload = loadPie;