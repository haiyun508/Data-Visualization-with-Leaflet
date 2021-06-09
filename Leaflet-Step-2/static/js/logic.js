// Use this link to get the data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// function for getting circle color
// var myColor = d3.scaleLinear()
//   .domain([-10, 100])
//   .range(["#00FF00", "#FF0000"])
function chooseColor(d) {
  if (d >= -10 && d < 10) {
    return "#00e64d";
  }
  else if (d >= 10 && d < 30) {
    return "#ffff00"
  }
  else if (d >= 30 && d < 50) {
    return "#ff9900"
  }
  else if (d >= 50 && d < 70) {
    return "#ff6600"
  }
  else if (d >= 70 && d < 90) {
    return "#cc6600"
  }
  else if (d >= 90) {
    return "#b30000"
  }

}
//  arrays to hold circles
var circles = []
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
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.95,
        // Setting our circle's radius proportionate to its magnitude
        radius: magnitude * 10000
      }).bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h3>Magnitude: " + feature.properties.mag +
        "</h3><br><a href=\"" + feature.properties.url + "\">More info From USGS</a>")
    )
  })

  // Adding tile layer
  var Satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });
  var Grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v9",
    accessToken: API_KEY
  });

  var Outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v9",
    accessToken: API_KEY
  });
  var earthquakes = L.layerGroup(circles)

  //  url for data of tectonic plates
  link2 = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

  // perform a get request to the query URL and create a GeoJSON layer
  d3.json(link2).then(function (data) {
    console.log(data)
    var tectonicplates = L.geoJSON(data.features, { color: "#ff5522" });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Satellite": Satellite,
      "Grayscale": Grayscale,
      "Outdoors": Outdoors
    };

    var overlayMaps = {
      "Earthquakes": earthquakes,
      "Tectonic Plates": tectonicplates
    }

    // Create a new map
    var myMap = L.map("mapid", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [Satellite, earthquakes,tectonicplates]
    });

    // Create a layer control containing our baseMaps
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
    // Set up the legend
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {

      var div = L.DomUtil.create('div', 'info legend');
      var categories = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"]
      var limits = [-10, 10, 30, 50, 70, 90]
      labels = []

      limits.forEach(function (limit, index) {
        labels.push("<li style=\"background-color: " + chooseColor(limit) + "\"></li>");
        labels.push("<p>" + categories[index] + "</p>");
        console.log(chooseColor(limit))
      });

      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
    legend.addTo(myMap);
  })
})
