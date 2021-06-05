var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Perform a GET request to the query URL


// d3.json(queryUrl).then(function (data) {
//     console.log(data.features);
//     // Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
//     createFeatures(data.features)
// });

// function createFeatures(earthquakedata) {
//     function onEachFeature(feature, layer) {
//         layer.bindPopup(
//             "<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
//         )
//     };
//     var earthquakes = L.geoJSON(earthquakedata, {
//         onEachFeature: onEachFeature
//     });
//   createMap(earthquakes)
// }

// function createMap(earthquakes){

// // Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
});

// var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "dark-v10",
//     accessToken: API_KEY
// });



// // Define a baseMaps object to hold our base layers
// var baseMaps = {
//     "Street Map": streetmap,
//     "Dark Map": darkmap
// };

// var overlayMaps = {
//     "earthquakes": earthquakes
// }

// // Create a new map
var myMap = L.map("mapid", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap]
});

// // Create a layer control containing our baseMaps
// // Be sure to add an overlay Layer containing the earthquake GeoJSON

// L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
// }).addTo(myMap);
// }
  


d3.json(queryUrl).then(function(data) {

    // Create a new choropleth layer
    geojson = L.choropleth(data, {
  
      // Define what  property in the features to use
      valueProperty: "mag",
  
      // Set color scale
      scale: ["#ffffb2", "#b10026"],
  
      // Number of breaks in step range
      steps: 10,
  
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
  
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Location: " + feature.properties.place + "<br>Magnitude:<br>" +
         + feature.properties.mag);
      }
    }).addTo(myMap);
  
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];
  
      // Add min & max
      var legendInfo = "<h1>Median Income</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);
  
  });
  