// Define url
var url = "/delay";

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
		return (sum / numbersCnt).toFixed(2);
	}
	else {
		return "N/A";
	}
};

// Create function to get unique values
function unique(value, index, self) { 
    return self.indexOf(value) === index;
}

// Select filters
var line_filter = d3.select("#line_filter");
var station_filter = d3.select("#station_filter");
var direction_filter = d3.select("#direction_filter");
var day_filter = d3.select("#day_filter");
var month_filter = d3.select("#month_filter");
var hour_filter = d3.select("#hour_filter");

// // Select predictions
var gap_prediction = d3.select("#gap_prediction");
var delay_prediction = d3.select("#delay_prediction");

// Create init function
function init(){

    // Add options to line_filter dropdown
    var subway_lines = ['All','Bloor Danforth','Scarborough Rail Transit','Sheppard','Yonge University Spadina'];
    subway_lines.forEach(subway_line=>line_filter.append("option").text(subway_line));

    // Add options to station_filter dropdown
    d3.json(url).then(function(data){
        var stations = data.map(data=>data.station).filter(unique);
        stations.sort();
        stations.unshift('All');
        stations.forEach(station=>station_filter.append("option").text(station));
        });

    // Add options to direction_filter dropdown
    var directions = ["All","N","S","E","W"];
    directions.forEach(direction=>direction_filter.append("option").text(direction));

    // Add options to month_filter dropdown
    var months = ['All','January','February','March','April','May','June','July','August','September','October','November','December'];
    months.forEach(month=>month_filter.append("option").text(month));

 // Add options to day_filter dropdown
    var days = ['All','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    days.forEach(day=>day_filter.append("option").text(day)); 

       // Add options to hour_filter dropdown
    var hours = ['All',0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
    hours.forEach(hour=>hour_filter.append("option").text(hour));
	
	// Get data from api
	d3.json(url).then(function(data){
		
		// Set delay_data = data
        delay_data = data
        
        // Calculate average delay time
        avg_delay = average(delay_data.map(data=>parseFloat(data.min_delay)))

        // Calculate average wait time
        avg_gap = average(delay_data.map(data=>parseFloat(data.min_gap)))

        // Print calculated values
        // console.log(avg_delay);
        // console.log(avg_gap);

        // Add data to HTML
        delay_prediction.text(avg_delay); 
        gap_prediction.text(avg_gap);
	
    });
    		
};

// Call init function
init();

// Create optionChanged function - Called in index.html file
function optionChanged(){
    
    // Define current dropdown values 
    var line_value = line_filter.property("value");
    var station_value = station_filter.property("value");
    var direction_value = direction_filter.property("value");
    var month_value = month_filter.property("value");
    var day_value = day_filter.property("value");
    var hour_value = hour_filter.property("value");

    // Print current dropdown values
    // console.log(line_value);
    // console.log(station_value);
    // console.log(direction_value);
    // console.log(month_value);
    // console.log(day_value);
    // console.log(hour_value);

    // Get data from api
    d3.json(url).then(function(data){
    
        // Filter data for the graph based on current dropdown values 
        
        if (line_value == 'All'){
            var delay_data_temp1 = data;
            }
            else {
            var delay_data_temp1 = data.filter(data=>data.line_name == line_value);
            }
        if (station_value == 'All'){
            var delay_data_temp2 = delay_data_temp1;
            }
            else {
            var delay_data_temp2 = delay_data_temp1.filter(data=>data.station == station_value);
            }
        if (direction_value == 'All'){
            var delay_data_temp3 = delay_data_temp2;
            }
            else {
            var delay_data_temp3 = delay_data_temp2.filter(data=>data.bound == direction_value);
            }
        if (month_value == 'All'){
            var delay_data_temp4 = delay_data_temp3;
            }
            else {
            var delay_data_temp4 = delay_data_temp3.filter(data=>data.month == month_value);
            }
        if (day_value == 'All'){
            var delay_data_temp5 = delay_data_temp4;
            }
            else {
            var delay_data_temp5 = delay_data_temp4.filter(data=>data.day == day_value);
            }
        if (hour_value == 'All'){
            var delay_data = delay_data_temp5;
            }
            else {
            var delay_data = delay_data_temp5.filter(data=>data.hour == hour_value);
            }

        // Calculate average delay time
        avg_delay = average(delay_data.map(data=>parseFloat(data.min_delay)))

        // Calculate average wait time
        avg_gap = average(delay_data.map(data=>parseFloat(data.min_gap)))

        // Print calculated values
        // console.log(avg_delay);
        // console.log(avg_gap);

        // Add data to HTML
        delay_prediction.text(avg_delay); 
        gap_prediction.text(avg_gap);
    
	});
    
};