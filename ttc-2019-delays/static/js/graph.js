// Define url
var url = "/delay";

// Print data
// d3.json(url).then(function(data){
// 	console.log(data);	
//     });

// Create function to calculate average
function average(arr){
    //Find the sum
    var sum = 0;
    for(var i in arr) {
        sum += arr[i];
    }
    //Get the length of the array
	var numbersCnt = arr.length;
	
    //Return the average / mean
	if (numbersCnt != 0) {
		return (sum / numbersCnt);
	}
	else {
		return 0;
	}
};

// Save dropdown menu text in variable
var subway_lines = ['All','Yonge University Spadina','Bloor Danforth','Scarborough Rail Transit','Sheppard'];
var years = ['All','2018','2019']
var months = ['All','January','February','March','April','May','June','July','August','September','October','November','December'];

// Save x-axis labels in variable
var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

	/* Select dropdown menu and add options to dropdown */

// Select subway_filter dropdown
// Add options to dropdown
var subway_filter = d3.select("#subway_filter");
subway_lines.forEach(subway_line=>subway_filter.append("option").text(subway_line));

// Select year_filter dropdown
// Add options to dropdown
var year_filter = d3.select("#year_filter");
years.forEach(year=>year_filter.append("option").text(year)); 

// Select month_filter dropdown
// Add options to dropdown
var month_filter = d3.select("#month_filter");
months.forEach(month=>month_filter.append("option").text(month));	

// Define svg width and height;
var svgWidth = 960;
var svgHeight = 500;

// Define svg margin;
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define chart width and height
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#graph")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .classed("chart",true);

// Initial Params
var chosenXAxis = "hour";
var chosenYAxis = "num_delays";

// Define chosenYData
if (chosenXAxis === "hour" & chosenYAxis === "num_delays") {
    var chosenYData = "num_delays_by_hour";
    }
else if (chosenXAxis === "hour" & chosenYAxis === "avg_delay") {
    var chosenYData = "avg_delay_by_hour";
    }
else if (chosenXAxis === "day" & chosenYAxis === "num_delays") {
    var chosenYData = "num_delays_by_day";
    }
else if (chosenXAxis === "day" & chosenYAxis === "avg_delay") {
    var chosenYData = "avg_delay_by_day";
    }

// // function used for updating x-scale var upon click on axis label
// function xScale(delayData, chosenXAxis) {
// // create scales
// var xBandScale = d3.scaleBand()
//     .domain(delayData[chosenXAxis])
//     .range([0, width]);

// return xBandScale;
// }

// // function used for updating xAxis var upon click on axis label
// function renderXAxes(newXScale, xAxis) {
// var bottomAxis = d3.axisBottom(newXScale);

// xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

// return xAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderXCircles(circlesGroup, newXScale, chosenXaxis) {

// circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));

// return circlesGroup;
// }

// // function used for updating y-scale var upon click on axis label
// function yScale(delayData, chosenYData) {
// // create scales
// var yLinearScale = d3.scaleLinear()
//     .domain([d3.min(delayData, d => d[chosenYData]) * 0.8, 
//     d3.max(delayData, d => d[chosenYData]) * 1.05
//     ])
//     .range([height, 0]);

// return yLinearScale;
// }

// // function used for updating yAxis var upon click on axis label
// function renderYAxes(newYScale, yAxis) {
// var leftAxis = d3.axisLeft(newYScale);

// yAxis.transition()
//     .duration(1000)
//     .call(leftAxis);

// return yAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderYCircles(circlesGroup, newYScale, chosenYData) {

// circlesGroup.transition()
//     .duration(1000)
//     .attr("cy", d => newYScale(d[chosenYData]));

// return circlesGroup;
// }

//   // function used for updating circles text with a transition to
//   // new circles
//   function renderYText(circlesText, newYScale, chosenYaxis) {

//     circlesText.transition()
//       .duration(1000)
//       .attr("y", d => newYScale(d[chosenYAxis]) + 3);

