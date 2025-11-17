// Load the GeoJSON data
const GEOJSON_FILE = "data/graz_district.geojson";

async function addGeoJsonData() {

    const response = await fetch(GEOJSON_FILE);

    if (!response.ok) {
        throw new Error("loading file failed");
    }

    let geojsonData = await response.json();
    console.log(geojsonData);
    L.geoJSON(geojsonData, { filter: filterGeometry }).addTo(map);
}

function filterGeometry(feature) {
    return (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon");
}