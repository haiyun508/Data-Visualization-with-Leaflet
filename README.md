# Leaflet Homework - Visualizing Data with Leaflet

## Background

![1-Logo](Leaflet-Step-1/Images/1-Logo.png)

The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. 

We build a new set of tools that will allow visulization of the earthquake data. USGS collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. We hope to visualize their data to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.



### Basic Visualization

![2-BasicMap](Leaflet-Step-1/Images/2-BasicMap.png)


1. **Get data set**

   ![3-Data](Leaflet-Step-1/Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

   ![4-JSON](Leaflet-Step-1/Images/4-JSON.png)

2. **Import & Visualize the Data**

   Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.

   * Data markers reflect the magnitude of the earthquake by their size and and depth of the earth quake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.

   * Popups provide additional information about the earthquake when a marker is clicked.

   * The Legend provide context for the map data.


### Advanced Visualization

![5-Advanced](Leaflet-Step-1/Images/5-Advanced.png)

A second data set on tectonic plates was put on our map to illustrate the relationship between tectonic plates and seismic activity. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

In this step we are going to..

* Plot a second data set on our map.

* Add a number of base maps to choose from as well as separate out our two different data sets into overlays that can be turned on and off independently.

* Add layer controls to our map.