//     return circlesText;
//   }

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, chosenYAxis, chosenYData, delayData, circles) {

// if (chosenXAxis === "hour") {
//     var xlabel = "Hour";
// }
// else if (chosenXAxis === "day") {
//     var xlabel = "Day";
// };

// if (chosenYAxis === "num_delays") {
//     var ylabel = "Number of Delays";
// }
// else if (chosenYAxis === "avg_delay") {
//     var ylabel = "Average Delay (Minutes)";
// };

// var toolTip = d3.select("body").append("div")
//     .attr("class", "d3-tip")
//     .style("display","none");

// // on mouseover event
// circles.on("mouseover", function(d,i) {
//     toolTip.style("display","block");
//     toolTip.html(`${delayData[i][chosenYData]}<br>
//                 ${xlabel}: ${delayData[i][chosenXAxis]}<br>
//                 ${ylabel}: ${delayData[i][chosenYAxis]}`)
//             .style("left",d3.event.pdayX+"px")
//             .style("top",d3.event.pdayY+"px");
// });
// // onmouseout event
// circles.on("mouseout", function() {
//     toolTip.style("display","none");
//     });

// return circles;
// }


// Create init function
function init(){
	
	// Get data from api
	d3.json(url).then(function(data){
		
		// Set init_data = data
		init_data = data
	
			/* Calculate total number of delays and average min delay by hour and day */	

        // Calculate total number of delays by hour
        var init_num_delays_by_hour = [];
		for (i = 0; i < hours.length; i++) {
			init_num_delays_by_hour.push(init_data.filter(data=>data.hour == hours[i]).length);
		}

        // Calculate average min delay by hour
        var init_avg_delay_by_hour = [];
		for (i = 0; i < hours.length; i++) {
			init_avg_delay_by_hour.push(average(init_data.filter(data=>data.hour == hours[i]).map(data=>parseFloat(data.min_delay))));
		}
		
        // Calculate total number of delays by day
        var init_num_delays_by_day = [];
		for (i = 0; i < days.length; i++) {
			init_num_delays_by_day.push(init_data.filter(data=>data.day == days[i]).length);
		}

        // Calculate average min delay by day
        var init_avg_delay_by_day = [];
		for (i = 0; i < days.length; i++) {
			init_avg_delay_by_day.push(average(init_data.filter(data=>data.day == days[i]).map(data=>parseFloat(data.min_delay))));
		}

        var delayData = {
            hour: hours,
            day: days,
            num_delays_by_hour: init_num_delays_by_hour,
            avg_delay_by_hour: init_avg_delay_by_hour,
            num_delays_by_day: init_num_delays_by_day,
            avg_delay_by_day: init_avg_delay_by_day
        }

        // Print calculated values
        console.log(delayData);

        console.log(delayData.hour);
        console.log(delayData.num_delays_by_hour);

        console.log(chosenXAxis);
        console.log(chosenYAxis);
        console.log(chosenYData);

        console.log(delayData[chosenXAxis]);
        console.log(delayData[chosenYData]);

        console.log(delayData["hour"]);
        console.log(delayData["num_delays_by_hour"]);
        
        // Configure a time scale with a range between 0 and the chartWidth
        // Set the domain for the xTimeScale function
        // d3.extent returns the an array containing the min and max values for the property specified
        var xBandScale = d3.scaleBand()
            .domain(delayData[chosenXAxis])
            .range([0, width]);

        // Configure a linear scale with a range between the chartHeight and 0
        // Set the domain for the xLinearScale function
        var yLinearScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(delayData[chosenYData])]);

        // Create two new functions passing the scales in as arguments
        // These will be used to create the chart's axes
        var bottomAxis = d3.axisBottom(xBandScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Configure a drawLine function which will use our scales to plot the line's points
        var drawLine = d3
        .line()
        .x(xBandScale(delayData[chosenXAxis]))
        .y(yLinearScale(delayData[chosenYData]));

        // Append an SVG path and plot its points using the line function
        chartGroup.append("path")
        // The drawLine function returns the instructions for creating the line for delayData
        .attr("d", drawLine(delayData))
        .classed("line", true);

        // Append an SVG group element to the SVG area, create the left axis inside of it
        chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

        // Append an SVG group element to the SVG area, create the bottom axis inside of it
        // Translate the bottom axis to the bottom of the page
        chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", "translate(0, " + height + ")")
        .call(bottomAxis);






  //   // x xBandScale function 
  //   var xBandScale = xScale(delayData, chosenXAxis);
  
  //   // yLinearScale function 
  //   var yLinearScale = yScale(delayData, chosenYData);
  
  //   // Create initial axis functions
  //   var bottomAxis = d3.axisBottom(xBandScale);
  //   var leftAxis = d3.axisLeft(yLinearScale);
  
  //   // append x axis
  //   var xAxis = chartGroup.append("g")
  //     .attr("transform", `translate(0, ${height})`)
  //     .call(bottomAxis);
  
  //   // append y axis
  //   var yAxis = chartGroup.append("g")
  //     .call(leftAxis);
  
  //   // bind data 
  //   var circles = chartGroup.selectAll(null)
  //     .data(delayData)
  //     .enter()
  //     .append("g")
  //     .classed("stateCircle", true);
  
  //  // append initial circles
  //   var circlesGroup = circles.append("circle")
  //     .attr("cx", d => xBandScale(d[chosenXAxis]))
  //     .attr("cy", d => yLinearScale(d[chosenYData]))
  //     .attr("r", 2)

  
  //   // Create group for 2 x- axis labels
  //   var xlabelsGroup = chartGroup.append("g")
  //     .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
  //   var hourLabel = xlabelsGroup.append("text")
  //     .attr("y", 20)
  //     .attr("x", 0)
  //     .attr("value", "hour") // value to grab for event listener
  //     .classed("aText active", true)
  //     .text("Hour");
  
  //   var dayLabel = xlabelsGroup.append("text")
  //     .attr("y", 40)
  //     .attr("x", 0)
  //     .attr("value", "day") // value to grab for event listener
  //     .classed("aText inactive", true)
  //     .text("Day");

  
  //   // Create group for 2 y-axis labels
  //   var ylabelsGroup = chartGroup.append("g")
  //     .attr("transform", "rotate(-90)");
      
  //   var num_delaysLabel = ylabelsGroup.append("text")
  //     .attr("y", 0 - margin.left + 50)
  //     .attr("x", 0 - (height / 2))
  //     .attr("dy", "1em")
  //     .attr("value", "num_delays") // value to grab for event listener
  //     .classed("aText active", true)
  //     .text("Number of Delays");
    
  //   var avg_delayLabel = ylabelsGroup.append("text")
  //     .attr("y", 0 - margin.left + 30)
  //     .attr("x", 0 - (height / 2))
  //     .attr("dy", "1em")
  //     .attr("value", "avg_delay") // value to grab for event listener
  //     .classed("aText inactive", true)
  //     .text("Average Delay (Minutes)");

      
//     // updateToolTip function 
//     updateToolTip(chosenXAxis, chosenYAxis, delayData, circles);
  
//     // x axis labels event listener
//     xlabelsGroup.selectAll("text")
//       .on("click", function() {
//         // get value of selection
//         var value = d3.select(this).attr("value");
//         if (value !== chosenXAxis) {
  
//           // replaces chosenXAxis with value
//           chosenXAxis = value;
  
//           console.log(chosenXAxis);
  
//           // functions here found above csv import
//           // updates x scale for new data
//           xBandScale = xScale(delayData, chosenXAxis);
  
//           // updates x axis with transition
//           xAxis = renderXAxes(xBandScale, xAxis);
  
//           // updates circles with new x values
//           circlesGroup = renderXCircles(circlesGroup, xBandScale, chosenXAxis);
          
//           // updates circles with new x text
//           circlesText = renderXText(circlesText, xBandScale, chosenXAxis);
  
//           // updates tooltips with new info
//           updateToolTip(chosenXAxis, chosenYAxis, delayData, circles);
  
//           // changes classes to change bold text
//           if (chosenXAxis === "hour") {
//             hourLabel
//               .classed("aText active", true)
//               .classed("aText inactive", false);
//             dayLabel
//               .classed("aText active", false)
//               .classed("aText inactive", true);
//           }
//           else if (chosenXAxis === "day") {
//             hourLabel
//               .classed("aText active", false)
//               .classed("aText inactive", true);
//             dayLabel
//               .classed("aText active", true)
//               .classed("aText inactive", false);
//           }
//         }
    //   });
      
//         // y axis labels event listener
//     ylabelsGroup.selectAll("text")
//       .on("click", function() {
//         // get value of selection
//         var value = d3.select(this).attr("value");
//         if (value !== chosenYAxis) {
  
//           // replaces chosenXAxis with value
//           chosenYAxis = value;
  
//           console.log(chosenYAxis)
  
//           // functions here found above csv import
//           // updates y scale for new data
//           yLinearScale = yScale(delayData, chosenYAxis);
  
//           // updates y axis with transition
//           yAxis = renderYAxes(yLinearScale, yAxis);
  
//           // updates circles with new y values
//           circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);
          
//           // updates circles with new y text
//           circlesText = renderYText(circlesText, yLinearScale, chosenYAxis);
  
//           // updates tooltips with new info
//           updateToolTip(chosenXAxis, chosenYAxis, delayData, circles);
  
//           // changes classes to change bold text
//           if (chosenYAxis === "num_delays") {
//             num_delaysLabel
//               .classed("atext active", true)
//               .classed("atext inactive", false);
//             avg_delayLabel
//               .classed("atext active", false)
//               .classed("atext inactive", true);
//           }
//           else if (chosenYAxis === "avg_delay") {
//             num_delaysLabel
//               .classed("atext active", false)
//               .classed("atext inactive", true);
//             avg_delayLabel
//               .classed("atext active", true)
//               .classed("atext inactive", false);
//           }
//         }
//       });
//   }).catch(function(error) {
//     console.log(error);
//   });
  
      	
    });
    		
};

