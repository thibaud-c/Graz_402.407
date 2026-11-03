# OGC services: images and features

[Snippet index](../README.md) · [OGC tutorial](../../tutorials/ogc_webservices.md)

Open `index.html` with Live Server. No key, package install, or proxy is needed. An internet connection and working public demo servers are required.

1. Toggle **WMS country boundaries** in the layers control. These are rendered images from MapServer; there are no polygon attributes to open.
2. Click **Load five demo observations**. The pygeoapi server returns one page of GeoJSON from an OGC API – Features collection. Click a marker to see its record ID and date.
3. Click the button again. The feature layer is replaced, so points do not accumulate. A failed request leaves the last successful features visible and explains the failure.
4. In the browser's Network panel, compare a WMS `GetMap` image response with the API's JSON response. Changing the map view requests new images; it does not fetch a new page of observations.

The observations are sample records from the public pygeoapi demonstration service, not current events or student observations. The WMS and OpenStreetMap layers retain their attribution. Public demos can change or be offline; the [local GeoJSON snippet](../03_geojson/) remains available for practising feature loading.

This retains Lab 07's useful WMS concept with a service whose capabilities are easier to inspect. Its old “WMTS” label was incorrect: `L.tileLayer.wms` requests WMS images. See the tutorial for WMTS, WFS, WCS, and service discovery.
