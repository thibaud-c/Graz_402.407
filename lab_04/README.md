# Lab 04: load a GeoJSON file, explain a viewpoint

[Back to the course](../README.md) · [Lab 03](../lab_03/README.md)

In Lab 03, JavaScript changed one paragraph after a click. Here, a click requests a separate file and turns several records into map features. This lab introduces **situated knowledge**: asking from whose position, at what time and under what conditions a description of a place is produced.

Our three experiences around a square in Graz are invented. They illustrate different perspectives, not findings about the city. Lab 03 asked what simplifying an experience leaves out. This lab asks why experiences differ and how we can keep their context visible.

## What you will practise

- Read an object, an array and a property in GeoJSON.
- Use a function with parameters and a returned value.
- Trace an event listener, a file request and a callback used for each feature.
- Make small edits, predict their effects and recover from a failed request.
- Explain what the map can support and whose knowledge it does not contain.

Start with `describeFeature`, the GeoJSON and the load button. Use the map setup and `checkData` as provided. The latter checks this lab's small data format before changing the map.

## 1. Make a working copy and run it

Copy the whole `lab_04` folder into `practice/lab_04`. Edit your copy. Open `index.html` with **Live Server**, checking that its URL includes `/practice/lab_04/`. You must use HTTP here: double-clicking the file to open a `file://` URL can prevent `fetch` from loading the GeoJSON.

```text
practice/lab_04/
├── index.html
├── scripts/
│   └── app.js
├── styles/
│   └── style.css
└── data/
    └── places.geojson
```

All links are enabled so you can concentrate on JavaScript. There is no install or build step. Leaflet and the basemap need internet access. The GeoJSON is a small local file served by Live Server, not a live feed or a database.

Open the browser Console and Network panel. Predict what appears before clicking. Press **Load observations**. Find the request for `data/places.geojson` and inspect its response. Then open the three marker popups and compare them with the text list. Keyboard users can Tab to a named marker and press Enter to open it.

## 2. Read one feature before reading the loader

Open `data/places.geojson` in VS Code. JSON has quoted keys, quoted text values and no comments. Keep brackets, braces and commas intact.

| Part | Meaning here |
| --- | --- |
| `FeatureCollection` | A container for the features |
| `features` | An array, an ordered list of feature objects |
| `properties` | An object holding named fields such as `perspective` and `time` |
| `geometry.type` | `Point` for this lab |
| `geometry.coordinates` | `[longitude, latitude]` in degrees |

Compare the first point's coordinates with the Leaflet `setView` call in `scripts/app.js`. Leaflet's direct coordinate pair uses **latitude, longitude**; GeoJSON uses **longitude, latitude**. `L.geoJSON` performs that interpretation for us, so do not reverse the coordinates before giving it the file.

After loading, the Console shows the parsed data object. Expand `features`, then its first item, then `properties`. Index `0` means the first array item. You can also inspect the same information in the Network response. Which fields describe a position, and which describe a person's experience?

## 3. Follow the code together

Read the numbered sections of `scripts/app.js` with a partner. Use this as a route through the code rather than explaining every support line at once.

| Focus | Predict / trace |
| --- | --- |
| `dataUrl` | Which file will the browser request? Its path starts from the HTML page's URL, even though the script lives in `scripts/`. |
| `describeFeature(feature)` | What is its input? What text does it return? Which properties appear in the result? |
| `addPopup(feature, layer)` | How does it reuse that returned text? Who supplies its two arguments? |
| `loadPlaces` | What happens when the button is clicked? Which statements wait for a response? |
| `L.geoJSON` | How does the parsed data become a map layer? `onEachFeature` calls our function once per feature. |
| `data.features.forEach` | Why do three list items appear without three repeated blocks of code? |
| `placesLayer` | Why use `let` here? What would happen if the previous layer were never removed? |

`return` sends a value back to the place where a function was called. In `popup.textContent = describeFeature(feature)`, the function call produces the text assigned to the paragraph. The same function is used for the list, so one edit affects both outputs.

`feature` is a parameter name, not a special GeoJSON keyword. It stands for the argument supplied to that call. `feature.properties.time` reads nested object properties. `+` joins these text values into one string.

Notice the distinction between **passing** a function and **calling** it. `addEventListener("click", loadPlaces)` passes a function to run on a later click. Writing `loadPlaces()` calls it immediately. Likewise, Leaflet receives `onEachFeature: addPopup` and later supplies the feature and layer arguments.