// Call init function
init();


// // Create optionChanged function - Called in index.html file
// function optionChanged(){
		
// 	// Get data from api
//     d3.json(url).then(function(data){
        
//         // Define current dropdown values 
//         var current_subway_value = d3.select("#subway_filter").property("value");
//         var current_year_value = d3.select("#year_filter").property("value");
//         var current_month_value = d3.select("#month_filter").property("value");
        
//         // Print current dropdown values
//         console.log(current_subway_value);
//         console.log(current_year_value);
//         console.log(current_month_value);

//         	/* Filter data for the graph based on current dropdown values */
            
//         if (current_subway_value == 'All'){
//          var current_data_temp1 = data;
//         }
//         else {
//          var current_data_temp1 = data.filter(data=>data.line_name == current_subway_value);
//         }

//         if (current_year_value == 'All'){
//          var current_data_temp2 = current_data_temp1;
//         }
//         else {
//          var current_data_temp2 = current_data_temp1.filter(data=>data.year == current_year_value);
//         }

//         if (current_month_value == 'All'){
//          var current_data = current_data_temp2;
//         }
//         else {
//          var current_data = current_data_temp2.filter(data=>data.month == current_month_value);
//         }
    
//             /* Calculate total number of delays and average min delay by hour and day */    

//         // Calculate total number of delays by hour
//         var current_num_delays_by_hour = [];    
//         for (i = 0; i < hours.length; i++) {
//             current_num_delays_by_hour.push(current_data.filter(data=>data.hour == hours[i]).length);
//         }

//         // Calculate average min delay by hour
//         var current_avg_delay_by_hour = []; 
//         for (i = 0; i < hours.length; i++) {
//             current_avg_delay_by_hour.push(average(current_data.filter(data=>data.hour == hours[i]).map(data=>parseFloat(data.min_delay))));
//         }
        
//         // Calculate total number of delays by day
//         var current_num_delays_by_day = [];    
//         for (i = 0; i < days.length; i++) {
//             current_num_delays_by_day.push(current_data.filter(data=>data.day == days[i]).length);
//         }

//         // Calculate average min delay by day
//         var current_avg_delay_by_day = []; 
//         for (i = 0; i < days.length; i++) {
//             current_avg_delay_by_day.push(average(current_data.filter(data=>data.day == days[i]).map(data=>parseFloat(data.min_delay))));
//         }

//         // Print calculated values
//         console.log(current_num_delays_by_hour);
//         console.log(current_avg_delay_by_hour);
//         console.log(current_num_delays_by_day);
//         console.log(current_avg_delay_by_day);
        
// 	});
		
// };







