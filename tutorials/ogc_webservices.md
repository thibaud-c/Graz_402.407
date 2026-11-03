# 11. OGC web services: ask for images or features

[Tutorial index](README.md) · Next: [Story maps](story_map.md)

Allow 60 minutes. Complete Leaflet, GeoJSON, and the internet data tutorial first. Copy [10_ogc_services](../code_snippets/10_ogc_services/) into `practice/ogc_services`, open `index.html` with Live Server, and open the browser's **Network** panel.

## 1. Why do standards matter?

A city, a researcher, and a mapping app may use different software. Standards describe shared ways to request geographic information so these systems can exchange it. The **Open Geospatial Consortium (OGC)** develops many of these standards. A standard defines an interface; it does not guarantee that a dataset is complete, free to reuse, or up to date.

An endpoint is the URL where a service receives requests. A dataset can be offered through several endpoints, each serving a different purpose. “Available online” does not necessarily mean you can download the underlying features.

| Service | What you usually receive | When it helps |
| --- | --- | --- |
| **WMS** — Web Map Service | A map image rendered by the server for a requested area | Display the provider's cartography, such as a zoning map |
| **WMTS** — Web Map Tile Service | Predefined map tiles, addressed within tile matrix sets | Browse a tiled map efficiently |
| **WFS** — Web Feature Service | Geographic features and their attributes; supported formats vary | Retrieve geometries to inspect or analyse |
| **OGC API – Features** | Discoverable collections and feature resources, commonly available as GeoJSON | Request a page of features using web links and HTTP |
| **WCS** — Web Coverage Service | Coverage data, such as raster elevation or temperature values | Work with values across space rather than a styled picture |

An ordinary `{z}/{x}/{y}.png` tile URL is an **XYZ** convention. It is not automatically WMTS. `L.tileLayer.wms` is a WMS client even though Leaflet requests its images in a tiled layout. The course examples use WMS and OGC API – Features; you only need to recognise the other services here.