### The small asynchronous step

`fetch(dataUrl)` starts a request and returns a **Promise**, representing a result that may arrive later. `await` waits for that operation within this `async` function. It does not freeze the whole browser. `response.json()` is another asynchronous operation, reading and parsing the JSON body into JavaScript objects and arrays.

Keep the two `await` keywords for now. The sequence is request → check HTTP status → read JSON → check the expected data shape → build and display features. `try/catch` handles failure; `finally` enables another attempt. An HTTP 404 still produces a response, so the script explicitly checks `response.ok`.

## 4. Your practice: predict, change, load, explain

Work through A to D first. E and F extend the same example if time allows. Save one change at a time. Live Server may reload automatically after a file edit; if so, click **Load observations** again.

### A. Change a property

Change the first feature's `observation` text in the GeoJSON. Keep it fictional. Predict whether the marker's position, popup, list item and total count will change. Save, load and compare with your prediction. Then change its `name`. Which parts of the page now use that value?

### B. Change the function's output

In `describeFeature`, temporarily replace the return expression with `return properties.observation;`. Predict what the popups and text list will omit. Save, reload and load the file. Can a reader still tell who produced each experience and when? Restore the context afterwards.

You have changed what is displayed, not deleted those fields from the GeoJSON. The file can still contain context that an interface hides.

### C. Add a fourth feature

Copy one complete Feature object inside the `features` array. Add the necessary comma between objects. Give the new feature a distinct name, perspective, time and observation. Choose an illustrative point near the others, keeping longitude first. Predict how the count and map extent will change, then load it.

Click **Load observations** twice. You should still have four records, not eight. Explain which lines replace the previous results. If two features share exactly the same coordinates, their markers can overlap even though both records remain in the list. For this first exercise, choose separate illustrative positions.

### D. Break a path and recover

Temporarily change `dataUrl` to `"data/missing.geojson"`. Save, reload and click. Find the failed request and the visible message. What is the HTTP status? Restore `"data/places.geojson"`, save and try again.

Also try removing one comma from the JSON, then repairing it. A missing file and invalid JSON are different failures: compare the Network response and Console error. Keep the HTTP and error checks in the script.

### E. Try one condition

Add an `if` inside `describeFeature` that returns an extra warning for one chosen time, for example `"Market morning"`. First find that exact value in the file. Think about `===`, a comparison, and `=`, assignment. Use braces to group the statements that run when the condition is true. Keep a return value for the other features too.

Predict which records will change. Test one matching record and one non-matching record. This is a practice task for you to write; the starter does not supply its completed answer.

### F. Keep another piece of context

Add a text property such as `weather` to your invented features. Reload and check whether it automatically appears in the popups. What else must change in `describeFeature`? Explain why adding information to a file and choosing to display it are separate actions.

## 5. Explain the geography

Choose two experiences and discuss:

1. How do the observer's activity and time help explain what they notice?
2. What would a map reader infer if only the observation sentence were visible?
3. Whose experiences are absent from these three invented viewpoints?
4. What evidence and collection method would be needed before using actual experiences to support a planning claim?

Situated knowledge does not make evidence unnecessary or all claims interchangeable. We make the position and limits of an experience visible so it can be assessed responsibly. The points here are illustrative; their coordinates do not establish the truth of their descriptions, nor do the records represent a whole population.

In `practice/lab_04/notes.txt`, record one prediction and result, the request failure you repaired, and one change that made a viewpoint's context more or less visible. Show a partner the data field, the JavaScript function and its output on the page.

## References and instructor notes

- [Leaflet: GeoJSON](https://leafletjs.com/examples/geojson/), especially `onEachFeature` and `pointToLayer`.
- [MDN: using fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), for responses, `await`, JSON and HTTP errors.
- [GeoJSON, RFC 7946](https://www.rfc-editor.org/rfc/rfc7946), sections 3.1.1 and 3.3, for coordinate order and FeatureCollections. Use as a reference, not a full reading assignment.
- [Haraway, 1988: Situated Knowledges](https://commons.princeton.edu/hum583-f21/wp-content/uploads/sites/283/2021/08/Haraway-Situated-Knowledges.pdf). Background for the instructor. The short explanation in this lab introduces one part of a broader feminist argument about knowledge, power and accountability; students need not read the whole article.