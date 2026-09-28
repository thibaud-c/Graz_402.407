# Small, runnable code snippets

[Course](../README.md) · [Tutorials](../tutorials/README.md)

Each numbered folder is independent. Copy the whole folder into `practice`, rename the copy, and open its `index.html` with Live Server. For a group repository, copy the chosen folder's contents to that repository's root. Keep filenames and letter case unchanged unless you update their references too.

| Folder | What works already | Try changing | Guide |
| --- | --- | --- | --- |
| [01_web_page](01_web_page/) | HTML, CSS, a JavaScript button and count | Add a reset button | [JavaScript](../tutorials/javascript.md) |
| [02_leaflet](02_leaflet/) | Basemap, marker, popup, click coordinates | Add a second place | [Leaflet](../tutorials/leaflet.md) |
| [03_geojson](03_geojson/) | Load a local file and display feature properties | Add a fourth point | [Geodata](../tutorials/geodata.md) |
| [04_internet_data](04_internet_data/) | GET live data, local demo, optional polling, visible errors | Inspect requests and try an invalid URL | [Internet data](../tutorials/internet_data.md) |
| [05_story_map](05_story_map/) | Two narrative sections and map buttons | Add a third stop | [Story map](../tutorials/story_map.md) |
| [06_ppgis](06_ppgis/) | Click for coordinates and a target; enter/remove points and export GeoJSON | Pilot a different question | [PPGIS](../tutorials/ppgis.md) |
| [07_map_center](07_map_center/) | Move the map under a target and select its centre | Compare with click selection | [PPGIS](../tutorials/ppgis.md) |
| [08_page_layout](08_page_layout/) | Semantic HTML, flex navigation, responsive grid | Resize and add a section | [CSS](../tutorials/css.md) |
| [09_polygon_data](09_polygon_data/) | Filter a mixed GeoJSON export to district polygons | Inspect excluded point features | [Geodata](../tutorials/geodata.md) |
| [10_ogc_services](10_ogc_services/) | WMS images and a page of OGC API point features | Compare Network responses | [OGC services](../tutorials/ogc_webservices.md) |

The HTML, CSS, and JavaScript files contain teaching comments explaining the data flow and browser behaviour. GeoJSON is plain data and does not allow comments; read its `properties` and `geometry` fields alongside the [geodata guide](../tutorials/geodata.md).

Read `index.html` for the page structure, `style.css` for appearance, and `app.js` for behaviour where present; the page layout example needs no JavaScript. Map examples load Leaflet 1.9.4 directly from a CDN. There is no install or build step. Libraries, tiles, and live feeds require internet access. The non-map page works without external libraries.

These are small teaching examples, not finished submissions. The small bundled observations and demo earthquake events are fictional. The district file in 09 is a real OpenStreetMap export dated 17 November 2025; 10 requests sample records from a public API demo, not current events. The live earthquake option credits USGS; basemaps credit OpenStreetMap. Retain these credits when adapting the examples.

The PPGIS example stores records only in memory. Download, verify, and collect files using the procedure in its guide. Refreshing does not save responses, and publishing the site does not add server storage.

## A short check after an edit

1. Save, preview over HTTP, and check the browser Console.
2. Perform the main action and compare it with the table above.
3. Try the empty or failure case, then recover.
4. Check keyboard navigation and a narrow viewport.

For small pieces to reuse, see the [story-map helpers](05_story_map/snippets.md) and [PPGIS click/target helpers](06_ppgis/snippets.md). The latter includes an optional maintainer check; students need no extra tools.

## Decisions on the supplied snippets and Labs 04–07

The useful teaching ideas are integrated below. The old folders have been removed so students encounter one maintained version of each example.

| Supplied material | Decision | Where to find the retained idea |
| --- | --- | --- |
| `add_markers` | Keep the distinct map-centre interaction; simplify to one button and one selected marker. Remove the modal and duplicate comment form. | [07_map_center](07_map_center/) |
| `download_data` | Remove the duplicate. The existing PPGIS demo already exports GeoJSON, keeps observations after download, and supports removal. Omit unrelated gender collection. | [06_ppgis](06_ppgis/) |
| `lab_04` | Merge the useful HTML content pattern; the basic page and map already exist. Remove inactive embeds and the empty map placeholder. | [HTML helper](01_web_page/snippets.md), [02_leaflet](02_leaflet/) |
| `lab_05` | Keep a simplified responsive page layout. Replace broken styles, dead controls, and the external image dependency with readable HTML and CSS. | [08_page_layout](08_page_layout/) |
| `lab_06` | Merge the intended view-reset button into the existing map, correcting the map variable/element mismatch. Remove repeated introductory pages and alerts. | [02_leaflet](02_leaflet/) |
| `lab_07` | Keep polygon filtering and the original dated dataset; teach WMS separately with a verified demo service. Correct the WMTS label. Remove the CSV/proxy variant because API loading is already covered. | [09_polygon_data](09_polygon_data/), [10_ogc_services](10_ogc_services/), [04_internet_data](04_internet_data/) |

Optional maintainer checks use Node's standard library: `node code_snippets/check.cjs` and `node code_snippets/06_ppgis/check.cjs` from the repository root. Students only need a browser and Live Server to use the examples.
