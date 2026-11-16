# Lab 06: a form, a place and a say

[Course](../README.md)

Lab 04 introduced situated knowledge. Lab 05 compared geodata sources. Here we introduce **invited participation and agenda-setting**. Whoever designs a map survey decides which questions people can answer. We will change a working form and ask how much influence a participant actually has.

The question asked in Lab_06 is **where could a small change make a public place in Graz more welcoming?** All entries are invented. This is a local prototype, with no planner receiving the suggestions.

## Start

Copy this whole folder to `practice/lab_06`. Open `index.html` with Live Server. Internet is needed for Leaflet, the basemap and place search. No packages or build commands are needed.

```text
lab_06/
├── index.html             concept, map, two forms and native dialog
├── styles/style.css       simple sizes in px and %
└── scripts/
    ├── map.js             map clicks, coordinates and a small loop
    ├── form.js            open/close dialog, submit and create a GeoJSON feature
    ├── download.js        provided extension: download the collection
    └── geocoding.js       find public places using a library
```

Read one file at a time: `map.js` for clicking, `geocoding.js` for searching, then `form.js` for saving an idea. Both location methods are part of the exercise. `map.js` creates `map`, the coordinate inputs and `chooseLocation`. The later scripts use those names, so their order in HTML matters. Each file has one job; none needs to be read all at once with the others.

## Map literacy and two location methods

Map literacy means making sense of a map through its symbols, scale and landmarks. Clicking connects a known place with a position on the map; geocoding starts from a name and offers candidate positions to inspect. Different experiences with maps and place names can make either method easier, so the page offers both beside one another.

Try both. Find a public square by name, select a result, then click the map to move the point to a particular entrance or meeting spot. Explain why the geocoder's result and the point you mean might differ. Neither a precise-looking coordinate nor a successful search establishes that you selected the intended location.

## In class: predict, click, follow the values

1. Press Add an idea before selecting a location. Predict what saving will do. The form opens, but its required coordinate fields prevent an incomplete record. Cancel closes the dialog without saving.
2. Click a public place on the map. Then search for `Hauptplatz Graz` and select a result. Both methods place the same orange draft circle and update the same coordinate fields. The circle is not yet a record in the collection.
3. Open the form. Find the matching `id` and `label for` in HTML. The click copied numbers into the latitude and longitude inputs.
4. Choose an idea, type an invented comment and save. Predict which things change: the popup, list, counter, form fields and collection.
5. Find `event.preventDefault()`. A normal HTML form can navigate or send data to a server. Our JavaScript instead keeps the page open and creates a record in this tab.
6. Follow one value, such as `Clearer signs`, from the HTML option through `.value`, `properties.idea`, the popup and the downloaded file.
7. Find the loop in `map.js`. It connects the same input listener to two fields. It does not create two observations.

### Three HTML details worth understanding

| HTML | What the browser does |
| --- | --- |
| `<dialog>` and `.showModal()` | Opens a modal above the page, with focus handling and Escape to close |
| `type="submit"` | Requests submission and runs the form's built-in validity checks |
| `type="button"` | Runs only its attached JavaScript action, such as Cancel |

`required`, `type="number"`, `min` and `max` are our simple input checks. An invalid form does not dispatch the normal submit event. We therefore avoid repeating all these checks in JavaScript. They help a classroom prototype; a real server must also validate what it receives.

`Number(input.value)` converts text to a number. Leaflet accepts latitude then longitude; the GeoJSON we create stores **longitude then latitude**. `L.geoJSON` understands that order and draws the marker.

## Practice: change the form and explain its consequences

Allow about **25 minutes**. Make one small change at a time.

