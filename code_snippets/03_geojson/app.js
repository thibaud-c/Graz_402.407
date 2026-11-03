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

// async lets this function await a network response without freezing the page.
async function loadPlaces() {
  const status = document.querySelector("#status");
  // The catch block below handles a missing file, invalid JSON, or unusable data.
  try {
    // This relative URL starts from the HTML page URL. Use Live Server, not file://.
    const response = await fetch("places.geojson");
    // fetch can finish successfully at the network level even for HTTP 404.
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // Parse the JSON text into JavaScript objects and arrays.
    const data = await response.json();
    // Check the collection shape before passing it to Leaflet.
    if (data.type !== "FeatureCollection" || !Array.isArray(data.features)) {
      throw new Error("Expected a GeoJSON FeatureCollection");
    }
    // Leaflet reads GeoJSON longitude/latitude order itself; do not reverse it here.
    const layer = L.geoJSON(data, {
      // This callback runs once per feature, so every marker gets its own popup.
      onEachFeature: function (feature, marker) {
        const label = document.createElement("p");
        // ?. tolerates missing properties; ?? supplies a fallback for null/undefined.
        // textContent treats a name containing < or > as text, not executable markup.
        label.textContent = `${feature.properties?.name ?? "Unnamed"}: ${feature.properties?.category ?? "unknown"}`;
        marker.bindPopup(label);
      }
    }).addTo(map);
    // An empty collection has no valid bounds. Fit only when there is an extent.
    if (layer.getBounds().isValid()) map.fitBounds(layer.getBounds(), { padding: [25, 25], maxZoom: 15 });
    // Show the feature count in the page, not only in the developer Console.
    status.textContent = `${data.features.length} fictional observations loaded.`;
  } catch (error) {
    status.textContent = `Could not load places.geojson: ${error.message}`;
    // Keep the detailed error available for debugging.
    console.error(error);
  }
}
// Defining the function does not run it. This call starts the request.
loadPlaces();
