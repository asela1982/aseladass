
////////////////////
// d3 forcelayout///
///////////////////


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
						  .force("center", d3.forceCenter().x(w/2).y(h/2));

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
				.style("fill", function(d, i) {
					return colors(i);
				})
				.call(d3.drag()  //Define what to do on drag events
					.on("start", dragStarted)
					.on("drag", dragging)
					.on("end", dragEnded));

			//Add a simple tooltip
			nodes.append("title")
				 .text(function(d) {
					return d.name;
				 });
			
			//Every time the simulation "ticks", this will be called
			force.on("tick", function() {

				edges.attr("x1", function(d) { return d.source.x; })
					 .attr("y1", function(d) { return d.source.y; })
					 .attr("x2", function(d) { return d.target.x; })
					 .attr("y2", function(d) { return d.target.y; });
			
				nodes.attr("cx", function(d) { return d.x; })
					 .attr("cy", function(d) { return d.y; });
	
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

////////////////////
// d3 circles   ///
///////////////////

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
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
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
				.on("click", function() {
					allCircles.each(freakOut);  //Hold on to your hats!
				});

			//Define the freakOut function
			var freakOut = function(d, i) {

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