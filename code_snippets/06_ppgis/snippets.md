# PPGIS helper snippets: click, coordinates, target

[PPGIS guide](../../tutorials/ppgis.md) · [Snippet index](../README.md)

Try these pieces in a copy of [02_leaflet](../02_leaflet/) served with Live Server. They assume Leaflet is loaded and `map` already exists. They select a candidate location; they do not record a response, identify the visitor's device location, or send data anywhere.

## 1. Read a click's coordinates

The basic Leaflet snippet already contains this pattern. Edit its existing `map.on("click", ...)` handler rather than adding a duplicate. The existing HTML has `<p id="status" role="status">...</p>` below the map.

```js
map.on("click", function (event) {
  // latlng is an object supplied by Leaflet, not an array we have to guess.
  const position = event.latlng.wrap(); // Keep longitude between -180 and 180.
  document.querySelector("#status").textContent =
    `Latitude: ${position.lat.toFixed(6)}, longitude: ${position.lng.toFixed(6)}`;
});
```

Click two places and watch the values change. Six decimal places make the display consistent; they do not mean the click or underlying map is accurate to that precision.

## 2. Add a target at the selected point

Add this setup once, before that click handler in `app.js`:

```js
// This custom marker will use the CSS class below instead of a downloaded icon.
const targetIcon = L.divIcon({
  className: "selection-target",
  iconSize: [24, 24],
  iconAnchor: [12, 12] // Centre the 24px icon on the selected coordinate.
});
let target = null; // No candidate has been selected yet.
```

Add these lines **inside** the existing handler, after `position` is defined:

```js
if (target) map.removeLayer(target); // Keep only the latest candidate target.
target = L.marker(position, {
  icon: targetIcon, interactive: false, keyboard: false
}).addTo(map); // A non-interactive target does not intercept the next map click.
```

Add the following to `style.css`. Leaflet positions the icon; these rules draw its ring and crossing lines.

```css
#map { cursor: crosshair; }
.selection-target {
  box-sizing: border-box;
  border: 2px solid #8a3500;
  border-radius: 50%;
  background: rgb(255 255 255 / 80%);
  box-shadow: 0 0 0 2px white;
}
/* Pseudo-elements draw decoration without adding meaningful text to the HTML. */
.selection-target::before, .selection-target::after {
  content: ""; position: absolute; background: #8a3500;
}
.selection-target::before { width: 32px; height: 2px; left: -6px; top: 9px; }
.selection-target::after { width: 2px; height: 32px; left: 9px; top: -6px; }
```

Click twice. There should be one target at the last click, with matching coordinates in the feedback text. Pan and zoom: the target should stay at that geographic location, not at the centre of the screen. This is point selection, not GPS tracking.

## From selection to an observation

The optional [commented demo](app.js) shows the next pieces separately: labelled coordinate fields, a submit handler, a GeoJSON record, removal, and download. Its [HTML](index.html) includes numeric fields so people can enter coordinates without clicking. When they edit those fields, it removes the old target to avoid contradictory feedback.

GeoJSON records store `[longitude, latitude]`. Keep the array order explicit when moving from a Leaflet click to a feature. Selecting a point alone must not imply that a response was saved or submitted.

## Check the target logic

With Node available, maintainers can run `node code_snippets/06_ppgis/check.cjs` from the course root. It checks click coordinates, target replacement, and manual-entry cleanup with small test doubles. Students can use the click/pan/zoom checks above without installing Node.
