
// Initialize the map
var map = L.map('map').setView([0, 0], 2);

// Add the base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Fetch the earthquake data
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
  .then(response => response.json())
  .then(data => {
    // Iterate through the earthquake data
    data.features.forEach(feature => {
      // Extract coordinates, magnitude, and depth
      var coords = feature.geometry.coordinates;
      var mag = feature.properties.mag;
      var depth = coords[2];

      // Determine marker size based on magnitude
      var size = mag * 5;

      // Determine marker color based on depth
      var color = depth > 70 ? '#FF0000' :
                  depth > 30 ? '#FFA500' :
                               '#FFFF00';

      // Create marker and add to map
      L.circleMarker([coords[1], coords[0]], {
        radius: size,
        color: 'black',
        weight: 1,
        fillColor: color,
        fillOpacity: 0.8
      }).bindPopup(`<b>Magnitude:</b> ${mag}<br><b>Depth:</b> ${depth} km`).addTo(map);
    });

    // Create legend
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      var labels = ['<strong>Depth</strong>'];
      var depths = [0, 30, 70];
      var colors = ['#FFFF00', '#FFA500', '#FF0000'];

      for (var i = 0; i < depths.length; i++) {
        div.innerHTML += labels.push(
          '<i style="background:' + colors[i] + '"></i> ' +
          depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km' : '+'));
      }
      div.innerHTML = labels.join('<br>');
      return div;
    };
    legend.addTo(map);
  })
  .catch(error => console.error('Error fetching earthquake data:', error));


