// Load a WMTS layer
const WMTS_URL = "https://gis.stmk.gv.at/arcgis/services/OGD/flaewi/MapServer/WMSServer";

async function addWMTSData() {
    let wmtsLayer = L.tileLayer.wms(WMTS_URL, {
        layers: "Flaechenwidmung_Aenderungen",
        format: "image/png",
        transparent: true,
    }).addTo(map);
}
