# Lab 05 data sources

Prepared and downloaded **2 November 2026**. These are public geodata examples, not fictional observations or student participant data.

## Graz fountain records

- File: `graz-fountains.geojson`, 40,918 bytes, 190 Point features in this download.
- Provider: Stadt Graz, OGD feature service, layer 19, Oeffentliche Brunnen.
- [Layer metadata](https://geodaten.graz.at/arcgis/rest/services/OGD/OGD_WFS/MapServer/19).
- [Exact download query](https://geodaten.graz.at/arcgis/rest/services/OGD/OGD_WFS/MapServer/19/query?where=1%3D1&outFields=OBJEKT_ID%2CBRUNNENART%2CSTRASSENNAME%2CHAUS_NR&outSR=4326&f=geojson).
- The query requests four attributes and WGS 84 geometry. The saved response is unchanged. Coordinate order is longitude, latitude. These are the provider's field names, including uppercase letters.
- All 190 records in this snapshot have `BRUNNENART` equal to `Trinkbrunnen`. This is a count of published records, not proof of complete coverage or current operation.
- The response does not provide an observation date for each record. Download date and observation date are different.
- Licence: Graz OGD terms specify CC BY 4.0. Credit: **Datenquelle: Stadt Graz – data.graz.gv.at**. [Official OGD terms](https://data.graz.gv.at/graz/nutzungsbedingungen/). The indexed official terms remain available through search, while this old portal URL currently redirects to data.gv.at. Do not apply this licence to unrelated municipal services simply because they are publicly viewable.

This is an **ArcGIS REST feature query returning GeoJSON**. The service's name contains WFS, but this particular URL is not a WFS GetFeature request.

## Styrian orthophoto WMS

- Provider: Land Steiermark / GIS-Steiermark.
- [Official orthophoto service guide](https://www.landesentwicklung.steiermark.at/cms/beitrag/12866797/142970647/).
- [Service metadata](https://gis.stmk.gv.at/image/rest/services/OGD_DOP/Flug_2022_2024_RGB/ImageServer).
- [WMS GetCapabilities, version 1.3.0](https://gis.stmk.gv.at/image/services/OGD_DOP/Flug_2022_2024_RGB/ImageServer/WMSServer?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0).
- WMS Name: `Flug_2022_2024_RGB`. The advertised coordinate systems include EPSG:3857, used by these Leaflet maps.
- This identifies the **2022–2024 flight period**, not one date shared by every pixel. The lab requests images live; the aerial observations are historical.
- Licence: [Land Steiermark OGD terms](https://data.steiermark.at/cms/beitrag/11781336/95633648), CC BY 4.0. Required credit: **Datenquelle: CC-BY-4.0: Land Steiermark - data.steiermark.gv.at**.

The service is contacted directly by the browser. No orthophoto tile archive is included in the student files. Leaflet requests several GetMap images as tiles; this remains WMS, not WMTS. The provider's version 1.1.1 capabilities contained an XML error during preparation; the linked version 1.3.0 document and a Graz GetMap image were verified successfully.

## Copernicus surface-height crop

- File: `graz-surface-height.tif`, 832,099 bytes, one Float32 band, **685 columns × 469 rows**.
- Source: [Copernicus DEM on AWS](https://registry.opendata.aws/copernicus-dem/), GLO-30 Public, 2021 release as documented by that distribution.
- [Original COG tile](https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N47_00_E015_00_DEM/Copernicus_DSM_COG_10_N47_00_E015_00_DEM.tif).
- [Distribution documentation](https://copernicus-dem-30m.s3.amazonaws.com/readme.html), [product and licensing guidance](https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM).
- It is a **digital surface model**, not a bare-ground terrain model. Buildings, infrastructure and vegetation can contribute to the measured surface.
- Horizontal CRS: EPSG:4326. Native spacing: one arc-second, nominally 30 m; geographic cells are not square metre cells. Height values are in metres, referenced to EGM2008 in the source documentation.
- Requested crop extent: west 15.35°, east 15.54°, south 47.01°, north 47.14°. The output snaps outwards to the source grid. It retains original values, with no resampling. Source-grid bounds are approximately west 15.3498611°, east 15.5401389°, south 47.0098611°, north 47.1401389°.
- Observed range across this crop: approximately **326–763 m**. All crop cells have valid values. This describes the crop, not a live measurement or a cell beneath an arbitrary click.
- The small packaged crop is a compressed **GeoTIFF**. It has not been advertised or validated as a COG. The original online source is a COG. This lab downloads the whole local crop into memory rather than demonstrating remote byte-range access.

Required notice for the modified crop:

produced using Copernicus WorldDEM-30 © DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved

The instructor prepared this file with GDAL. Students need no GDAL, Python or package installation. For reproduction by a maintainer:

```sh
gdal_translate -of GTiff -projwin 15.35 47.14 15.54 47.01 -co COMPRESS=DEFLATE -co PREDICTOR=3 -co TILED=YES Copernicus_DSM_COG_10_N47_00_E015_00_DEM.tif graz-surface-height.tif
```

## Background tiles and browser libraries

- Backgrounds: © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright), [standard tile usage policy](https://operations.osmfoundation.org/policies/tiles/). The maps use normal on-screen requests, without prefetch or bulk downloading.
- [Leaflet 1.9.4](https://leafletjs.com/), [GeoRaster 1.6.0](https://github.com/GeoTIFF/georaster), and [GeoRasterLayer for Leaflet 3.10.0](https://github.com/GeoTIFF/georaster-layer-for-leaflet) load through pinned CDN URLs. The raster helpers are supplied support code.
- Live services and CDN availability can change. A locally saved dataset does not make the entire page independent of the web.
