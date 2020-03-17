

// Adding a tile layer (the background map image) to our map

var street = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
})

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
})



var mymap = L.map("map", {
  center: [43.7131, -79.3858],
  zoom: 11,
  layers:[street,dark,satellite]
});

var basemaps = {
  Street: street,
  Dark: dark,
  Satellite: satellite
}

// L.control.layers(basemaps, null).addTo(mymap);

// setting layers for different subway lines
var line1layer = new L.LayerGroup();
var line2layer = new L.LayerGroup();
var line3layer = new L.LayerGroup();
var line4layer = new L.LayerGroup();



var overlayers ={
  Line1: line1layer,
  Line2: line2layer,
  Line3: line3layer,
  Line4: line4layer,
};


L.control.layers(basemaps, overlayers).addTo(mymap)

// load data 
var urlMap ="/map";
// var urlMap ="../data/station_in_line.csv";

d3.json(urlMap).then(function(data){
console.log(data);	

// //line1
var line1coordinates=[];
for (var  a=0; a<38;  a++){
  var latlng1 = [parseFloat(data[a].latitude), parseFloat(data[a].longitude)];
  line1coordinates.push(latlng1);
  var circle1 = L.circle( latlng1, {
      color: 'yellow',
      fillColor: 'red',
      fillOpacity: 0.7,
      radius: 60
    }).bindPopup("<h3>" + data[a].station +
    "</h3><hr><p>Number of Delay Happened: " + data[a].num_delays + 
    " </p><hr><p> Avg Delay Time: " + data[a].avg_delay_time + " minutes </p>").addTo(line1layer);
  
// console.log(data[a].station);

};
console.log(line1coordinates);

//line connecting between station
var line1 = L.polyline(line1coordinates, {
color: "yellow",
weight: 1,
stroke: true
}).addTo(line1layer);


line1layer.addTo(mymap);

//line 2
var line2coordinates =[];
for (var i=38; i <69; i++) {
  var latlng2 = [parseFloat(data[i].latitude), parseFloat(data[i].longitude)];
  line2coordinates.push(latlng2); 

  var circle2 = L.circle( latlng2, {
      color: 'green',
      fillColor: 'red',
      fillOpacity: 0.7,
      radius: 60
    }).bindPopup("<h3>" + data[i].station + "</h3><hr><p>TNumber of Delay Happened:" + data[i].num_delays + 
   " minutes</p><hr><p> Avg Delay Time: " + data[i].avg_delay_time + " minutes</p>").addTo(line2layer); 


};
// lines to connect stops
var line2 = L.polyline(line2coordinates, {
color: "green",
weight: 1,
stroke: true
}).addTo(line2layer);


line2layer.addTo(mymap)
//line3
var line3coordinates=[];
for (var j =69; j <75; j ++){
  var latlng3 = [parseFloat(data[j].latitude), parseFloat(data[j].longitude)];
  line3coordinates.push(latlng3);
  var circle3 = L.circle(latlng3, {
      color: 'blue',
      fillColor: 'red',
      fillOpacity: 0.7,
      radius: 60
    }).bindPopup("<h3>" + data[j].station +
    "</h3><hr><p>Number of Delay Happened: " + data[j].num_delays + 
    "</p><hr><p> Avg Delay Time: " + data[j].avg_delay_time + " minutes</p>").addTo(line3layer);
  
  };

  var line3 = L.polyline(line3coordinates, {
      color: "blue",
      weight: 1,
      stroke: true
      }).addTo(line3layer);
line3layer.addTo(mymap)
  

//line4
var line4coordinates=[];
for (var k =75; k<80;  k++){
  var latlng4 = [parseFloat(data[k].latitude), parseFloat(data[k].longitude)];
  line4coordinates.push(latlng4);
  var circle4 = L.circle( [parseFloat(data[k].latitude), parseFloat(data[k].longitude)], {
      color: 'purple',
      fillColor: 'red',
      fillOpacity: 0.7,
      radius: 60
    }).bindPopup("<h3>" + data[k].station +
    "</h3><hr><p>Number of Delay Happened: " + data[k].num_delays + 
    " </p><hr><p> Avg Delay Time: " + data[k].avg_delay_time + " minutes</p>").addTo(line4layer);

  
};


var line4 = L.polyline(line4coordinates, {
color: "purple",
weight: 1,
stroke: true
}).addTo(line4layer);
line4layer.addTo(mymap)

});

