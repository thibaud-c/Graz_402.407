// 1. Create a separate map, with the same starting position as the GeoJSON map.
const wmsMap = L.map("map-wms", { scrollWheelZoom: false }).setView([47.075, 15.438], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(wmsMap);

const wmsButton = document.querySelector("#load-wms");
const wmsStatus = document.querySelector("#wms-status");

// 2. Describe the WMS layer. Creating it does not add it to the map yet.
// The server draws images. We do not fetch a JSON array or loop over buildings.
const orthophoto = L.tileLayer.wms(
  "https://gis.stmk.gv.at/image/services/OGD_DOP/Flug_2022_2024_RGB/ImageServer/WMSServer", {
    layers: "Flug_2022_2024_RGB", // The Name from the provider's GetCapabilities.
    version: "1.3.0",
    format: "image/png",
    transparent: false,
    opacity: 1,
    attribution: '<a href="https://data.steiermark.at/cms/beitrag/11781336/95633648">CC BY 4.0 Land Steiermark</a>'
  }
);

// 3. The click adds that layer. Leaflet builds the image requests for this view.
function loadWms() {
  orthophoto.addTo(wmsMap);
  wmsStatus.textContent = "WMS layer added. Pan to request images from the 2022–2024 flight period.";
}

// If an image request fails, give one readable message.
orthophoto.on("tileerror", function () {
  wmsStatus.textContent = "A WMS image could not load. Inspect the request in Network.";
});

wmsButton.addEventListener("click", loadWms);
