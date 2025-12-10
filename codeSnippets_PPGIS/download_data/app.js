let mapcenter = [48.20851180836414, 16.373138584827505];
var map = L.map('map', {zoomControl: false}).setView(mapcenter, 11);
var osm = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
   attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
   subdomains: 'abcd',
   maxZoom: 20,
   minZoom: 0}).addTo(map);

// Zoom Control
var zoomControl = L.control.zoom({
  position: "bottomright"
});
zoomControl.addTo(map);

let drawnItems = L.featureGroup().addTo(map); 

// Load example data. Not useful in your projects
async function loadExampleData(){
  let loadedData = await fetch('data_example.json')
  let data = await loadedData.json();
  console.log(data);

  data.forEach(function(feature) {
    let color = (feature.sentiment === 'like') ? 'blue' : 'orange'; 
    let newMarker = L.circleMarker([feature.lat, feature.lng], {
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            radius: 8
        });
    // add data to the marker: 
    newMarker.feature = {
        "type": "Feature",
        "properties": {
            "sentiment": feature.sentiment,
            "comment": feature.comment
        }
    };
    newMarker.bindPopup(feature.comment);
    drawnItems.addLayer(newMarker);
  });

}
loadExampleData();


function saveToFile(content, fileName) {
    // Create a "Blob" (A file-like object of immutable raw data)
    let blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });

    // Create a temporary URL pointing to that Blob in memory
    let url = URL.createObjectURL(blob);

    // Create a "download" link
    let link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Clean up
    // Remove the element and revoke the URL to free up memory
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function downloadData(){
    // Convert the Leaflet Layer Group to GeoJSON
    let data = drawnItems.toGeoJSON();
    
    // Check if there is data
    if (data.features.length === 0) {
        alert("No points to download!");
        return;
    }
    
    // Add the Socio-Demographics (ex. Gender) to the properties
    let userGender = document.querySelector('#genderInput').value;
    // check sociodemographic values
    if(userGender === "") {
        alert("No Gender value!");
        return;
    }
    
    // Add the gender to the GeoJSON items
    data.features.forEach(function(feature) {
        feature.properties.gender = userGender;
    });
    let dataStr = JSON.stringify(data);

    // Give a name to the file
    let fileName = 'participant_data_' + new Date().getTime() + '.geojson';

    saveToFile(data, fileName);
    alert("Data downloaded successfully!");

    // Clear the map & form with delay
    setTimeout(() => {
        drawnItems.clearLayers();
        document.querySelector('#genderInput').value = "";
    }, 100);
}
