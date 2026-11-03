# Filter and style polygon data

[Geodata tutorial](../../tutorials/geodata.md) · [Snippet index](../README.md)

This retains Lab 07's useful geometry filter and its original `graz_district.geojson`. The [point example](../03_geojson/) introduces basic loading; this one teaches mixed geometry, polygon styling, and checking what was excluded.

The file identifies its generator as `overpass-turbo`, source as OpenStreetMap under ODbL, and export timestamp as `2025-11-17T11:21:52Z`. It contains 17 Polygons and 17 Points. Preserve this metadata and credit [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) when reusing the data. Course code licensing does not replace the dataset's license. Do not assume these historical boundaries are suitable for current administrative decisions.

Open with Live Server. Expect 17 polygons and 17 excluded records. Click a district to see its name. Change the fill opacity and explain why the basemap should remain legible. Filtering shapes does not validate their topology or accuracy.
