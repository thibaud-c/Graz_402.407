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


// An explicit predicate keeps geometry selection separate from drawing.
function isPolygon(feature) {
  return ["Polygon", "MultiPolygon"].includes(feature?.geometry?.type);
}
async function loadDistricts() {
  const status = document.querySelector("#status");
  try {
    const response = await fetch("graz_district.geojson");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data?.type !== "FeatureCollection" || !Array.isArray(data.features)) {
      throw new Error("Expected a GeoJSON FeatureCollection");
    }
    // filter returns a new array. The source export is not modified.
    const polygons = data.features.filter(isPolygon);
    const layer = L.geoJSON(polygons, {
      style: { color: "#176b58", weight: 2, fillOpacity: 0.15 },
      onEachFeature: function (feature, polygon) {
        const label = document.createElement("p");
        // Use textContent for source attributes; strings passed directly become HTML.
        label.textContent = feature.properties?.name ?? "Unnamed district";
        polygon.bindPopup(label);
      }
    }).addTo(map);
    if (layer.getBounds().isValid()) map.fitBounds(layer.getBounds());
    status.textContent = `${polygons.length} polygons shown; ${data.features.length - polygons.length} other features excluded.`;
  } catch (error) {
    status.textContent = `Could not load districts: ${error.message}`;
    console.error(error);
  }
}
loadDistricts();