1. In HTML, add an option for a different issue, for example `A drinking fountain`. Predict whether JavaScript needs changing. Save a new example and inspect its exported property.
2. Rename the question to ask what should be protected instead of changed. Read the options again. Which options now need rewriting? A working form can still ask an incoherent question.
3. Temporarily remove Something else. Which idea becomes hard to express? Restore it and write one invented alternative. Does an extra option give participants any control over the eventual decision?
4. Change the textarea's `maxlength` from 160 to 60. Update the visible note too. Try typing a longer account. Explain the trade-off between short comparable records and room to explain.
5. Find `form.reset()`. Predict what happens to the next observation if you comment out that line. Try it, then restore it. We clear old coordinates so someone does not accidentally reuse the last place.
6. Cancel a draft and reopen it. Its field values remain, but the saved count does not change. This lets someone return to an unfinished idea.

Use the questions to discuss **who can set the agenda, who can answer it and who decides what follows**. A suggestion form supports one part of a participatory process. Recruitment, interpretation, influence and feedback also need people and decisions outside this page.

## Download, inspect, then refresh

`collection.features` is an array in memory. The `push` method adds one feature. `download.js` converts the collection to JSON text and creates a small data URL, a link containing that text. The HTML `download` attribute supplies the filename. This extension uses one simple `if` to avoid an empty export.

1. Add two invented ideas at different places. Download `graz-ideas.geojson` and open it in VS Code.
2. Find two features, their properties and their coordinates. Check longitude is around 15 and latitude around 47 for Graz.
3. Refresh the page. The map and list are empty again. The downloaded file remains on your computer; the page does not automatically reload it.

**Nothing in this exercise sends the ideas to a central database.** Publishing the HTML does not add storage. Keep real participant records outside public GitHub repositories. Before real collection, agree the participant information, storage and private transfer procedure with the instructor.

## Geocode a public place

Allow about **15 minutes** to follow this part of the core exercise. The search form is beside the map. Search once for `Hauptplatz Graz` and choose a result. Check its position. Click the map to adjust it before adding an invented idea.

**Geocoding** finds candidate coordinates for a name or address. It differs from **geolocation**, asking a device for its current position. This lab does not request device location.

We use **Leaflet Control Geocoder**, a JavaScript library, and its **Photon adapter**. An adapter talks to one particular web service and returns a common result structure. The library offers a ready-made search control too. Here we use only its adapter with our own HTML form, so we do not load its control stylesheet.

Trace the short `geocoding.js`:

1. `.value` reads the public place name.
2. `await geocoder.geocode(query)` waits for an array of candidate places from Photon.
3. The loop creates one button for each result, using `textContent` for the name.
4. A result button moves the map and calls the same `chooseLocation` function as a map click.

There is one empty-results check and a short `catch` for failed requests. Search runs only when this form is submitted. If the search service is unavailable, map clicks and typed coordinates still let someone select a place.

The typed search name travels to the external service. The idea and comment do not. Use occasional public-place searches, without personal addresses. [Photon's demo policy](https://github.com/komoot/photon#demo-server) permits reasonable use and provides no availability guarantee. 

Discuss: can this service find an unofficial meeting spot with a local nickname? What would a missing result mean? A search result's centre is a proposed location to inspect, not proof of an experience or an exact meeting point.

## Show what you learned

In `practice/lab_06/notes.txt`, keep one prediction and result, your changed question and option, the two coordinate orders, and three sentences about who controls the question and what would be needed for answers to influence a decision. Keep one GeoJSON file with two invented records. Show a partner how an HTML value travels into that file.

Also compare one searched location with one clicked location. Which map features or place name helped you find each, and how did you check the point?

## References

[MDN forms](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Your_first_form), [MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog), [MDN form submit](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event), [Leaflet GeoJSON](https://leafletjs.com/examples/geojson/), [Leaflet Control Geocoder](https://github.com/perliedman/leaflet-control-geocoder), [Photon](https://github.com/komoot/photon), [Arnstein, 1969](https://doi.org/10.1080/01944366908977225), [Sieber, 2006](https://doi.org/10.1111/j.1467-8306.2006.00702.x).
