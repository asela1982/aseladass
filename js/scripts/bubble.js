// functions for toggling between data
function change(value) {
  if (value === 'vi') {
    var data = [
      ["Tableau", 8],["Power BI", 8],["D3.js", 3], ["Plotly.js", 6],
      ["Leaflet.js", 4],["Seaborn", 6],
      ["Matplotlib", 7],["Vis.js", 5]
    ];
    update(data)

  } if (value === 'ml') {
    var data = [
      ["Pandas", 7], ["Numpy", 3], 
      ["R", 3],["Sci-kit Learn",4]
    ];
    update(data)

  } if (value === 'da') {
    var data = [
      ["Tableau", 8], ["Power BI", 8], ["Pandas", 7], ["R", 3], ["Jupyter",9]
    ];
    update(data)

  } if (value === 'db') {
    var data = [
      ["MySql", 6], ["Postgres", 3], ["AQL", 2],
      ["SQLite", 4], ["MS Access", 8], ["SQLAlchemy",5]
      ,["MongoDB",4]
    ];
    update(data)

  } if (value === 'wa') {
    var data = [
      ["Flask", 7], ["Python", 4],["Heroku", 5],["API",5],
      ["HTML",4],["CSS",4],["Bootstrap",5],["JavaScript",3],
      ["SQLAlchemy",5],["Git",6]
    ];
    update(data)

  } if (value === 'bd') {
    var data = [
      ["BigQuery",5], ["PySpark",4]
    ];
    update(data)
  }
};


var width = 500;
var height = 375;

var viz = [
  ["Tableau", 8],["Power BI", 8],["D3.js", 3], ["Plotly.js", 6],
  ["Leaflet.js", 4],["Seaborn", 6],
  ["Matplotlib", 7],["Vis.js", 5]
];

var svg = d3.select('#chart')
  .append("svg")
  .attr("height", height)
  .attr("width", width)
  .append("g")
  .attr("transform", "translate(0,0)")

var radiusScale = d3.scaleSqrt().domain([0, 10]).range([10, 50])
var colorScale = d3.scaleLinear().domain([0, 10]).range([0, 255])

var simulation = d3.forceSimulation()
  .force("x", d3.forceX(width / 2).strength(0.030))
  .force("y", d3.forceY(height / 2).strength(0.030))
  .force("collide", d3.forceCollide(function (d) {
    return radiusScale(d[1]) + 1;
  }))

var circles = svg.selectAll("circle")
  .data(viz)
  .enter()
  .append("circle")
  .attr("class", "circle")
  .attr("r", function (d) {
    return radiusScale(d[1])
  })
  .attr("fill", `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`)


simulation.nodes(viz)
  .on('tick', ticked)

var text = svg.selectAll("text")
  .data(viz)
  .enter()
  .append("text")
  .attr("class", "text")
  .text(function (d) {
    return d[0];
  })
  .attr("text-anchor", "middle")
  .attr("fill", "white");


function ticked() {
  circles
    .attr("cx", function (d) {
      return d.x
    })
    .attr("cy", function (d) {
      return d.y
    })

  text
    .attr("x", function (d) {
      return d.x
    })
    .attr("y", function (d) {
      return d.y
    })
}


// function for updating the chart
function update(arrayNew) {

  svg.selectAll(".circle").remove()
  svg.selectAll(".text").remove()

  var radiusScale = d3.scaleSqrt().domain([0, 10]).range([10, 50])
  var colorScale = d3.scaleLinear().domain([0, 10]).range([0, 255])

  var simulation = d3.forceSimulation()
    .force("x", d3.forceX(width / 2).strength(0.030))
    .force("y", d3.forceY(height / 2).strength(0.030))
    .force("collide", d3.forceCollide(function (d) {
      return radiusScale(d[1]) + 1;
    }))

  var circles = svg.selectAll("circle")
    .data(arrayNew)
    .enter()
    .append("circle")
    .attr("class", "circle")
    .attr("r", function (d) {
      return radiusScale(d[1])
    })
    .attr("fill", `rgb(${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`)


  simulation.nodes(arrayNew)
    .on('tick', ticked)

  var text = svg.selectAll("text")
    .data(arrayNew)
    .enter()
    .append("text")
    .attr("class", "text")
    .text(function (d) {
      return d[0];
    })
    .attr("text-anchor", "middle")
    .attr("fill", "white");


  function ticked() {
    circles
      .attr("cx", function (d) {
        return d.x
      })
      .attr("cy", function (d) {
        return d.y
      })

    text
      .attr("x", function (d) {
        return d.x
      })
      .attr("y", function (d) {
        return d.y
      })
  }



}

