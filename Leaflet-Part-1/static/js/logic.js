// Create the map object and set its view
var map = L.map('map', { 
    center: [20, 0], // Centered to view the whole world
    zoom: 2 
});

// Add base map layers
var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var satelliteMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '© OpenTopoMap contributors'
});

var darkMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '© CartoDB'
});

// Add earthquake data for earthquakes over 2.5 magnitude 
axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson')
    .then(response => {
        var earthquakeData = response.data;

        // function to style markers based on magnitude and depth
        function styleMarkers(feature) {
            return {
                radius: feature.properties.mag * 2, // Size based on magnitude
                fillColor: getColor(feature.geometry.coordinates[2]), // Color based on depth
                color: "#000",
                weight: 1,
                fillOpacity: 0.8
            };
        }

        // Function to color scale based on depth
        function getColor(depth) {
            return depth > 90 ? '#800026' :  // Dark red
                   depth > 70 ? '#BD0026' :  // Red
                   depth > 50 ? '#E31A1C' :  // Light red
                   depth > 30 ? '#FC4E2A' :  // Orange-red
                   depth > 10 ? '#FD8D3C' :  // Light orange
                         '#32CD32';           // Lime green
        }

        // Create earthquake layer
        var earthquakeLayer = L.geoJSON(earthquakeData, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, styleMarkers(feature));
            },
            onEachFeature: function (feature, layer) {
                // Add popups with details
                layer.bindPopup(`
                    <strong>Magnitude:</strong> ${feature.properties.mag}<br>
                    <strong>Location:</strong> ${feature.properties.place}<br>
                    <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km
                `);
            }
        });

        // Add the layer to the map by default
        earthquakeLayer.addTo(map);

        // Load tectonic plates GeoJSON data from local file
        axios.get('static/Data/techtonic_plates.json') 
            .then(plateResponse => {
                var platesData = plateResponse.data;

                // Create tectonic plates layer
                var platesLayer = L.geoJSON(platesData, {
                    style: function (feature) {
                        return {
                            color: "purple",
                            weight: 2
                        };
                    }
                });

                // Create layer control (base maps + overlays)
                var baseMaps = {
                    "Street Map": streetMap,
                    "Satellite Map": satelliteMap,
                    "Dark Map": darkMap
                };

                var overlayMaps = {
                    "Earthquakes": earthquakeLayer,
                    "Tectonic Plates": platesLayer
                };

                // Add layer control to the map
                L.control.layers(baseMaps, overlayMaps).addTo(map);

                // Add legend to the map
                var legend = L.control({ position: "bottomright" });
                legend.onAdd = function () {
                    var div = L.DomUtil.create("div", "info legend"),
                        grades = [0, 10, 30, 50, 70, 90],
                        labels = [];

                    div.innerHTML += '<h4>Earthquake Depth</h4>';

                    // Loop through intervals to generate labels
                    for (var i = 0; i < grades.length; i++) {
                        div.innerHTML +=
                            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
                    }
                    return div;
                };
                legend.addTo(map);
            })
            .catch(error => {
                console.error('Error loading tectonic plates:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching earthquake data:', error);
    });
