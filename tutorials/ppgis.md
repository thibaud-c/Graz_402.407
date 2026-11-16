# 13. PPGIS and digital geographies

[Tutorial index](README.md) · Next: [Testing and publishing](publishing.md)

Allow 50 minutes. Read JavaScript, Leaflet, and GeoJSON first. Use fictional observations while exploring the snippets and demo.

## 1. What is PPGIS?

Public participation geographic information systems, or PPGIS, brings people's spatial knowledge, experiences, and preferences into geographic analysis and decision-making. Participants might mark valued places, describe barriers to access, or suggest locations for a service. It can involve facilitated mapping as well as online tools.

A web-based PPGIS interface commonly combines a map and questions. For example, "Where would shade help you take a break?" asks for a location and a reason. The resulting point represents someone's situated judgement. It is not a direct measurement of temperature or proof that everyone shares that preference.

PPGIS overlaps with volunteered geographic information, but contributing data does not automatically mean participating in decisions. Ask who sets the question, who interprets the answers, and whether participants can influence what happens next. [Brown and Kyttä's review](https://research.aalto.fi/en/publications/key-issues-and-research-priorities-for-public-participation-gis-p/) examines the methodological and practical issues behind this distinction.

## 2. Why does this matter for digital geographies?

PPGIS can make local knowledge visible alongside official datasets. A resident may identify an uncomfortable crossing or an important meeting place absent from a basemap. Turning that knowledge into coordinates and categories makes it easier to compare and map, but can remove context or ambiguity.

Interface design affects participation. Requiring mouse clicks can exclude someone using a keyboard. Requiring a precise point can misrepresent a broad or uncertain area. Fixed categories make answers easier to count but restrict what people can express. Internet access, language, recruitment, and trust also influence who responds.

Several points from one person are not several independent participants, and an empty area on the response map does not prove that nobody cares about it. Treat the map as evidence about the people and process that produced it. [Research on volunteered geographic information](https://doi.org/10.1080/00045608.2011.595657) connects those records to the social practices of contributing them.

## 3. Follow one observation

| Step | What changes | What it does not establish |
| --- | --- | --- |
| Select a location | A target marks a point and fields show coordinates | No observation has been recorded yet |
| Add a category and comment | The location gains meaning for this participant | The categories do not cover every possible experience |
| Add the observation | A feature is stored in this page's memory | It has not reached a researcher or database |
| Download GeoJSON | The browser is asked to save a file | The application cannot confirm successful file hand-in |
| Interpret responses | Records support a question or discussion | A convenience sample does not represent everyone |

Separate a selected location from a recorded response. Let the visitor see and revise it before adding the observation. A visible target and numeric fields help them check the map's interpretation of their click. The number of displayed decimal places is not a claim about location accuracy.

## 4. Helper snippets to try

The [PPGIS helper snippets](../code_snippets/06_ppgis/snippets.md) contain two small building blocks: read coordinates from a map click and place a target there. They assume you already created a Leaflet map. Try them in a copy of the basic Leaflet example before reading the optional form/export demonstration.

In the [commented PPGIS demo](../code_snippets/06_ppgis/app.js), clicking fills labelled coordinate fields and shows a target. Clicking elsewhere moves it. Typing coordinates remains an alternative, and clears the old click target so it does not disagree with the fields. **Add observation** turns the selected location into a record. **Remove** deletes that record from memory and the map; **Download GeoJSON** exports the remaining records.

The example checks empty values before converting them to numbers, checks allowed ranges and categories, and displays comments using `textContent`. Try `<b>Test</b>` as a comment: the brackets should appear literally. GeoJSON exports longitude first, although Leaflet's coordinate arrays use latitude first.

Another way to choose a location is to move the map beneath a fixed target. Try the [map-centre snippet](../code_snippets/07_map_center/) and compare it with click selection. The selection button moves one marker; it does not collect or save a response.

## 5. Collection and care for the data

A static page has no central storage unless you connect a separate service. The demo stores observations in memory and asks the browser to download them. Verify the file opens before closing or reloading the page. It keeps the points after downloading because the download request might not finish. Browser exit warnings are not reliable backups.

Before real participation, establish a clear purpose, participant information, the option to decline, a private transfer route, access arrangements, and a retention period. The demo checkbox only illustrates a form control; it is not a complete consent procedure. Do not put raw responses or consent records in GitHub. Use an agreed private channel to collect exports, and check for duplicate files before combining them.

Avoid unnecessary names, home locations, and identifying comments. Location data can remain identifying without a name. Decide whether publishing precise points is appropriate. The demo also requests Leaflet and map tiles from external services, so the participant's browser contacts those providers. Consider that when choosing a collection setup.

Keep source files and a record of the collection method. Explain recruitment, missing perspectives, and uncertainty when interpreting the result. Meaningful participation also requires explaining how people's contributions were used.

## Useful links

- [Brown and Kyttä, 2014: Key issues and research priorities for PPGIS](https://research.aalto.fi/en/publications/key-issues-and-research-priorities-for-public-participation-gis-p/). Research review. Start with the abstract and conclusions; look for the gap between collecting data and using it in decisions.
- [Elwood, Goodchild and Sui, 2012: Researching Volunteered Geographic Information](https://doi.org/10.1080/00045608.2011.595657). Research paper on geographic information, contributors, and social practice.
- [Leaflet mouse events](https://leafletjs.com/reference.html#mouseevent) and [DivIcon](https://leafletjs.com/reference.html#divicon). Technical references for a click's `latlng` and an HTML/CSS target symbol.
- [W3C forms tutorial](https://www.w3.org/WAI/tutorials/forms/). Practical guidance on labels, instructions, and feedback for accessible forms.

## Exercise: what does a click represent?

Use the helper to select two different public places in turn. Check that the target moves, the coordinates update, and selection alone does not create a saved response. In the optional form demo, add two invented observations, remove one, and inspect the downloaded GeoJSON for exactly one remaining feature.

You are done when you can explain the difference between selection, an in-memory record, and a collected file. Describe one experience that a point cannot express well and one person your interface or recruitment could miss. Suggest one change to address each limitation.
