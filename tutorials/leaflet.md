# 8. Make your first Leaflet map

[Tutorial index](README.md) · Next: [Geographic data](geodata.md)

Allow 45 minutes. Copy `code_snippets/02_leaflet` into `practice/my_map`. Open its `index.html` with Live Server. You need internet access for Leaflet and the basemap tiles.

## Cheatsheet

| Code | Purpose |
| --- | --- |
| `L.map("map")` | Attach a map to the element with ID `map` |
| `.setView([47.07, 15.44], 13)` | Set latitude, longitude, zoom |
| `L.tileLayer(url, options)` | Request basemap images |
| `L.marker([47.07, 15.44])` | Create a marker |
| `.addTo(map)` | Put a layer on the map |
| `.bindPopup(content)` | Attach a popup |
| `map.on("click", handler)` | React to a map click |

## 1. Find the three pieces

Read the files before editing. `index.html` loads Leaflet's CSS, your CSS, Leaflet's JavaScript, then your script. The version is pinned to `1.9.4` so everyone uses the same API. The map is an HTML `div` with ID `map`; `style.css` gives it a height. Without a height there may be no visible map even when the script runs.

In `app.js`, the first statement creates the map. Its centre is in Graz. A tile layer adds images requested for the current zoom and location. Open the browser Network panel and pan the map to see the tile requests.

## 2. Change the view and add a marker

Change the initial zoom from 13 to 15 and save. Then add another marker using coordinates you checked:

```js
L.marker([47.0707, 15.4395]).addTo(map).bindPopup("A stop in Graz");
```

Leaflet's array order is **latitude, longitude**. Latitude describes north/south; longitude describes east/west. Both are degrees here. Swapping them can put your marker on another continent without producing an error.

## 3. Popups and events

A fixed string you wrote yourself is fine as a popup. For text from visitors or a remote dataset, create an element and set its text:

```js
const label = document.createElement("p");
label.textContent = "A visitor's observation";
L.marker([47.07, 15.44]).addTo(map).bindPopup(label);
```

The starter listens for clicks and writes their coordinates below the map. The event's `latlng` contains `.lat` and `.lng`. Notice how this reuses the callback pattern from the JavaScript guide.

## 4. Read the map critically

Zoom changes what is visible, not the precision of the source data. Web Mercator distorts area and distance. Do not treat a screen measurement or a difference in degrees as metres. Keep the OpenStreetMap attribution visible, and read the [tile usage policy](https://operations.osmfoundation.org/policies/tiles/) before using the public tile service beyond a small class project.

A basemap provides context. It does not supply your research observations. Give your own points a source, date, and explanation.

Reference: [Leaflet quick start](https://leafletjs.com/examples/quick-start/) and [API reference](https://leafletjs.com/reference.html).

## Exercise: two places, one question

Add two markers relevant to one geographic question. Give each a popup explaining its relevance. Change the initial view so both are visible. Click elsewhere and read the coordinates shown below the map.

You are done when both markers appear in the intended city, the Console has no errors, and you can identify the lines responsible for the basemap, marker, and popup. Explain why a basemap tile is not the same as a point observation.
