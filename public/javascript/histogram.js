const WIDTH = 1280;
const HEIGHT = 800;
const MARGIN = 30;
const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var generateRandomData = function (min, max, count) {
    return d3.range(count).map(function () {
        return getRandomInt(min, max);
    });
};


var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

var translate = function (x, y) {
    return "translate(" + x + "," + y + ")";
};


var _xScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, WIDTH - (2 * MARGIN)]);

var _yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([HEIGHT - (2 * MARGIN), 0]);


var _xAxis = d3.axisBottom(_xScale).ticks(20);
var _yAxis = d3.axisLeft(_yScale);

var data = generateRandomData(0,100,1000);

var bins = d3.histogram()
    .domain(_xScale.domain())
    .thresholds(_xScale.ticks(20))
    (data);

function scalingValue(binsX,paddingX,binsY,paddingY) {
    return _xScale(binsX-paddingX) - _xScale(binsY) - paddingY;
}

function appendText(bar) {
    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 10)
        .attr("x", scalingValue(bins[0].x1, .5, bins[0].x0, 0))
        .attr("text-align", "center")
        .text(function (d) {
            return d.length;
        });
}

function createBar(bar) {
    bar.append("rect")
        .attr("x", MARGIN + 1)
        .attr("width", scalingValue(bins[0].x1, 0, bins[0].x0, 1))
        .attr("height", function (d) {
            return HEIGHT - _yScale(d.length - 4);
        });
}

var loadHistogram = function () {
    var svg = d3.select('.container').append('svg')
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(_xAxis);

    var g = svg.append('g');

    var bar = g.selectAll(".bar")
        .data(bins)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function (d) {
            return translate(_xScale(d.x0), _yScale(d.length));
        });

    createBar(bar);
    appendText(bar);
};

window.onload = loadHistogram;

