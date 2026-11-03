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

// Use a world view for a global feed rather than the initial Graz extent.
map.setView([20, 0], 2);
// Keep references to the select, button, checkbox, and feedback element in HTML.
const source = document.querySelector("#source");
const refresh = document.querySelector("#refresh");
const automatic = document.querySelector("#automatic");
const status = document.querySelector("#status");
// Remember the displayed layer so a refresh can replace it instead of duplicating it.
let layer = null;
// Remember the next scheduled refresh so it can be cancelled.
let timer;

// One request cycle: choose a URL, read data, build a layer, then update feedback.
async function update() {
  // Cancel a scheduled refresh and prevent another manual request during this one.
  clearTimeout(timer);
  refresh.disabled = true;
  source.disabled = true;
  // The select value chooses either a real feed or a clearly labelled fictional file.
  const live = source.value === "live";
  const url = live
    ? "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    : "demo.geojson";
  status.textContent = "Loading...";
  // Abort a slow request after 15 seconds so the controls do not remain disabled.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    // await waits for the response; it does not block the rest of the browser.
    const response = await fetch(url, { signal: controller.signal });
    // HTTP failure codes need an explicit check, including 404 and 429.
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    // Convert JSON text into objects; check its structure before reading features.
    const data = await response.json();
    if (data.type !== "FeatureCollection" || !Array.isArray(data.features)) {
      throw new Error("Expected a GeoJSON FeatureCollection");
    }
    // Validate the point schema this example understands before replacing the old layer.
    for (const feature of data.features) {
      // Optional chaining returns undefined if geometry is missing.
      // The checks below require finite longitude/latitude values in their allowed ranges.
      const c = feature.geometry?.coordinates;
      if (feature.type !== "Feature" || feature.geometry?.type !== "Point" ||
          !Array.isArray(c) || !Number.isFinite(c[0]) || !Number.isFinite(c[1]) ||
          Math.abs(c[0]) > 180 || Math.abs(c[1]) > 90) {
        throw new Error("The feed contains an invalid point");
      }
    }
    // Build the replacement before removing the previous successful result.
    const nextLayer = L.geoJSON(data, {
      // Use small circles instead of default pin icons for earthquake events.
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, { radius: 6 });
      },
      onEachFeature: function (feature, marker) {
        const label = document.createElement("p");
        // Use text, not HTML, for remote labels. ?? handles missing place/magnitude values.
        label.textContent = `${feature.properties?.place ?? "Unknown place"}; magnitude ${feature.properties?.mag ?? "unknown"}`;
        marker.bindPopup(label);
      }
    });
    // Replace the old layer only after the new one was constructed successfully.
    if (layer) map.removeLayer(layer);
    layer = nextLayer.addTo(map);
    // Distinguish live and invented data and show when this request was read.
    status.textContent = `${live ? "USGS feed" : "FICTIONAL DEMO"}: ${data.features.length} events. Retrieved ${new Date().toLocaleString()}.`;
  // A failed update leaves the last successful map visible and stops automatic polling.
  } catch (error) {
    automatic.checked = false;
    status.textContent = `Update failed: ${error.message}. Automatic refresh stopped. Any previous map data has not been updated. Try the local demo or check Network.`;
    console.error(error);
  // This block runs after success or failure. Always re-enable the controls.
  } finally {
    clearTimeout(timeout);
    refresh.disabled = false;
    source.disabled = false;
    // Schedule after completion to avoid overlapping requests. This is polling, not SSE.
    if (automatic.checked) timer = setTimeout(update, 60000);
  }
}
// A button click calls update. Passing its name does not call it during setup.
refresh.addEventListener("click", update);
// Checking starts updates; unchecking cancels the next scheduled request.
// An already-running request can still finish.
automatic.addEventListener("change", function () {
  clearTimeout(timer);
  if (automatic.checked && !refresh.disabled) update();
});
// Changing the source stops automatic updates and asks for a deliberate reload.
source.addEventListener("change", function () {
  clearTimeout(timer);
  automatic.checked = false;
  status.textContent = "Source changed. Click Load to replace the displayed data.";
});
