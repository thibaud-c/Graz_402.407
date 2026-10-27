// Read this with index.html: Leaflet loads first and supplies the global name L.
// L.map creates a map object in the element with id="map".
// setView takes [latitude, longitude] in degrees, followed by the zoom level.
const map = L.map("map").setView([47.0707, 15.4395], 13);
// A basemap is a set of images. Leaflet fills in zoom/x/y in this URL as you pan.
// Attribution credits the data provider and must stay visible on the map.
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a marker, add it to this map, and attach a popup.
// This fixed popup is written by us. Use textContent for visitor or API text.
L.marker([47.0707, 15.4395]).addTo(map).bindPopup("Example stop near Hauptplatz");
// Leaflet passes an event object to our callback whenever the map is clicked.
map.on("click", function (event) {
  // Read the lat/lng properties and display five decimal places.
  // Rounding the display does not improve the accuracy of the chosen location.
  document.querySelector("#status").textContent =
    `Latitude: ${event.latlng.lat.toFixed(5)}, longitude: ${event.latlng.lng.toFixed(5)}`;
});

// Adapted from Lab 06: use the actual map variable, not the HTML element's ID.
document.querySelector("#zoom-graz").addEventListener("click", function () {
  map.setView([47.0707, 15.4395], 13);
});
