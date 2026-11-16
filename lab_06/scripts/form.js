const dialog = document.querySelector("#idea-dialog");
const form = document.querySelector("#idea-form");
const recordStatus = document.querySelector("#record-status");
const ideaList = document.querySelector("#ideas");

// Like Lab 05, we use GeoJSON. This time our form creates the features.
// shortcut: this collection lives only in this tab; central collection needs a backend.
const collection = { type: "FeatureCollection", features: [] };

document.querySelector("#open-form").addEventListener("click", function () {
  dialog.showModal(); // Native HTML dialog: the browser handles focus and Escape.
});
document.querySelector("#cancel-form").addEventListener("click", function () {
  dialog.close(); // Closing does not add a feature. Unsaved field values remain.
});

// A submit event covers both the Save button and keyboard submission.
// HTML required/min/max checks run before the browser sends this event.
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Keep the page open instead of sending a normal HTML form.
  const latitude = Number(latitudeInput.value); // Input values begin as text.
  const longitude = Number(longitudeInput.value);
  const idea = document.querySelector("#idea-type").value;
  const comment = document.querySelector("#comment").value;

  // GeoJSON uses [longitude, latitude]. Leaflet normally uses the reverse order.
  const feature = {
    type: "Feature",
    geometry: { type: "Point", coordinates: [longitude, latitude] },
    properties: { idea: idea, comment: comment }
  };
  collection.features.push(feature); // Append one record to our array in memory.

  const label = document.createElement("p");
  label.textContent = idea + ": " + comment; // Treat what people type as text, not HTML.
  L.geoJSON(feature).bindPopup(label).addTo(map);

  const item = document.createElement("li");
  item.textContent = idea + " at " + latitude + ", " + longitude + ": " + comment;
  ideaList.append(item); // A text list makes the records available outside the map.
  recordStatus.textContent = "Ideas saved in this browser tab: " + collection.features.length +
    ". Download before leaving.";

  form.reset(); // Clear the old fields so the next record needs a new location.
  draftLayers.clearLayers();
  locationStatus.textContent = "Idea saved in this tab. Select a location for the next idea.";
  dialog.close();
});
