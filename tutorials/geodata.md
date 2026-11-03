# 9. GeoJSON, coordinates, and map services

[Tutorial index](README.md) · Next: [Internet data](internet_data.md)

For the foundations of geometry, attributes, vector/raster, spatial analysis, and coordinate systems, start with [GIS 101](gis_101.md). This guide applies those concepts to GeoJSON and web maps.

Allow 45 minutes. Copy `code_snippets/03_geojson` into `practice/my_data_map` and serve its `index.html` with Live Server.

## Cheatsheet

| Term | Meaning |
| --- | --- |
| Geometry | Location and shape |
| Properties | Attributes describing a feature |
| Feature | Geometry plus properties |
| FeatureCollection | A collection of features |
| GeoJSON point coordinates | `[longitude, latitude]` in WGS 84 degrees |
| Leaflet marker coordinates | `[latitude, longitude]` |
| WMS | Service returning rendered map images |
| WMTS / XYZ tiles | Predefined tiled map images |
| Feature service | Service returning geographic objects and attributes |

## 1. Read a feature

Open `places.geojson` in the starter. Its invented observations are located around Graz. Each feature has this structure:

```json
{
  "type": "Feature",
  "properties": {"name": "Example stop", "category": "rest"},
  "geometry": {"type": "Point", "coordinates": [15.4395, 47.0707]}
}
```

JSON is a data format. Keys and strings use double quotes; trailing commas and comments are not allowed. GeoJSON adds conventions for geographic objects. A line is a list of coordinate positions; a polygon contains rings, each with a matching first and last position.

Leaflet's `L.geoJSON` handles GeoJSON coordinate order for you. Do not reverse every pair before passing it to `L.geoJSON`. Reverse only when manually constructing a Leaflet `[lat, lng]` array.

## 2. Follow the data into the map

Read `app.js` from top to bottom. `fetch` requests `places.geojson`; `response.json()` parses it; `L.geoJSON` turns its features into layers. The code makes popups with `textContent` and fits the view only when the layer has valid bounds.

Change one property, save, and reload. Change one longitude slightly and watch the point move. A syntax error in JSON or a wrong filename should produce a visible message and a Console error. Restore the file after testing.

When exporting from desktop GIS, transform coordinates to WGS 84 longitude/latitude for GeoJSON. Metre coordinates from a local projected CRS cannot simply be renamed latitude and longitude. Check a known place and the dataset's metadata.

## 3. Data versus a picture of data

Last year's class used both features and a WMS service. They solve different problems. `L.tileLayer.wms` requests rendered images. You cannot loop over their pixels as if they were GeoJSON features, and attribute queries require separate service support.

To add a WMS layer, first inspect the provider's `GetCapabilities` document for the URL, layer name, supported version, and attribution. The following is a pattern only; the capitalised strings are placeholders, not working endpoints:

```js
L.tileLayer.wms("PROVIDER_WMS_URL", {
  layers: "EXACT_LAYER_NAME",
  format: "image/png",
  transparent: true,
  attribution: "Provider credit"
}).addTo(map);
```

For records you can filter and inspect, look for GeoJSON, an OGC API Features endpoint, or a documented feature service. CSV can hold coordinates too, but needs column definitions and a proper CSV parser. Splitting on commas breaks quoted text. You do not need a CSV library for these GeoJSON exercises.

References: [GeoJSON standard](https://www.rfc-editor.org/rfc/rfc7946), [Leaflet GeoJSON](https://leafletjs.com/examples/geojson/), [Leaflet WMS](https://leafletjs.com/examples/wms/wms.html).

For a real mixed-geometry file, try [Graz district polygons](../code_snippets/09_polygon_data/). It filters out label points before drawing polygons and preserves the export date and OpenStreetMap attribution. Continue with [OGC web services](ogc_webservices.md) for service discovery and the difference between WMS images and API features.

## Connection to digital geographies

A dataset's fields and geometries decide which parts of a place can be recorded. A point with `category: "rest"` cannot capture every reason someone feels welcome or unwelcome there. Missing points may reflect missing contributors, restrictive categories, or uneven access to mapping tools rather than an absence of activity.

Read [Elwood, Goodchild and Sui, 2012](https://doi.org/10.1080/00045608.2011.595657) on geographic information as both data and social practice. Apply it to the sample GeoJSON: who chose the categories, whose knowledge could fit them, and what would be lost when converting a spoken account into one point? Record provenance, uncertainty, and missingness alongside coordinates.

## Exercise: add an observation

Add a fourth fictional point with `name` and `category`. Keep the JSON valid. Reload and check its popup and location. Then make the collection empty with `"features": []` and inspect the page's message. Restore your four points.

You are done when all four display and the empty case does not crash. Write down the coordinate order for GeoJSON and for `L.marker`, plus one reason a map image cannot replace feature data in an analysis.
