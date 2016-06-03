var margin = {top: 20, right: 20, bottom: 30, left: 80};
    var width = 880 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    
    data = {{data_import | safe}};
    
    
    var svg = d3.select("body")
    .append("svg")
    .style("position", "relative")
    .style("max-width", "960px")
    .attr("width", (width + 50) + "px")
    .attr("height", (height + 50) + "px")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var xVals = function(d){return d.PROP_FRONT;};
  var yVals = function(d){return d.PROP_DEPTH;};
  
  var xScale = d3.scale.linear().range([0, width]);
  var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
  var xMap = function(d) { return xScale(xVals(d));};
      
  var yScale = d3.scale.linear().range([height, 0]);
  var yAxis = d3.svg.axis().scale(yScale).orient("left");
  var yMap = function(d) { return yScale(yVals(d));};
  xScale.domain([d3.min(data, xVals)-1, d3.max(data, xVals)+1]);
  yScale.domain([d3.min(data, yVals)-1, d3.max(data, yVals)+1]);

  
  var cValue = function(d) { return d.AGENCY;};
  var color = d3.scale.category20(); 
  
  
  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width - 80)
      .attr("y", -15)
      .style("text-anchor", "end")
      .text("PROP_FRONT");

  // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 0)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .text("PROP_DEPTH");

  //NEW: TOOLTIP. 
  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("background-color", "white");
 
  svg.selectAll(".dot")
     .data(data)
     .enter().append("circle")
     .attr("class", "dot")
     .attr("r", 3.5)
     .attr("cx", xMap)
     .attr("cy", yMap)
     .style("fill", function(d) { return color(cValue(d));}) //D3 does the magic! 
     .on("mouseover", function(d) { //much like jquery, an event listener
         tooltip.transition()
                .duration(200)
                .style("opacity", .9);
         tooltip.html("Agency is " + d['AGENCY'])
               .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
    
  var legend = svg.selectAll(".legend")
      .data(color.domain()) //stores the color <-> label mappings
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 60)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 70)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})