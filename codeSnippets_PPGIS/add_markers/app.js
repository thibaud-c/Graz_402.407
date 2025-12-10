
// init map
let mapcenter = [48.20851180836414, 16.373138584827505];
let map = L.map('map', {zoomControl: false}).setView(mapcenter, 11);
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
   attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
   subdomains: 'abcd',
   maxZoom: 20,
   minZoom: 0}).addTo(map);

// Global variables to hold state while the modal is open
let tempLatLng = null;
let tempVoteType = null; 

// Create a new layer to add our markers to the map
let drawnItems = L.featureGroup().addTo(map);

// Function called when they click Thumb Up or Down
function openModal(type) {

    // Capture the map center coordinates
    tempLatLng = map.getCenter(); 
    tempVoteType = type;

    // Show the modal
    document.querySelector('#commentModal').style.display = 'block';

    // focus the text area with a slight delay to ensure modal is visible
    setTimeout(() => {
        document.querySelector('#userComment').focus();
    }, 100);
}

// Function called when they click "Save Point" in the modal
function saveData() {
    // Get the comment
    let comment = document.querySelector('#userComment').value;

    // Determine Color based on sentiment
    let markerColor = (tempVoteType === 'like') ? 'blue' : 'orange';

    // Create the colorcoded marker 
    let newMarker = L.circleMarker(tempLatLng, {
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.5,
        radius: 8
    });
    // add data to the marker: 
    newMarker.feature = {
        "type": "Feature",
        "properties": {
            "sentiment": tempVoteType,
            "comment": comment,
            "timestamp": new Date().toISOString()
        }
    };

    // Add to our specific group (NOT just the map)
    drawnItems.addLayer(newMarker);
    // Bind a popup so clicking the dot shows the text
    newMarker.bindPopup(comment);

    // Clean up
    closeModal();
}

function closeModal() {
    document.querySelector('#commentModal').style.display = 'none';
    document.querySelector('#userComment').value = "";  // Clear text
}