# Lab 05: geodata over the web

[Course repository](https://github.com/thibaud-c/Graz_402.407)

Lab 04 loaded a small invented GeoJSON file. This lab asks **what our browser receives from different data sources and what our JavaScript can do with it**. The digital-geographies topic is **interoperability and control over access**. Standards help systems exchange information; providers still choose what to publish and which operations to allow.

## Start

Copy the entire folder into `practice/lab_05`. Open `index.html` with **Live Server** and keep the browser's Console and Network panel available. Students need no package installation or build step.

Internet access is needed for Leaflet, the two raster libraries, OpenStreetMap and the WMS. The GeoJSON and small GeoTIFF datasets are included locally.

```text
lab_05/
├── index.html             three Graz maps
├── scripts/
│   ├── geojson.js         one map, a file request and a loop over the fountains
│   ├── wms.js             one map and a WMS image layer
│   └── raster.js          one map, a GeoTIFF request and a colour rule
├── styles/style.css
└── data/
    ├── graz-fountains.geojson
    ├── graz-surface-height.tif
    └── README.md          source URLs, dates, licences and crop details
```

Read **one JavaScript file at a time**. Each file creates its own map and background, then connects its own button.

The GeoJSON and GeoTIFF downloads use the same short check:

```js
if (!response.ok) {
  throw new Error("HTTP " + response.status);
}
```

`response.ok` tells us whether the HTTP request succeeded. For example, a missing file returns 404. `throw` sends that problem to `catch`, which displays a message. The other `if` statements in `raster.js` choose colours; they are the rule we are studying.

### A. Predict the response

Before loading each source, fill the prediction column. Load one source at a time and inspect its Network request.

| Request | Your prediction | Observed response | What can our JS inspect? |
| --- | --- | --- | --- |
| `data/graz-fountains.geojson` | | | |
| WMS `GetMap` | | | |
| `data/graz-surface-height.tif` | | | |
| An OpenStreetMap XYZ tile | | | |

In Network, filter by `geojson`, `WMSServer`, `tif` or `openstreetmap` to find the relevant requests. Map display helpers may create additional local image or canvas elements; distinguish those from the downloaded source.

### B. Read and change feature data

1. Open `data/graz-fountains.geojson`. Find a Point's geometry and its `BRUNNENART`, `STRASSENNAME` and `HAUS_NR` properties. Follow the [original download URL](data/README.md) and identify the requested fields and coordinate system. The local file is a dated snapshot, not an automatically refreshed feed.
2. Find `loadFountains` in `scripts/geojson.js`. Trace the path from `fetch` to `response.ok`, `response.json` and `L.geoJSON`.
3. Find the `for...of` loop. What does one iteration visit? Find the lines that create its popup and its item in the text list. Predict the number of iterations from the file.
4. Change the popup description to put the fountain type before the street name. Change circle radius from 6 to 9. Predict the visual effect before reloading and loading the data again.
5. Press Load GeoJSON twice. Find `clearLayers()` and `replaceChildren()`. Explain why the markers and text records do not accumulate. The layer group is a container holding our fountain layers.
6. Temporarily change the local filename to a missing one. Observe the HTTP error and the restored button. Restore the correct filename before continuing.

`drawFountain` tells Leaflet to draw a circle. We pass its name without `()` because Leaflet calls it when reading each Point. Leaflet also converts GeoJSON's longitude/latitude order into the latitude/longitude position supplied to that function.

The textual record list is an alternative way to inspect the fountain information. A fountain point does not prove current water availability, accessibility or complete coverage of the city.

### C. Read a WMS request

1. Load WMS. Find the corresponding image requests and inspect one URL. Identify `SERVICE`, `REQUEST`, `LAYERS`, `VERSION`, `CRS`, `BBOX`, `WIDTH`, `HEIGHT` and `FORMAT`. Parameter names may be uppercase or lowercase.
2. Pan this map. Which part of a new request changes? The BBOX describes a different area. With EPSG:3857 its numbers are projected coordinates, not longitude and latitude in degrees.
3. In `scripts/wms.js`, find the endpoint and layer Name used to create `orthophoto`. Compare them with the provider's [GetCapabilities document](https://gis.stmk.gv.at/image/services/OGD_DOP/Flug_2022_2024_RGB/ImageServer/WMSServer?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0). Then find where `loadWms` adds the layer to the map.
4. Temporarily set WMS `opacity` to `0.5`. What changes? Why does this not change the underlying building heights or move a building inside the image?
5. Add a parameter to your WMS layer: `tileSize=64`. What changes? Open your browser's Network tab and inspect the request URL.
5. Add a parameter to your WMS layer: `bounds: [[47.07549, 15.4467], [47.08020, 15.4524]]`. Predict what changes before adding it. What is appening to your layer now? 
6. Explain why the fountain-popup loop cannot read individual buildings from this WMS picture. Some WMS layers support separate feature-information requests; this example does not implement them.

Leaflet requests WMS images in tiles. This does not turn the service into WMTS. Its requests still say WMS and GetMap. The background maps use a different XYZ URL pattern with zoom, x and y in the path.

## Short GeoTIFF extension

Load the small GeoTIFF. It contains surface-height values in metres, not preselected map colours. Read `heightColour` in `scripts/raster.js`.

1. Predict the colours for values 349, 350, 499 and 500.
2. Temporarily change the upper threshold from 500 to 450. Update the HTML legend to match your rule. Reload and load the raster again. Which areas change colour? Have the height values changed?
3. Find `response.arrayBuffer()`. Why would `response.json()` be inappropriate for this file?

### What are the raster libraries?

A **library** is reusable JavaScript code. A **Leaflet plugin** is a library that adds an ability to Leaflet. Our own `raster.js` uses two libraries loaded by the HTML:

| Script | What it does | Name used in our code |
| --- | --- | --- |
| GeoRaster | Reads the TIFF bytes, numbers and geographical information | `parseGeoraster(bytes)` |
| GeoRasterLayer for Leaflet | Draws the decoded raster as a Leaflet layer | `new GeoRasterLayer(...)` |

A **browser bundle** packages a library and the code it needs into one JavaScript file. It is program code, not another copy of our raster data. You do not need to read the long library files. Read our short `raster.js`.

This works with vanilla JavaScript: ordinary script tags and browser JavaScript, without a framework or build step. For this example we load **both** raster scripts: `parseGeoraster` comes from GeoRaster, while the Leaflet plugin draws the result. Leaflet alone does not decode our numeric GeoTIFF into this layer. The plugin saves us writing the positioning and drawing code ourselves.

`resolution: 64` controls drawing samples per tile; it does not mean the source has 64-metre cells. This is a whole-file download of the supplied small crop. A large remote COG needs a range-aware reader and suitable HTTP support for partial access.

References: [GeoRaster](https://github.com/GeoTIFF/georaster), [GeoRasterLayer for Leaflet](https://github.com/GeoTIFF/georaster-layer-for-leaflet).

## Discuss the digital geographies

- Which choices can you make after downloading features? Which remain with the WMS provider?
- Can the three sources answer whether someone can obtain drinking water in Graz right now? Name one missing piece of evidence.
- A common format makes exchange possible. Does it establish shared meaning, complete coverage or equal influence over the data?
- What stops working if a provider changes its URL, restricts access or stops maintaining a service? Which parts of our map do we control?

In `practice/lab_05/notes.txt`, keep the response table, one URL you inspected, one small code change and three sentences explaining a source decision, its benefit and one limitation. Distinguish an observed interface effect from a possible consequence for people or places.

## References

[Data provenance and licences](data/README.md), [Leaflet GeoJSON](https://leafletjs.com/examples/geojson/), [Leaflet WMS](https://leafletjs.com/examples/wms/wms.html), [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
