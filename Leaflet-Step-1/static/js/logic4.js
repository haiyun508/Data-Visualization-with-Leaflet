var myMap = L.map("mapid", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(link).then(function (data) {
  console.log(data)
  // function myColor to grab differentt color for different depth
  var myColor = d3.scaleLinear()
    .domain([-10, 100])
    .range(["#61FF33", "#FF3342"])

    // loop each feature, grab coordinates and magnitude for each earthquake
  data.features.forEach(feature => {
    var lon = feature.geometry.coordinates[0]
    var lat = feature.geometry.coordinates[1]
    var magnitude = feature.properties.mag
    latlon = [lat, lon]
    // create circles with Popup
    L.circle(latlon, {
      color: "#8D8A8A",
      weight: 1,
      opacity: 0.3,
      fillColor: myColor(feature.geometry.coordinates[2]),
      fillOpacity: 0.95,
      // Setting our circle's radius proportionate to its magnitude
      radius: magnitude * 10000
    }).bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h3>Magnitude: " + feature.properties.mag + 
    "</h3><br><a href=\"" + feature.properties.url + "\">More info From USGS</a>").addTo(myMap)    
  });
  // "<li style=\"background-color: " + colors[index] + "\"></li>"
 
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