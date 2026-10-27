// OPTIONAL Step 5 loads scripts/map.js after Leaflet, our map-drawing library.
const mapStatus = document.querySelector("#map-status");
const returnButton = document.querySelector("#return-map");

// If the external library is unavailable, keep the rest of the lab usable.
if (typeof L === "undefined") {
  mapStatus.textContent = "Leaflet did not load. Check your connection and the Step 5 script links, then reload. The record exercise still works.";
} else {
  // TRY ONE CHANGE AT A TIME: label text, zoom level, then one coordinate.
  // This is an invented record near Graz, not a measured area of shade.
  const label = "Invented example: shade in the afternoon.";
  const latitude = 47.0707;
  const longitude = 15.4395;
  const zoom = 14;

  // Leaflet expects [latitude, longitude]. We will meet GeoJSON's different order later.
  const map = L.map("map").setView([latitude, longitude], zoom);
  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Pass a text element into the popup so edited labels are not treated as HTML.
  const popup = document.createElement("p");
  popup.textContent = label;
  L.marker([latitude, longitude]).addTo(map).bindPopup(popup);
  mapStatus.textContent = "Invented demo location: latitude " + latitude + ", longitude " + longitude + ". The basemap is from OpenStreetMap; the invented marker is ours.";

  // The same event-listener pattern as app.js, now changing the map view.
  returnButton.disabled = false;
  returnButton.addEventListener("click", function () {
    map.setView([latitude, longitude], zoom);
  });

  tiles.on("tileerror", function () {
    mapStatus.textContent = "Some basemap images did not load. Check your connection and reload. The marker is an invented example, not a measurement.";
  });
}
