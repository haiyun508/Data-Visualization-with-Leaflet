
// Use this link to get the data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function for getting circle color
var myColor = d3.scaleLinear()
    .domain([-10, 100])
    .range(["#61FF33", "#FF3342"])

//  arrays to hold circles
var circles=[]
d3.json(link).then(function (data) {

 // loop each feature, grab coordinates and magnitude for each earthquake
  data.features.forEach(feature => {
    var lan = feature.geometry.coordinates[0]
    var lat = feature.geometry.coordinates[1]
    var magnitude = feature.properties.mag
    latlan = [lat, lan]
    // create circles with Popup
    circles.push(
    L.circle(latlan, {
      color: "#8D8A8A",
      weight: 1,
      opacity: 0.3,
      fillColor: myColor(feature.geometry.coordinates[2]),
      fillOpacity: 0.95,
      // Setting our circle's radius proportionate to its magnitude
      radius: magnitude * 10000
    }).bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h3>Magnitude: " + feature.properties.mag + "<br>" + lan + "</h3>")
    // .addTo(myMap);
    )
  })

console.log(circles)
 


// Adding tile layer
var streetmap=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
})
// .addTo(myMap);

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});
var earthquakes=L.layerGroup(circles)
// Define a baseMaps object to hold our base layers
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
};

var overlayMaps = {
    "earthquakes": earthquakes
}

// Create a new map
var myMap = L.map("mapid", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap,earthquakes]
});

// Create a layer control containing our baseMaps
// Be sure to add an overlay Layer containing the earthquake GeoJSON

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);
 // Set up the legend
  var legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend');
    var categories=["-10-10","10-30","30-50","50-70","70-90","90+"]
    var limits=[-10,10,30,50,70,90]
    labels=[]
  
    limits.forEach(function (limit, index) {
      labels.push("<li style=\"background-color: " + myColor(limit) + "\"></li>");
      labels.push("<p>"+categories[index]+"</p>");
      console.log(myColor(limit))
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };
  legend.addTo(myMap);
})