Official introductions: [WMS](https://www.ogc.org/standards/wms/), [WMTS](https://www.ogc.org/standards/wmts/), [WFS](https://www.ogc.org/standards/wfs/), [OGC API – Features](https://ogcapi.ogc.org/features/), and [WCS](https://www.ogc.org/standards/wcs/).

## 2. Discover a WMS before drawing it

Open the [MapServer demo's GetCapabilities document](https://demo.mapserver.org/cgi-bin/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities). Your browser may display XML or offer a download; open a downloaded document in VS Code.

The query string has three instructions:

```text
SERVICE=WMS           use the WMS interface
VERSION=1.1.1         use this version's request rules
REQUEST=GetCapabilities  describe the service
```

XML is a structured text format with tags. In this document, search for `country_bounds`. Read the layer's **Name**, **Title**, coordinate systems (`SRS` in this WMS version), and any styles. A Title is a human-readable label; a Name is the identifier sent to the server. A layer can inherit coordinate systems from its parent Layer element. Also inspect `GetMap` for supported image formats.

The snippet uses that information:

```js
// Add this only to a page where Leaflet and a map already exist.
const boundaries = L.tileLayer.wms("https://demo.mapserver.org/cgi-bin/wms", {
  layers: "country_bounds", // Exact Name from GetCapabilities.
  format: "image/png",
  transparent: true,
  version: "1.1.1"
}).addTo(map);
```

Keep the source attribution shown in the complete [snippet](../code_snippets/10_ogc_services/app.js). These lines are a helper, not a second complete page. See [Leaflet's WMS tutorial](https://leafletjs.com/examples/wms/wms.html) for how WMS layers differ from other tile layers.

## 3. Inspect the image request

Reload the snippet with Network open and filter requests by `wms`. Select a request containing `GetMap`. Leaflet adds parameters including:

| Parameter | Meaning |
| --- | --- |
| `LAYERS` | Which named layers to render |
| `SRS` | Coordinate reference system for WMS 1.1.1 |
| `BBOX` | The geographic extent in that coordinate system |
| `WIDTH`, `HEIGHT` | Image size in pixels |
| `FORMAT` | For example, `image/png` |
| `STYLES` | Named styles, or an empty value for the default |

Pan the map and watch new image requests appear. You receive pixels, not the boundaries' polygon coordinates. WMS can optionally offer `GetFeatureInfo` for information at a map position; our small example does not implement it, and its availability varies by layer.

**Coordinate order needs care.** WMS 1.1.1 uses `SRS`; WMS 1.3.0 uses `CRS`. With EPSG:4326, WMS 1.1.1 BBOX uses longitude/latitude order, while WMS 1.3.0 follows latitude/longitude axis order. CRS:84 uses longitude/latitude. The snippet uses Leaflet's default EPSG:3857 map, and Leaflet builds the requests. Do not paste a degree-based BBOX into a request expecting projected metres. Check the version and the service's supported CRS when changing servers.

## 4. Discover an OGC API and request features

Open the [pygeoapi demo landing page](https://demo.pygeoapi.io/master/). It links to collections, API documentation, and conformance information (the standard requirements implemented by the server). Then visit:

1. [Collections](https://demo.pygeoapi.io/master/collections?f=json): the datasets exposed by this server.
2. [The observations collection](https://demo.pygeoapi.io/master/collections/obs?f=json): its description, extent, and links.
3. [Five observation items](https://demo.pygeoapi.io/master/collections/obs/items?f=json&limit=5): one response page of features.

In this provider's URL, `f=json` selects a representation; it is a provider parameter rather than a universal spelling for every API. `limit=5` requests at most five features on a page. Look in the returned `links` array for `rel: "next"` to find another page. Follow the provided link instead of guessing page numbers. Five returned records do not imply there are only five records in the collection.

A bounding box narrows a request spatially. For default longitude/latitude coordinates, `bbox` is **west,south,east,north**. Try [a small request around eastern Canada](https://demo.pygeoapi.io/master/collections/obs/items?f=json&limit=5&bbox=-80,40,-70,50) and check the returned coordinates. Spatial filtering limits the answer to the data the provider has; an empty response says nothing about unrecorded places.

Click **Load five demo observations** in the snippet. The JavaScript uses the `fetch` pattern from the internet data lesson, checks the response and point coordinates, and passes GeoJSON to `L.geoJSON`. Now the browser has geometry and attributes, so each marker can display its record ID and date. GeoJSON uses `[longitude, latitude]`; Leaflet converts GeoJSON coordinates itself.

These are demonstration records, not a current observation feed. Inspect dates before making a claim. Loading again replaces the feature layer. Moving the map alone does not request more features.

## 5. Diagnose a service that does not draw

- **Wrong layer or version:** compare the request to GetCapabilities. Some servers return an XML exception with HTTP 200, so inspect the response body as well as the status.
- **Blank image:** check the area, zoom, supported CRS, and whether the layer has data there. Transparent pixels can be a valid response.
- **Wrong content:** an HTML error page cannot be parsed as GeoJSON. Look at Response and Content-Type in Network.
- **CORS:** a browser can display a cross-origin WMS image while JavaScript cannot read that server's capabilities or features. The server must permit cross-origin `fetch` reads. Opening a URL in a tab is a different action.
- **HTTPS:** an HTTPS page may block requests to an HTTP-only server. Use documented HTTPS endpoints.
- **Unavailable demo:** leave automatic polling off, read the error, and retry later. Practise with the [local GeoJSON example](../code_snippets/03_geojson/) if needed. Do not bypass browser protections with an unknown proxy.

## Connection to digital geographies

A standard can make geographic information easier to access, but providers still choose what to collect, classify, publish, and update. A WMS also carries the provider's choices of colours, labels, and scale. A feature service allows different styling, but its categories and missing observations remain. Compare the power to **see a representation** with the power to **inspect and reinterpret its data**.

Link this to the course's [digital geographies readings](../README.md#digital-geographies). For either demo, identify who controls the source, the date represented, the reuse conditions, and one question the data cannot answer. Do not infer a service's licence from its technical accessibility.

## Exercise: one place, two kinds of response

1. Load the snippet. Toggle the WMS overlay and identify which visible marks disappear.
2. In Network, inspect a WMS request. Record its layer Name, version, CRS, image format, and BBOX. Explain why those BBOX numbers are not longitude and latitude in this example.
3. Load the five demo observations. Open one popup and find the same ID and coordinates in the API response. Record its date.
4. Inspect the response's `next` link. Change `limit=5` to `limit=2` in your copy, reload, and request again. Explain why two returned features are a page size, not a total.
5. Temporarily misspell `/collections/obs/` in the fetch URL. Test the failure message and Console, restore the URL, and confirm recovery.
6. Write three sentences: which response gives you feature coordinates, which gives you styled pixels, and which provider choice affects what your map can say.

You are done when you can discover a layer or collection, inspect a real request, distinguish images from features, and explain an error without treating missing data as proof of absence.
