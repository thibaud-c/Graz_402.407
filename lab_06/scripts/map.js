// 1. Leaflet creates a map. Our other scripts can use this map variable.
const map = L.map("map", { scrollWheelZoom: false }).setView([47.0707, 15.4395], 14);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const latitudeInput = document.querySelector("#latitude");
const longitudeInput = document.querySelector("#longitude");
const locationStatus = document.querySelector("#location-status");
const draftLayers = L.layerGroup().addTo(map);

// 2. Copy a location into the form and draw a temporary orange circle.
// Both a map click and the geocoder call this function.
function chooseLocation(position) {
  latitudeInput.value = position.lat.toFixed(5);
  longitudeInput.value = position.lng.toFixed(5);
  draftLayers.clearLayers(); // Keep just the latest selection.
  L.circleMarker(position, { radius: 10, color: "#a64000", interactive: false }).addTo(draftLayers);
  locationStatus.textContent = "Selected " + latitudeInput.value + ", " + longitudeInput.value +
    ". Press Add an idea. This selection is not a saved record yet.";
}

map.on("click", function (event) {
  chooseLocation(event.latlng); // The event contains the clicked latitude and longitude.
});

// 3. A small loop connects the same action to both coordinate fields.
// If someone types coordinates, remove the old preview to avoid a misleading circle.
for (const input of [latitudeInput, longitudeInput]) {
  input.addEventListener("input", function () {
    draftLayers.clearLayers();
    locationStatus.textContent = "Coordinates edited in the form. Saving will use those two fields.";
  });
}
