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

// An array holds the ordered stops. Each object keeps one stop's attributes together.
// buttonId must match a unique button ID in index.html.
const stops = [
  { buttonId: "square", name: "Near Hauptplatz", coordinates: [47.0707, 15.4395] },
  { buttonId: "park", name: "Near Stadtpark", coordinates: [47.074, 15.446] }
];
// Repeat this setup for every stop instead of copying the same handler twice.
for (const stop of stops) {
  const label = document.createElement("p");
  // Build a text-only popup; this also works if labels later come from external data.
  label.textContent = stop.name;
  // The callback below remembers this stop and its marker.
  const marker = L.marker(stop.coordinates).addTo(map).bindPopup(label);
  // Find the matching HTML button using its ID and react when the reader clicks.
  document.querySelector(`#${stop.buttonId}`).addEventListener("click", function () {
    // Change the geographic focus, open that stop's popup, and update the text feedback.
    map.setView(stop.coordinates, 16);
    marker.openPopup();
    document.querySelector("#status").textContent = `Showing ${stop.name}.`;
  });
}
