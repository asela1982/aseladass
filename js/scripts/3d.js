
    var data = null;
    var graph = null;


    function onclick(point){
        console.log(point)
    }

    // Called when the Visualization API is loaded.
    function drawVisualization() {
      // create the data table.
      data = new vis.DataSet();

      // create the animation data
      var imax = 100;
      for (var i = 0; i < imax; i++) {
        var x = Math.random();
        var y = Math.random();
        var z = Math.random();

        // data.add({x:x,y:y,z:z,style:style});
        data.add({x:x,y:y,z:z});
      }

      // specify options
      var options = {
        width:  '400px',
        height: '400px',
        style: 'dot',
        tooltip: true,
        showPerspective: true,
        showGrid: true,
        keepAspectRatio: true,
        verticalRatio: 1.0,
        legendLabel: 'distance',
        onclick: onclick,
        cameraPosition: {
          horizontal: -0.35,
          vertical: 0.22,
          distance: 2
        }
      };

      // create our graph
      var container = document.getElementById('mygraph');
      graph = new vis.Graph3d(container, data, options);
    }
  

drawVisualization()

//On button click, execute the drawVisualization function
d3.selectAll("input")
    .on("click",drawVisualization);