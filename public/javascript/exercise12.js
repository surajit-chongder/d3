var curves = {
    "curveLinear": d3.curveLinear,
    "curveStep": d3.curveStep,
    "curveStepBefore": d3.curveStepBefore,
    "curveStepAfter": d3.curveStepAfter,
    "curveBasis": d3.curveBasis,
    "curveBasisClosed": d3.curveBasisClosed,
    "curveBasisOpen": d3.curveBasisOpen,
    "curveCardinal": d3.curveCardinal,
    "curveCardinalClosed": d3.curveCardinalClosed,
    "curveCardinalOpen": d3.curveCardinalOpen,
    "curveBundle": d3.curveBundle,
    "curveMonotoneX": d3.curveMonotoneX,
    "curveMonotoneY": d3.curveMonotoneY,
    "curveCatmullRom": d3.curveCatmullRom,
    "curveCatmullRomClosed": d3.curveCatmullRomClosed,
    "curveCatmullRomOpen": d3.curveCatmullRomOpen,
};

var pointData = d3.range(11).map(function (i) { // <-B
    return {x: i, y: Math.sin(i) * 3 + 5};
});

const HEIGHT = 800;
const WIDTH = 800;
const MARGIN = 50;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};

var _xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([0, INNER_WIDTH]);

var _yScale = d3.scaleLinear()
    .domain([0, 1])
    .range([INNER_HEIGHT, 0]);

var loadAxis = function (svg) {
    var xAxis = d3.axisBottom(_xScale);
    var yAxis = d3.axisLeft(_yScale);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .call(yAxis);
};

var line = d3.line()
    .x(function (d) {
        return _xScale(d.x / 10) + 1;
    })
    .y(function (d) {
        return _yScale(d.y / 10)
    });

var area = d3.area()
    .x(function (d) {
        return _xScale(d.x / 10) + 1;
    })
    .y0(INNER_HEIGHT)
    .y1(function (d) {
        return _yScale(d.y / 10)
    });

var createPointCircle = function (lineData) {
    var circles = d3.select('svg').append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .selectAll("dot");

    circles.data(lineData).enter().append("circle")
        .attr("cx", function (d, i) {
            return _xScale(d.x / 10)
        })
        .attr("cy", function (d, i) {
            return _yScale(d.y / 10)
        });
};

var createArea = function (data) {

    var g = d3.select("svg").append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .attr('class', 'area');

    g.append('path')
        .attr('d', area(data));

};

var createLine = function (data) {
    var g = d3.select("svg").append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .attr('class', 'lineChart');

    g.append('path')
        .attr('d', line(data));

};

var loadDefault = function () {
    var svg = d3.select('.svg_container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);
    loadAxis(svg);
    createLine(pointData);
    createArea(pointData);
    createPointCircle(pointData);
    createButtons();
};

var createLineCircleAndArea = function () {
    d3.select("svg").select(".lineChart").remove();
    d3.select("svg").select(".area").remove();

    createLine(pointData);
    createArea(pointData);
    createPointCircle(pointData);
};

var updateShape = function (curveType) {
    line.curve(curves[curveType]);
    area.curve(curves[curveType]);
};

var createButtons = function () {
    var data = Object.keys(curves);
    d3.select('body').append("div")
        .attr('class', 'button')
        .selectAll('button').data(data)
        .enter().append("button")
        .on("click", function (d) {
            updateShape(d);
            createLineCircleAndArea();
        })
        .text(function (d) {
            return d
        });
};

window.onload = loadDefault;