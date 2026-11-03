// 1. Connect HTML elements and give a file path a name.
const loadButton = document.querySelector("#load-data");
const status = document.querySelector("#status");
const observations = document.querySelector("#observations");
// fetch resolves this path relative to the HTML page, not to this scripts folder.
const dataUrl = "data/places.geojson";

// 2. A function can take an input (feature) and return a value (our description).
// properties is an object. The dot reads one of its named fields.
function describeFeature(feature) {
  const properties = feature.properties;
  return properties.name + ": " + properties.observation +
    " Perspective: " + properties.perspective + ". Time: " + properties.time + ".";
}

// Leaflet calls this function once per feature, supplying two arguments.
function addPopup(feature, layer) {
  const popup = document.createElement("p");
  // The same safe text pattern as Lab 03; data is not interpreted as HTML.
  popup.textContent = describeFeature(feature);
  layer.bindPopup(popup);
}

// 3. Support checks for this lab's point-only file. Keep these while experimenting.
// Invalid input throws an error before we replace the existing observations.
function checkData(data) {
  if (!data || data.type !== "FeatureCollection" || !Array.isArray(data.features)) {
    throw new Error("Expected a GeoJSON FeatureCollection with a features array.");
  }
  data.features.forEach(function (feature) {
    if (!feature || feature.type !== "Feature" || !feature.geometry || feature.geometry.type !== "Point") {
      throw new Error("This lab expects Point Features.");
    }
    const coordinates = feature.geometry.coordinates;
    if (!Array.isArray(coordinates) || coordinates.length !== 2 ||
        !Number.isFinite(coordinates[0]) || !Number.isFinite(coordinates[1]) ||
        Math.abs(coordinates[0]) > 180 || Math.abs(coordinates[1]) > 90) {
      throw new Error("Use two numbers in [longitude, latitude] order, within valid degree ranges.");
    }
    const properties = feature.properties;
    if (!properties || typeof properties.name !== "string" || typeof properties.observation !== "string" ||
        typeof properties.perspective !== "string" || typeof properties.time !== "string") {
      throw new Error("Each point needs name, observation, perspective and time as text properties.");
    }
  });
}

// 4. The basemap setup is reused from Lab 03. L is supplied by Leaflet.
if (typeof L === "undefined") {
  status.textContent = "Leaflet did not load. Check your connection and script links, then reload.";
} else {
  const map = L.map("map").setView([47.0707, 15.4395], 14);
  const basemap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  basemap.on("tileerror", function () {
    document.querySelector("#basemap-status").textContent = "Some basemap images did not load. The local observations can still be loaded.";
  });

  // let allows reassignment: we will replace the loaded layer after another click.
  let placesLayer = null;

  // 5. async allows await. Waiting for the file does not freeze the whole page.
  async function loadPlaces() {
    loadButton.disabled = true;
    status.textContent = "Loading " + dataUrl + "...";
    try {
      const response = await fetch(dataUrl);
      // A completed request can still be HTTP 404. Check before reading the body.
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      checkData(data);
      console.log("Loaded GeoJSON:", data);

      // Leaflet reads GeoJSON's [longitude, latitude] order for us. Do not reverse it.
      const nextLayer = L.geoJSON(data, {
        // Give keyboard users a meaningful marker name. latlng is supplied by Leaflet.
        pointToLayer: function (feature, latlng) {
          return L.marker(latlng, { alt: feature.properties.name });
        },
        // Pass the function name here. Leaflet calls it for each feature later.
        onEachFeature: addPopup
      });

      // Replace the previous layer so repeated clicks do not accumulate markers.
      if (placesLayer) map.removeLayer(placesLayer);
      placesLayer = nextLayer.addTo(map);
      observations.replaceChildren();
      // forEach runs this function once for each item in the features array.
      data.features.forEach(function (feature) {
        const item = document.createElement("li");
        item.textContent = describeFeature(feature);
        observations.append(item);
      });
      // Empty data has no extent to fit. A valid empty collection can still load.
      if (data.features.length > 0) {
        map.fitBounds(placesLayer.getBounds(), { padding: [30, 30], maxZoom: 17 });
      }
      status.textContent = data.features.length + " fictional viewpoints loaded. Open a marker or read the list.";
    } catch (error) {
      status.textContent = "Could not load observations: " + error.message;
      console.error(error);
    } finally {
      // Runs after success or failure, so the visitor can try again.
      loadButton.disabled = false;
    }
  }

  // 6. Register the event. loadPlaces is a function reference, not loadPlaces().
  loadButton.disabled = false;
  loadButton.addEventListener("click", loadPlaces);
}
