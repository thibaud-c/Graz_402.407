const map = L.map("map", { scrollWheelZoom: false, zoomSnap: 0.25 });
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Leaflet uses [latitude, longitude]. These are the opposite corners of our box.
const studyArea = [[47.066, 15.429], [47.076, 15.445]];
map.fitBounds(studyArea, { padding: [12, 12] });
L.rectangle(studyArea, { color: "#52645b", weight: 2, fill: false, interactive: false }).addTo(map);

// Each choice pairs two zone names with the endpoints of the line between them.
const divisions = {
  eastWest: {
    labels: ["West", "East"],
    line: [[47.066, 15.437], [47.076, 15.437]]
  },
  northSouth: {
    labels: ["North", "South"],
    line: [[47.071, 15.429], [47.071, 15.445]]
  }
};
const divider = L.polyline([], { color: "#382952", weight: 3, dashArray: "8 6", interactive: false }).addTo(map);

// Leaflet calls this once for each GeoJSON Point and supplies its map position.
// Change radius or fillColor here to change every seating symbol.
function drawRequest(feature, position) {
  const circle = L.circleMarker(position, {
    radius: 7,
    color: "#074437",
    weight: 2,
    fillColor: "#37a884",
    fillOpacity: 1
  });
  const label = document.createElement("span");
  label.textContent = "Seating request " + feature.properties.id;
  return circle.bindTooltip(label);
}
