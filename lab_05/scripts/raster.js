// 1. This file creates its own map. It does not depend on the other map scripts.
const rasterMap = L.map("map-raster", { scrollWheelZoom: false }).setView([47.075, 15.438], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(rasterMap);

const rasterButton = document.querySelector("#load-raster");
const rasterStatus = document.querySelector("#raster-status");
const rasterLayers = L.layerGroup().addTo(rasterMap);

// 2. Our colour rule. This supplied file has one band containing height in metres.
// GeoRasterLayer supplies an array of band values; [0] reads its first value.
function heightColour(values) {
  const height = values[0];
  if (height < 350) {
    return "#c6e8c3";
  } else if (height < 500) {
    return "#74a9cf";
  } else {
    return "#7a5195";
  }
}

// 3. Read the file, decode it, and add a layer when the button is clicked.
async function loadRaster() {
  rasterButton.disabled = true;
  rasterStatus.textContent = "Loading the small GeoTIFF…";
  try {
    const response = await fetch("data/graz-surface-height.tif");
    // Same download test as in geojson.js. The colour tests above have another purpose.
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    // TIFF is binary, so read bytes with arrayBuffer(), rather than JSON text.
    const bytes = await response.arrayBuffer();
    // GeoRaster is a library: parseGeoraster decodes the bytes and their map position.
    // shortcut: read this small crop in full; use a range-aware reader for large COGs.
    const raster = await parseGeoraster(bytes);
    // GeoRasterLayer is a Leaflet plugin. It draws the decoded values on our map.
    const heightLayer = new GeoRasterLayer({
      georaster: raster,
      pixelValuesToColorFn: heightColour,
      opacity: 0.65,
      resolution: 64, // Drawing samples per tile, not the source's metre resolution.
      attribution: "Copernicus GLO-30, cropped"
    });
    rasterLayers.clearLayers(); // Replace the old result when we load again.
    heightLayer.addTo(rasterLayers);
    rasterStatus.textContent = raster.width + " × " + raster.height +
      " cells loaded. Our JavaScript chooses their colours.";
  } catch (error) {
    rasterStatus.textContent = "Could not load the GeoTIFF: " + error.message;
  }
  rasterButton.disabled = false;
}

rasterButton.addEventListener("click", loadRaster);
