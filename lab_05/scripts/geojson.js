// 1. Create this map. The other two files create their own maps in the same way.
const geojsonMap = L.map("map-geojson", { scrollWheelZoom: false }).setView([47.075, 15.438], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(geojsonMap);

const geojsonButton = document.querySelector("#load-geojson");
const geojsonStatus = document.querySelector("#geojson-status");
const fountainList = document.querySelector("#fountain-list");
// A group collects our fountain layers so we can clear them before loading again.
const fountainLayers = L.layerGroup().addTo(geojsonMap);

// Leaflet supplies the feature and its converted [latitude, longitude] position.
// This function tells it to draw a circle instead of the default marker icon.
function drawFountain(feature, latlng) {
  return L.circleMarker(latlng, { radius: 6, color: "#005a73", fillOpacity: 0.7 });
}

// 2. Define the button's action. Defining a function does not run it yet.
async function loadFountains() {
  geojsonButton.disabled = true;
  geojsonStatus.textContent = "Loading the downloaded GeoJSON…";
  try {
    // await waits for a result. This path starts from index.html, not this JS file.
    const response = await fetch("data/graz-fountains.geojson");
    // Our one download test: a missing file gives an HTTP error such as 404.
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    const data = await response.json(); // Read JSON text as objects and arrays.

    fountainLayers.clearLayers();
    fountainList.replaceChildren();
    // 3. Visit every Feature in the array. The same lines work for each fountain.
    for (const feature of data.features) {
      const description = feature.properties.STRASSENNAME + ": " + feature.properties.BRUNNENART;
      const popup = document.createElement("p");
      popup.textContent = description; // Display the provider's words as safe text.

      // L.geoJSON reads this feature's geometry. drawFountain chooses its symbol.
      const fountain = L.geoJSON(feature, { pointToLayer: drawFountain });
      fountain.bindPopup(popup);
      fountain.addTo(fountainLayers);

      const item = document.createElement("li");
      item.textContent = description;
      fountainList.append(item);
    }
    geojsonStatus.textContent = data.features.length + " fountain records loaded from the saved file.";
  } catch (error) {
    // A failed request or unreadable file comes here, instead of stopping the page.
    geojsonStatus.textContent = "Could not load the GeoJSON: " + error.message;
  }
  geojsonButton.disabled = false; // Allow another try after success or failure.
}

// 4. Give the function to the button. The click runs it later.
geojsonButton.addEventListener("click", loadFountains);
