# Story-map helper snippets

[Story-map guide](../../tutorials/story_map.md) · [Snippet index](../README.md)

These are small pieces to try in a copy of [02_leaflet](../02_leaflet/). Open its `index.html` with Live Server. Keep its Leaflet imports, map container, CSS height, and map setup. The snippets below go after `const map = ...` and the basemap setup in its `app.js`; they are not a complete website.

## 1. Connect a story section to the map

Add this inside the HTML `main`, outside the map's `div`:

```html
<section>
  <h2>A break near the square</h2>
  <p>What places to rest can you find near Hauptplatz?</p>
  <!-- A unique ID connects this button to the JavaScript below. -->
  <button id="show-square" type="button">Show the square</button>
</section>
```

Add this to `app.js`:

```js
// Register the action now; the callback runs only when the button is clicked.
document.querySelector("#show-square").addEventListener("click", function () {
  map.setView([47.0707, 15.4395], 16); // Latitude, longitude, then zoom.
});
```

Click and confirm that the view changes. This interaction changes the map's focus; it does not establish a factual claim about the place. Keep evidence and sources in the narrative.

## 2. Keep a stop's attributes together

This independent snippet creates a marker for one stop. It works without the button above.

```js
// An object keeps the place name and its location together.
const stop = { name: "Near Hauptplatz", coordinates: [47.0707, 15.4395] };
const label = document.createElement("p");
label.textContent = stop.name; // Treat the name as text, even if it contains < or >.
const stopMarker = L.marker(stop.coordinates).addTo(map);
stopMarker.bindPopup(label); // The visitor opens it by clicking the marker.
```

To connect both helpers, place this marker setup before the button handler and add `stopMarker.openPopup();` inside the handler after `setView`. Avoid adding the setup twice, which would redeclare its `const` names.

For several stops, see how the [commented demonstration](app.js) puts objects in an array and loops over them. Its [HTML](index.html) and [CSS](style.css) show the corresponding buttons and layout.
