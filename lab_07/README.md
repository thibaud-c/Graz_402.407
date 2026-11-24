# Lab 07 · Eight suggestions, two maps of Graz

[Course repository](https://github.com/thibaud-c/Graz_402.407) · [Lab 06](https://github.com/thibaud-c/Graz_402.407/tree/main/lab_06)

In Lab 06 you collected a suggestion as a point. Today you are the person presenting the results. Someone asks, *“Which part of Graz received more requests for seating?”* Try two ways of dividing the same study area before you write your answer.

You will draw eight invented requests as Leaflet circles, follow a JavaScript counting loop, and use the counts in a Chart.js bar chart.

## Start

1. Copy the whole folder to `practice/lab_07`. Open the copy in VS Code. Keep this worksheet open.
2. **Before opening the page, do the paper prediction below**. Then right-click `index.html` and choose **Open with Live Server**. The URL should contain `/practice/lab_07/`. Leaflet, the basemap and Chart.js need internet access. The seating file is included in the folder.

| File | What to look for |
| --- | --- |
| `data/seating.geojson` | Eight point locations. Each has an ID and a zone name for each split. |
| `scripts/count.js` | The loop and the test you will edit. Start here. |
| `scripts/map.js` | The circle style, study area and two possible dividing lines. |
| `scripts/chart.js` | A supplied bar chart. Look for the labels and the numbers in `showCounts`. |
| `scripts/app.js` | Loads the data once and connects the radio buttons to the count, line and chart. |
| `index.html`, `styles/style.css` | The controls, legend, chart canvas and page layout. |

## 1. Predict on paper

Draw a box. Put three dots in its upper left quarter, three in its upper right, one in its lower left and one in its lower right. Each dot is one invented seating request. North is at the top.

1. Draw a vertical line through the middle. How many suggestions fall on each side?
2. Replace it with a horizontal line. Fill in your second prediction, then open the page and try both controls. The total should stay at eight.

| Division | Your prediction | What the chart shows |
| --- | --- | --- |
| West / East | West ___ · East ___ | West ___ · East ___ |
| North / South | North ___ · South ___ | North ___ · South ___ |

## 2. Trace and edit the count

1. In `data/seating.geojson`, find requests A and D. Read their coordinates and their two zone names. Both are north of the horizontal line. What happens to them when you switch to West / East?
2. Open `scripts/count.js`. Follow the call `countInZone(features, "eastWest", "West")`. Start a counter at zero and trace the first four features by hand. On which letters does the `if` add one? What does `return count` give back after all eight?
3. Change `count = count + 1` to `count = count + 2`. Predict the West and East bars. Save and reload. Count the circles by eye. Which part of the page now disagrees with the map? Restore `+ 1` before continuing.

`for...of` visits each feature in turn. `feature.properties[field]` reads the property whose name is in `field`. When `field` holds `"eastWest"`, this reads the same value as `feature.properties.eastWest`. The page calls the function once for each bar.

## 3. Connect the map, chart and page

1. In `scripts/map.js`, find `drawRequest`. Change the circle radius from 7 to 10. In `styles/style.css`, make the legend's `.dot` wider and taller so it matches. Predict whether either bar will change, then reload.
2. In `scripts/chart.js`, find `showCounts`. Which line names the bars? Which line gives them their heights? Try changing `backgroundColor` and reload. **Chart.js** is a library that draws the bars on the HTML `<canvas>`. Your loop supplies the numbers.
3. With a classmate, trace one switch through `scripts/app.js`: the radio button's `value` selects a field, the two calls return counts, `showCounts` updates the chart and text, and `setLatLngs` moves the dashed line. Find the separate line that draws the points just once.

## 4. Write the caption

Imagine this figure is a stop in your story map or a results slide for your PPGIS project. Write **two sentences**.

1. Compare the two divisions and use the observed numbers. Name what you counted.
2. Explain one limit on using this pattern to choose a bench site. For example, what would you need to know about recruitment or existing benches?

Exchange your captions with a classmate. Can your classmate tell which division you used? Could a reader mistake eight requests for eight different people?

This is the **zoning effect**. The mapmaker can change a pattern of counts by redrawing the boundaries used to group the observations. Both versions here use the same eight points and the same number of zones. See the point diagrams under **Scale vs. Zoning** in the [UCGIS illustrated explanation](https://gistbok-ltb.ucgis.org/current/concept/FC-07-026).

## (optional) Add a ninth request

In your practice copy, duplicate one feature in the GeoJSON array. Give it ID `I` and coordinates `[15.434, 47.074]`. GeoJSON lists longitude first. This spot is west of longitude 15.437 and north of latitude 47.071. Set both zone names to match. The supplied file records those names in advance, so moving a coordinate also means checking its labels.

Predict which bar in each view should gain one. Save, reload and check the map, both bars and the text totals. Switch back to your first view. Each pair of bars should still add up to nine.

[Leaflet and GeoJSON](https://leafletjs.com/examples/geojson/) · [Getting started with Chart.js](https://www.chartjs.org/docs/latest/getting-started/) · [Updating a chart](https://www.chartjs.org/docs/latest/developers/updates.html)
