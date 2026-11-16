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

// These selectors connect the script to the labelled fields and feedback in HTML.
const form = document.querySelector("#observation-form");
const status = document.querySelector("#status");
const list = document.querySelector("#observations");
const latitude = document.querySelector("#latitude");
const longitude = document.querySelector("#longitude");
// A GeoJSON collection is an object containing an array of features.
// It lives in memory. It is not automatically written to a file or server.
const collection = { type: "FeatureCollection", features: [] };
// This temporary target is separate from saved observation markers.
let selection = null;
const selectionStatus = document.querySelector("#selection-status");
// DivIcon makes an icon from CSS. Its centre is the clicked geographic position.
const targetIcon = L.divIcon({
  className: "selection-target",
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Clicking only selects a candidate location. The submit handler records it later.
map.on("click", function (event) {
  // Leaflet supplies an object with lat/lng properties. wrap keeps longitude
  // in the usual -180 to 180 range; toFixed returns text for the form fields.
  latitude.value = event.latlng.lat.toFixed(6);
  longitude.value = event.latlng.wrap().lng.toFixed(6);
  // Remove the previous target so only the latest click remains highlighted.
  if (selection) map.removeLayer(selection);
  // Use our CSS target instead of the default pin. It must not intercept map clicks.
  selection = L.marker([Number(latitude.value), Number(longitude.value)], {
    icon: targetIcon, interactive: false, keyboard: false
  }).addTo(map);
  selectionStatus.textContent = `Selected latitude ${latitude.value}, longitude ${longitude.value}. This point has not been added yet.`;
});

// Typing is an alternative to clicking. Hide the old target when fields change,
// otherwise the symbol could show a different location from the typed coordinates.
for (const input of [latitude, longitude]) {
  input.addEventListener("input", function () {
    if (selection) { map.removeLayer(selection); selection = null; }
    selectionStatus.textContent = "Coordinates edited manually. Check both fields before adding.";
  });
}

// A form submit event covers both the button and keyboard submission.
form.addEventListener("submit", function (event) {
  // Prevent the normal form submission from navigating away and losing memory.
  event.preventDefault();
  // Ask the browser to show its required/range validation feedback.
  if (!form.reportValidity()) return;
  // Read text before converting it: Number("") is 0, which is not a missing value.
  const latText = latitude.value.trim();
  const lngText = longitude.value.trim();
  const lat = Number(latText);
  const lng = Number(lngText);
  const category = document.querySelector("#category").value;
  const comment = document.querySelector("#comment").value.trim();
  // Also validate in code. Check consent, non-empty coordinates, finite values,
  // allowed ranges/categories, and comment length before creating a record.
  if (!document.querySelector("#consent").checked || !latText || !lngText ||
      !Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180 ||
      !["seating", "shade", "quiet"].includes(category) || comment.length > 200) {
    status.textContent = "Check consent, coordinates, category, and comment length.";
    return;
  }
  // GeoJSON stores [longitude, latitude], the reverse of Leaflet marker arrays.
  // Properties carry the answer; geometry carries its geographic position.
  const feature = {
    type: "Feature",
    properties: { category, comment },
    geometry: { type: "Point", coordinates: [lng, lat] }
  };
  // push appends one feature to the in-memory array.
  collection.features.push(feature);
  // Use DOM elements and textContent so participant text cannot become HTML.
  const label = document.createElement("p");
  label.textContent = `${category}: ${comment || "No comment"}`;
  const marker = L.marker([lat, lng]).addTo(map).bindPopup(label);
  // Provide a text list alongside the map, with a removal control for each record.
  const item = document.createElement("li");
  const text = document.createElement("span");
  text.textContent = `${category} at ${lat}, ${lng}: ${comment || "No comment"} `;
  const remove = document.createElement("button");
  // A plain button should not accidentally submit the observation form.
  remove.type = "button";
  remove.textContent = "Remove";
  remove.setAttribute("aria-label", `Remove ${category} observation at ${lat}, ${lng}`);
  // Keep the data array, map marker, and visible list in sync when removing a record.
  remove.addEventListener("click", function () {
    // Find this exact feature in the array, then remove one item at that position.
    collection.features.splice(collection.features.indexOf(feature), 1);
    map.removeLayer(marker);
    item.remove();
    status.textContent = `${collection.features.length} observations remain. Download again if you need the revised file.`;
    // The removed button no longer exists; move keyboard focus to a remaining control.
    document.querySelector("#download").focus();
  });
  // Attach the newly created elements to the page so visitors can see them.
  item.append(text, remove);
  list.append(item);
  // After recording, clear the candidate target and coordinates for the next entry.
  // Keep consent and category, which may apply to another point in this session.
  if (selection) { map.removeLayer(selection); selection = null; }
  selectionStatus.textContent = "Observation added. Select another location to continue.";
  latitude.value = "";
  longitude.value = "";
  document.querySelector("#comment").value = "";
  status.textContent = `${collection.features.length} observations in memory. Download before leaving.`;
});

// ponytail: one session in memory; use an approved backend if central remote collection is required.
// Export is a separate action from selecting or adding a point.
document.querySelector("#download").addEventListener("click", function () {
  // Avoid downloading an empty file when nothing has been recorded.
  if (collection.features.length === 0) {
    status.textContent = "Add an observation before downloading.";
    return;
  }
  // JSON.stringify creates text; null, 2 adds indentation to make the file readable.
  // Blob holds those bytes as a file-like object in the browser.
  const blob = new Blob([JSON.stringify(collection, null, 2)], { type: "application/geo+json" });
  // Create a temporary local URL for the bytes, not a public web address.
  const url = URL.createObjectURL(blob);
  // An anchor with download asks the browser to save the bytes with this filename.
  const link = document.createElement("a");
  link.href = url;
  link.download = `participant_data_${Date.now()}.geojson`;
  document.body.append(link);
  // Trigger the normal download action, then remove the temporary link.
  link.click();
  link.remove();
  // Release the temporary URL after the browser has had time to start the download.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  // A requested download is not proof of a saved file. Keep the observations intact.
  status.textContent = "Download requested. Check your Downloads folder and open the file before leaving. Points remain here.";
});
// Request an exit warning if records remain. Some browsers suppress it,
// so it is only a reminder, not a storage or backup mechanism.
window.addEventListener("beforeunload", function (event) {
  if (collection.features.length > 0) {
    event.preventDefault();
    event.returnValue = "";
  }
});
