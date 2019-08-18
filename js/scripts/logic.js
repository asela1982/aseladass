
////////////////////
// d3 forcelayout///
///////////////////

function forcelayout() {
	//Width and height
	var w = 750;
	var h = 500;

	//Original data
	var dataset = {
		nodes: [
			{ name: "Adam" },
			{ name: "Bob" },
			{ name: "Carrie" },
			{ name: "Donovan" },
			{ name: "Edward" },
			{ name: "Felicity" },
			{ name: "George" },
			{ name: "Hannah" },
			{ name: "Iris" },
			{ name: "Jerry" }
		],
		edges: [
			{ source: 0, target: 1 },
			{ source: 0, target: 2 },
			{ source: 0, target: 3 },
			{ source: 0, target: 4 },
			{ source: 1, target: 5 },
			{ source: 2, target: 5 },
			{ source: 2, target: 5 },
			{ source: 3, target: 4 },
			{ source: 5, target: 8 },
			{ source: 5, target: 9 },
			{ source: 6, target: 7 },
			{ source: 7, target: 8 },
			{ source: 8, target: 9 }
		]
	};

	//Initialize a simple force layout, using the nodes and edges in dataset
	var force = d3.forceSimulation(dataset.nodes)
		.force("charge", d3.forceManyBody())
		.force("link", d3.forceLink(dataset.edges))
		.force("center", d3.forceCenter().x(w / 2).y(h / 2));

	var colors = d3.scaleOrdinal(d3.schemeCategory10);

	//Create SVG element
	var svg = d3.select("#forceLayout")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//Create edges as lines
	var edges = svg.selectAll("line")
		.data(dataset.edges)
		.enter()
		.append("line")
		.style("stroke", "#ccc")
		.style("stroke-width", 1);

	//Create nodes as circles
	var nodes = svg.selectAll("circle")
		.data(dataset.nodes)
		.enter()
		.append("circle")
		.attr("r", 10)
		.style("fill", function (d, i) {
			return colors(i);
		})
		.call(d3.drag()  //Define what to do on drag events
			.on("start", dragStarted)
			.on("drag", dragging)
			.on("end", dragEnded));

	//Add a simple tooltip
	nodes.append("title")
		.text(function (d) {
			return d.name;
		});

	//Every time the simulation "ticks", this will be called
	force.on("tick", function () {

		edges.attr("x1", function (d) { return d.source.x; })
			.attr("y1", function (d) { return d.source.y; })
			.attr("x2", function (d) { return d.target.x; })
			.attr("y2", function (d) { return d.target.y; });

		nodes.attr("cx", function (d) { return d.x; })
			.attr("cy", function (d) { return d.y; });

	});

	//Define drag event functions
	function dragStarted(d) {
		if (!d3.event.active) force.alphaTarget(0.3).restart();
		d.fx = d.x;
		d.fy = d.y;
	}

	function dragging(d) {
		d.fx = d3.event.x;
		d.fy = d3.event.y;
	}

	function dragEnded(d) {
		if (!d3.event.active) force.alphaTarget(0);
		d.fx = null;
		d.fy = null;
	}
};

////////////////////
// d3 circles   ///
///////////////////

function d3circles() {

	//Width and height
	var w = 800;
	var h = 500;
	var padding = 40;

	//Dynamic, random dataset
	var dataset = [];					//Initialize empty array
	var numDataPoints = 200;			//Number of dummy data points to create
	var xRange = 1000;					//Max range of new x values
	var yRange = 1000;					//Max range of new y values
	for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
		var newNumber1 = Math.floor(Math.random() * xRange);	//New random integer
		var newNumber2 = Math.floor(Math.random() * yRange);	//New random integer
		dataset.push([newNumber1, newNumber2]);					//Add new number to array
	}

	//Create scale functions
	var xScale = d3.scaleLinear()
		.domain([0, 1000])
		.range([padding, w - padding / 2]);

	var yScale = d3.scaleLinear()
		.domain([0, 1000])
		.range([h - padding, padding / 2]);

	//Define X axis
	var xAxis = d3.axisBottom()
		.scale(xScale)
		.ticks(5);

	//Define Y axis
	var yAxis = d3.axisLeft()
		.scale(yScale)
		.ticks(5);

	//Create SVG element
	var svg = d3.select("#circles")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//Create circles
	var allCircles = svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("cx", function (d) {
			return xScale(d[0]);
		})
		.attr("cy", function (d) {
			return yScale(d[1]);
		})
		.attr("r", 2.5)
		.attr("fill", "black");

	//Create X axis
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(0," + (h - padding) + ")")
		.call(xAxis);

	//Create Y axis
	svg.append("g")
		.attr("class", "axis")
		.attr("transform", "translate(" + padding + ",0)")
		.call(yAxis);

	//On button click, execute a function for each circle in the allCircles selection
	d3.selectAll("input")
		.on("click", function () {
			allCircles.each(freakOut);  //Hold on to your hats!
		});

	//Define the freakOut function
	var freakOut = function (d, i) {

		//Since this function will be called by 'each()',
		//it will be aware of each element on which it operates.
		//The 'this' context will be updated, and d and i will
		//be populated with the associated values.

		var colors = d3.schemeCategory20;
		var colorIndex = Math.round(Math.random() * 20);

		d3.select(this)
			.transition()
			.delay(i * 25)
			.duration(2000)
			.ease(d3.easeElasticOut)
			.attr("fill", colors[colorIndex])
			.attr("r", 25);

	};

};


