// Leaflet (the global L) loads before this file; see index.html.
const map = L.map("map").setView([25, 0], 2);
const basemap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// WMS = Web Map Service. This server renders images of the selected layer.
// country_bounds is the machine-readable Name from its GetCapabilities document.
// Leaflet supplies each image's bounding box, size and CRS as the map moves.
const boundaries = L.tileLayer.wms("https://demo.mapserver.org/cgi-bin/wms", {
  layers: "country_bounds",
  format: "image/png",           // PNG allows an invisible background.
  transparent: true,             // The basemap remains visible underneath.
  version: "1.1.1",              // Explicit so we can inspect the request in Network.
  attribution: '<a href="https://demo.mapserver.org/">MapServer WMS demo</a>'
}).addTo(map);
L.control.layers({ "OpenStreetMap": basemap }, { "WMS country boundaries": boundaries }).addTo(map);
// Leave an error visible if any tile fails. The other layers can still work.
boundaries.on("tileerror", function () {
  document.querySelector("#wms-status").textContent =
    "A WMS image failed to load. Inspect Network, or turn off the boundaries layer.";
});

const button = document.querySelector("#load-observations");
const status = document.querySelector("#status");
let observationLayer = null; // Remember the previous result so a new request replaces it.

// This example accepts Point geometries in WGS 84 only: [longitude, latitude].
// Check external data before passing it to Leaflet; never coerce text to coordinates.
function isValidPoint(feature) {
  const c = feature?.geometry?.coordinates;
  return feature?.type === "Feature" && feature.geometry?.type === "Point" &&
    Array.isArray(c) && c.length >= 2 &&
    Number.isFinite(c[0]) && Number.isFinite(c[1]) &&
    Math.abs(c[0]) <= 180 && Math.abs(c[1]) <= 90;
}

async function loadObservations() {
  button.disabled = true; // Prevent overlapping requests from repeated clicks.
  status.textContent = "Requesting demo features…";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    // This is one page of data. limit=5 does not mean the collection has only five records.
    // f=json is this provider's format parameter. Follow its documentation and links.
    const response = await fetch("https://demo.pygeoapi.io/master/collections/obs/items?f=json&limit=5", {
      signal: controller.signal
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data?.type !== "FeatureCollection" || !Array.isArray(data.features) ||
        !data.features.every(isValidPoint)) {
      throw new Error("Expected a FeatureCollection of valid WGS 84 points");
    }
    const nextLayer = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const label = document.createElement("p");
        // Source text is data, never HTML. Nullish coalescing (??) supplies missing labels.
        label.textContent = `Demo record ${feature.id ?? "unknown"}; date: ${feature.properties?.datetime ?? "not supplied"}`;
        layer.bindPopup(label);
      }
    });
    // Replace only after a successful response. A failed refresh keeps the last result.
    if (observationLayer) map.removeLayer(observationLayer);
    observationLayer = nextLayer.addTo(map);
    if (observationLayer.getBounds().isValid()) map.fitBounds(observationLayer.getBounds(), { maxZoom: 10, padding: [20, 20] });
    status.textContent = `${data.features.length} demo features loaded from one response page. Click a point to inspect its attributes.`;
  } catch (error) {
    status.textContent = `Could not update demo features: ${error.message}. Any previous result remains visible.`;
    console.error(error); // Open the browser Console for details.
  } finally {
    clearTimeout(timeout); // Always restore the control, including after a failed request.
    button.disabled = false;
  }
}
button.addEventListener("click", loadObservations);
