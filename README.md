# Earthquake Visualization using Leaflet

## Introduction

This project visualizes earthquake data using Leaflet, a JavaScript library for interactive maps. The USGS provides earthquake data in GeoJSON format, which is updated every 5 minutes. This visualization utilizes the USGS GeoJSON feed to plot earthquakes on a map based on their longitude and latitude.

## Dataset

1. **Data Source**: [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
2. **Data Format**: GeoJSON

## Visualization

### Steps Taken:

1. **Import Data**: The project pulls earthquake data from the USGS GeoJSON feed using its URL.
2. **Mapping**: Leaflet is used to create a map that plots all earthquakes based on their longitude and latitude.
3. **Visualization Customization**:
   - Data markers reflect earthquake magnitude by size and depth by color.
   - Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker.
4. **Popups**: Each earthquake marker has a popup that provides additional information about the earthquake when clicked.
5. **Legend**: A legend is included to provide context for the map data, indicating the relationship between marker size and earthquake magnitude, as well as marker color and earthquake depth.

### Example Visualization:
file:///Users/demetriahorton/Documents/Screen%20Shot%202024-03-21%20at%205.33.59%20PM.png

## Usage

1. Clone the repository.
2. Open `index.html` in a web browser to view the earthquake visualization.

## Technologies Used

- Leaflet.js
- JavaScript
- HTML
- CSS

## Credits

- Data Source: [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)
- Leaflet.js: [https://leafletjs.com/](https://leafletjs.com/)

