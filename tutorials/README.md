# Tutorials and cheatsheets

[Back to the course](../README.md)

Start with the course README to clone the repository. Read GIS 101 for the geographic foundations, then work through the web development guides in order. Each ends with a small exercise and a way to check the result. The times are estimates for practice, not a timetable.

| Order | Guide | What you will do | Time |
| --- | --- | --- | --- |
| 0 | [GIS 101](gis_101.md) | Understand geometry, attributes, vector/raster, analysis, QGIS/ArcGIS, and CRS; make a buffer | 90 min |
| 1 | [VS Code](vscode.md) | Edit files and preview a page with Live Server | 25 min |
| 2 | [Terminal and paths](cli.md) | Find files and navigate folders | 25 min |
| 3 | [Git and GitHub](git.md) | Commit, receive updates, resolve a conflict, share group work | 50 min |
| 4 | [Coding without a language](coding_concepts.md) | Trace arrays, dictionaries, functions, and library objects on paper | 45 min |
| 5 | [HTML](html.md) | Structure a page and inspect its HTML in the browser | 45 min |
| 6 | [CSS](css.md) | Connect selectors to HTML; use boxes, positioning, flex, and grid | 55 min |
| 7 | [JavaScript](javascript.md) | Connect HTML/CSS/JS, handle clicks, and debug in the Console | 60 min |
| 8 | [Leaflet](leaflet.md) | Create a map, markers, popups, and events | 45 min |
| 9 | [GeoJSON and map services](geodata.md) | Load geographic features and distinguish data from map images | 45 min |
| 10 | [REST APIs and changing data](internet_data.md) | Fetch data, inspect failures, and distinguish polling from streaming | 60 min |
| 11 | [OGC web services](ogc_webservices.md) | Discover WMS layers and request features through OGC API | 60 min |
| 12 | [Story maps](story_map.md) | Connect a narrative to locations | 40 min |
| 13 | [PPGIS and collection](ppgis.md) | Explore participation, select a location, and inspect a response | 50 min |
| 14 | [Debugging, accessibility, and publishing](publishing.md) | Test with a partner and publish a static site | 40 min |

## Where to type

| Place | What belongs there |
| --- | --- |
| QGIS or ArcGIS Pro | Inspect layers and attributes, choose coordinate systems, and run GIS tools |
| VS Code editor | HTML, CSS, JavaScript, Markdown, GeoJSON |
| PowerShell or Terminal | `cd`, `git`, and other shell commands |
| Browser Console in developer tools | JavaScript experiments and error messages |
| Browser Network panel | Requests, response status, and downloaded data |
| GitHub website | Repositories, issues, and project settings |

The course root is the `Graz_402.407` folder containing `README.md`. Commands start there unless a step says otherwise. Use the exact letter case of filenames, including `tutorials`.

The browser requests files from a server, reads HTML, applies CSS, and runs JavaScript. Leaflet is a JavaScript library that draws interactive maps. Git saves versions of the source files. These tools do different jobs.

## How to practise

The GIS 101 exercise uses QGIS and keeps its outputs in `practice/gis_101`. The web development guides use VS Code and a browser. Create `practice/learning_log.md` in the VS Code guide. Predict each result, make one change, save, and test it. Record the result and one question. The [snippets](../code_snippets/README.md) are runnable reference examples. Copy the whole folder into `practice` so class updates do not overwrite your experiments.

The small local observation examples are invented for teaching. The polygon snippet includes a dated OpenStreetMap export with its original source metadata. Real API data changes over time. A working map still needs a geographic question, a source, and an explanation of its limitations.