//////////////
// Stacked////
//////////////

function stacked() {

	var n = 4, // The number of series.
		m = 58; // The number of values per series.

	// The xz array has m elements, representing the x-values shared by all series.
	// The yz array has n elements, representing the y-values of each of the n series.
	// Each yz[i] is an array of m non-negative numbers representing a y-value for xz[i].
	// The y01z array has the same structure as yz, but with stacked [y₀, y₁] instead of y.
	var xz = d3.range(m),
		yz = d3.range(n).map(function () { return bumps(m); }),
		y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz)),
		yMax = d3.max(yz, function (y) { return d3.max(y); }),
		y1Max = d3.max(y01z, function (y) { return d3.max(y, function (d) { return d[1]; }); });

	var svg = d3.select("#mysvg"),
		margin = { top: 40, right: 20, bottom: 20, left: 10 },
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom,
		g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var x = d3.scaleBand()
		.domain(xz)
		.rangeRound([0, width])
		.padding(0.08);

	var y = d3.scaleLinear()
		.domain([0, y1Max])
		.range([height, 0]);

	var color = d3.scaleOrdinal()
		.domain(d3.range(n))
		.range(d3.schemeCategory20c);

	var series = g.selectAll(".series")
		.data(y01z)
		.enter().append("g")
		.attr("fill", function (d, i) { return color(i); });

	var rect = series.selectAll("rect")
		.data(function (d) { return d; })
		.enter().append("rect")
		.attr("x", function (d, i) { return x(i); })
		.attr("y", height)
		.attr("width", x.bandwidth())
		.attr("height", 0);

	rect.transition()
		.delay(function (d, i) { return i * 10; })
		.attr("y", function (d) { return y(d[1]); })
		.attr("height", function (d) { return y(d[0]) - y(d[1]); });

	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x)
			.tickSize(0)
			.tickPadding(6));

	d3.selectAll("input")
		.on("change", changed);

	var timeout = d3.timeout(function () {
		d3.select("input[value=\"grouped\"]")
			.property("checked", true)
			.dispatch("change");
	}, 2000);

	function changed() {
		timeout.stop();
		if (this.value === "grouped") transitionGrouped();
		else transitionStacked();
	}

	function transitionGrouped() {
		y.domain([0, yMax]);

		rect.transition()
			.duration(500)
			.delay(function (d, i) { return i * 10; })
			.attr("x", function (d, i) { return x(i) + x.bandwidth() / n * this.parentNode.__data__.key; })
			.attr("width", x.bandwidth() / n)
			.transition()
			.attr("y", function (d) { return y(d[1] - d[0]); })
			.attr("height", function (d) { return y(0) - y(d[1] - d[0]); });
	}

	function transitionStacked() {
		y.domain([0, y1Max]);

		rect.transition()
			.duration(500)
			.delay(function (d, i) { return i * 10; })
			.attr("y", function (d) { return y(d[1]); })
			.attr("height", function (d) { return y(d[0]) - y(d[1]); })
			.transition()
			.attr("x", function (d, i) { return x(i); })
			.attr("width", x.bandwidth());
	}



// Returns an array of m psuedorandom, smoothly-varying non-negative numbers.
// Inspired by Lee Byron’s test data generator.
// http://leebyron.com/streamgraph/
function bumps(m) {
	var values = [], i, j, w, x, y, z;

	// Initialize with uniform random values in [0.1, 0.2).
	for (i = 0; i < m; ++i) {
		values[i] = 0.1 + 0.1 * Math.random();
	}

	// Add five random bumps.
	for (j = 0; j < 5; ++j) {
		x = 1 / (0.1 + Math.random());
		y = 2 * Math.random() - 0.5;
		z = 10 / (0.1 + Math.random());
		for (i = 0; i < m; i++) {
			w = (i / m - y) * z;
			values[i] += x * Math.exp(-w * w);
		}
	}

	// Ensure all values are positive.
	for (i = 0; i < m; ++i) {
		values[i] = Math.max(0, values[i]);
	}

	return values;
}

};


function init() {
	d3circles()
	forcelayout()
	stacked()
}

init();