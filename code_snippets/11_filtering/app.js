// START HERE: an array holds six objects. Every observation below is invented.
// Leaflet uses [latitude, longitude]. This is not GeoJSON's coordinate order.
const places = [
  { name: "Stop A", category: "seating", group: "Campus group", lat: 47.0707, lng: 15.4395 },
  { name: "Stop B", category: "seating", group: "Campus group", lat: 47.0780, lng: 15.4490 },
  { name: "Stop C", category: "quiet", group: "Campus group", lat: 47.0820, lng: 15.4430 },
  { name: "Stop D", category: "shade", group: "Neighbourhood group", lat: 47.0650, lng: 15.4340 },
  { name: "Stop E", category: "shade", group: "Neighbourhood group", lat: 47.0700, lng: 15.4240 },
  { name: "Stop F", category: "quiet", group: "Neighbourhood group", lat: 47.0880, lng: 15.4300 }
];

// These variables refer to HTML elements, which supply values and display results.
const groupControl = document.querySelector("#group");
const categoryControl = document.querySelector("#category");
const namesControl = document.querySelector("#names");
const basemapControl = document.querySelector("#basemap");
const list = document.querySelector("#places");
const status = document.querySelector("#status");
const message = document.querySelector("#map-message");
const startView = [47.0755, 15.4370];
const startZoom = 13;
let map = null;
let markers = null;
let basemap = null;

// If the external library fails to load, the controls and text list still work.
if (typeof L !== "undefined") {
  map = L.map("map").setView(startView, startZoom);
  basemap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  // A layer group lets us remove the old points before drawing the next selection.
  markers = L.layerGroup().addTo(map);
  basemap.on("tileerror", function () {
    message.textContent = "Some basemap images did not load. Check your connection and reload. The observation list still works.";
  });
} else {
  message.textContent = "The map library did not load. Check your connection and reload. You can still filter the text list.";
  namesControl.disabled = true;
  basemapControl.disabled = true;
}

// filter creates a new array; it does not delete records from the original places.
function filterPlaces(group, category) {
  return places.filter(function (place) {
    const matchesGroup = group === "all" || place.group === group;
    const matchesCategory = category === "all" || place.category === category;
    return matchesGroup && matchesCategory;
  });
}

function renderPlaces() {
  const visible = filterPlaces(groupControl.value, categoryControl.value);
  list.replaceChildren();
  if (markers) markers.clearLayers();
  status.textContent = `${visible.length} of ${places.length} invented observations visible. Hidden records have not been deleted.`;

  if (visible.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No matching records in this demo. This does not establish an absence of the feature in the city.";
    list.append(empty);
  }

  // This callback runs once for each matching observation.
  visible.forEach(function (place) {
    const item = document.createElement("li");
    item.dataset.category = place.category; // The CSS shade rule reads this attribute.
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = place.name;
    button.disabled = !map;
    const note = document.createElement("p");
    note.textContent = `${place.category} · ${place.group} · invented`;
    item.append(button, note);
    list.append(item);

    if (map) {
      const popup = document.createElement("p");
      // textContent shows data as text, without interpreting it as HTML.
      popup.textContent = `${place.name}: ${place.category}. ${place.group}. Invented observation.`;
      const marker = L.circleMarker([place.lat, place.lng], {
        radius: 9, color: "#005f73", fillColor: "#005f73", fillOpacity: 0.8, weight: 2
      }).addTo(markers).bindPopup(popup);
      if (namesControl.checked) {
        const label = document.createElement("span");
        label.textContent = place.name;
        marker.bindTooltip(label, { permanent: true, direction: "top", className: "place-label" });
      }
      // The list offers a keyboard-accessible way to select the same observations.
      button.addEventListener("click", function () {
        map.setView([place.lat, place.lng], 15);
        marker.openPopup();
      });
    }
  });
}

function updateBasemap() {
  if (!map) return;
  if (basemapControl.checked) basemap.addTo(map);
  else map.removeLayer(basemap);
}

// Pass a function to the listener. The browser runs it when the control changes.
groupControl.addEventListener("change", renderPlaces);
categoryControl.addEventListener("change", renderPlaces);
namesControl.addEventListener("change", renderPlaces);
basemapControl.addEventListener("change", updateBasemap);
document.querySelector("#reset-experiment").addEventListener("click", function () {
  document.querySelector("#controls").reset();
  updateBasemap();
  renderPlaces();
  if (map) map.setView(startView, startZoom);
});

// Defining a function does not run it. This call draws the first set of results.
renderPlaces();
