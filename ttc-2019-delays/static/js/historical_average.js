// Define url
var url = "/delay";
var url2 = "/map"

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


	/* Save dropdown menu text in variables and add options to dropdown */

// Add options to line_filter dropdown
var subway_lines = ['All','Yonge University Spadina','Bloor Danforth','Scarborough Rail Transit','Sheppard'];
var line_filter = d3.select("#line_filter");
subway_lines.forEach(subway_line=>line_filter.append("option").text(subway_line));

// Add options to station_filter dropdown
var stations = [];
d3.json(url2).then(function(data){
    stations.push('All');
    data.forEach(data=>stations.push(data.station));
    var station_filter = d3.select("#station_filter");
    stations.forEach(station=>station_filter.append("option").text(station));
    });

// Add options to direction_filter dropdown
var directions = ["All","N","S","E","W"];
var direction_filter = d3.select("#direction_filter");
directions.forEach(direction=>direction_filter.append("option").text(direction));

// Add options to day_filter dropdown
var days = ['All','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
var day_filter = d3.select("#day_filter");
days.forEach(day=>day_filter.append("option").text(day)); 

// Add options to month_filter dropdown
var months = ['All','January','February','March','April','May','June','July','August','September','October','November','December'];
var month_filter = d3.select("#month_filter");
months.forEach(month=>month_filter.append("option").text(month));

// Add options to hour_filter dropdown
var hours = ['All',0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
var hour_filter = d3.select("#hour_filter");
hours.forEach(hour=>hour_filter.append("option").text(hour));

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







