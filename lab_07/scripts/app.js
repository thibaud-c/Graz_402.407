const picker = document.querySelector("#division-picker");
let features = []; // The same array will be used for both views.

function showDivision() {
  // Read the selected HTML radio button. Its value matches a GeoJSON field.
  const field = document.querySelector("input[name='division']:checked").value;
  const division = divisions[field];
  const labels = division.labels;

  const firstCount = countInZone(features, field, labels[0]);
  const secondCount = countInZone(features, field, labels[1]);
  showCounts(labels, [firstCount, secondCount]);
  divider.setLatLngs(division.line); // Move just the line. The circles stay put.
}

async function startLab() {
  try {
    const response = await fetch("data/seating.geojson");
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    const collection = await response.json();
    features = collection.features;
    // Draw the points once. Switching zones never downloads them again.
    L.geoJSON(collection, { pointToLayer: drawRequest }).addTo(map);
    showDivision();
    picker.disabled = false;
  } catch (error) {
    document.querySelector("#counts").textContent =
      "Could not start the lab. Check the GeoJSON file and open the page with Live Server. " + error.message;
  }
}

picker.addEventListener("change", showDivision);
startLab();
