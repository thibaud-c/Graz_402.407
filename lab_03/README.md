# Lab 03: predict, uncomment, connect

[Back to the course](../README.md) · [Lab 01](../lab_01/README.md) · [Lab 02](../lab_02/README.md)

Lab 01 introduced digital mediation. Lab 02 discussed uneven digital geographies. This lab introduces **datafication**, how aspects of experiences and places become records that software can work with. A detailed, invented account of resting in a square is reduced to just **shade + afternoon**. Compare what the tags retain with the memories, social relationships, sensations and changing circumstances they omit.

You have not learned JavaScript yet. Today, follow one small example connecting a button, a paragraph and a CSS class. You do not need to understand the map setup in full.

## Before you start

Create `practice/lab_03` and copy this folder's `index.html` and the whole `scripts` and `styles` folders into it. Keep this README open in the original folder. Edit your copy and open its HTML with Live Server. Check that the URL includes `/practice/lab_03/`.

```text
practice/lab_03/
├── index.html
├── scripts/
│   ├── app.js
│   └── map.js
└── styles/
    ├── default.css
    ├── heading.css
    ├── content.css
    └── map.css
```

Begin the prediction exercise with **all five steps commented out**. If a stylesheet or script is already enabled in your copy, wrap that line in `<!-- ... -->` first. The map's four lines share one comment block. Initially you should see plain text, ordinary links and two disabled buttons. Steps 1 to 4 work without an internet connection. Only the map and external reading links need one. No package installation or build command is needed.

## In class: predict before enabling each step

Work with a partner. For each step:

1. Read the relevant HTML line and the file it would load.
2. Predict what will change and what will stay the same.
3. Remove **only that step's** `<!--` and `-->` markers. Save and reload.
4. Compare with your prediction. Inspect the relevant element and the Network request.

Keep completed steps enabled. In your notes, make a small table with **step / prediction / observation / explanation**. The file comments use different syntax: HTML `<!-- ... -->`, CSS `/* ... */`, JavaScript `//` for one line. Do not nest HTML comments or remove all comment markers from the file.

| Step | What to enable in the HTML head | Predict before reloading |
| --- | --- | --- |
| 0 | Nothing yet | Does HTML still give the page a structure without our CSS? Do the navigation links work? |
| 1 | The `styles/default.css` link | Which text, colours and spaces change? Does the button become active? |
| 2 | The `styles/heading.css` link | Both files style `h1`. Which colour wins? How does the list become a three-column grid menu? What happens in a narrow window? |
| 3 | The `styles/content.css` link | Where do the two accounts appear in a wide window? What happens in a narrow one? Why is the `.recorded` rule not visible yet? |
| 4 | The `scripts/app.js` script | What happens immediately, before a click? What will change only after a click? |
| 5 | All four lines in the Step 5 comment block | Which file draws the map, which supplies its height, and which supplies the basemap images? |

The menu uses `display: grid` and `grid-template-columns: 1fr 1fr 1fr`. Each `1fr` gives one column an equal share of the available space. Try `1fr 2fr 1fr` to give the middle item more room, then restore three equal columns. The media query changes the menu to one column below `40rem`.

For Step 5, leave both scripts' `defer` attributes in place and keep Leaflet before `scripts/map.js`. If time is short, stop after Step 4. The map is an extension, not a requirement for understanding the first JavaScript example.

### Follow the connection across three files

| File | Find | Its role |
| --- | --- | --- |
| `index.html` | `id="record-button"`, `id="record-output"`, `class="record"` | Supplies the button and paragraph. Its `script` tag connects the JS file. |
| `scripts/app.js` | `querySelector`, `addEventListener`, `textContent`, `classList.add` | Finds the elements, listens for a click, replaces text and adds a class. |
| `styles/content.css` | `.record` and `.recorded` | Describes how the paragraph looks before and after the class is added. |

`#record-output` means the element with that ID. `.recorded` means an element with that class. When adding the class in JavaScript, write `"recorded"`, without the dot. The class `record` remains present too.

The `defer` attribute makes our external script run after the HTML has been parsed. That lets it find the button and paragraph. `addEventListener` registers an action; it does not immediately run the function inside it. That function runs when the click event happens.

The dot accesses a property or method of an element. `button.disabled = false` makes the button available. `output.textContent` is the paragraph's text. Changing it updates the browser's page, not your saved `index.html` file.

## Your practice

Work in your copy with Steps 1 to 4 enabled. Make one edit at a time, save, reload and test. Keep the browser Console available. There are no arrays, loops, API requests or forms to learn in this first JS exercise.

### 1. Change the content in HTML

Rewrite part of the resting-place account in your own words. Keep it fictional. Change the button's label inside its HTML tags. Does that change the sentence produced after clicking? Point to where each piece of text comes from. The tags are a fixed string chosen for this example; the program does not analyse the account or generate tags from its words.

### 2. Change a JavaScript value

Find `const recordText = "Tags: shade + afternoon.";` in `scripts/app.js`. Change only the words between the quotes. Predict the result, save, reload and click. Did the new record appear as soon as you reloaded, or only when you clicked?

Choose a different pair of tags for the same account and compare with a partner. What does each pair make easier to notice? Which parts of the lived experience still disappear? Adding a tag captures another selected detail; it does not recover the whole experience.

`const` gives the value a name. Here the value is a **string**, a piece of text. Keep its quotes. `=` assigns the value; `;` ends the statement. Editing the source and reloading starts the program again with your new value.

Change the Console message too. Which change appears in the browser Console and which appears on the page? The Console is not your terminal.

### 3. Separate words from appearance

In `styles/content.css`, change the background or border in `.recorded`, keeping text readable. Predict when that styling will appear.

Then comment out **only** the line `output.classList.add("recorded");` in `scripts/app.js` by putting `//` at its start. Save, reload and click. Does the record text still change? Restore the line and test again.

Finally, temporarily comment out the `content.css` link in HTML and reload. Click again. Use the Inspector to check that JavaScript still adds the class even though that stylesheet is not loaded. Restore the link. You have separated a change to the words from a change to their presentation.

### 4. Break one connection and repair it

Temporarily change only the JavaScript selector `"#record-output"` to `"#record-ouput"`. Save and reload. Look for an error in the Console; the button should remain disabled because the script stops before enabling it. Does the HTML paragraph still exist?

Restore the selector, save and reload. The names on both sides of the connection must agree. `querySelector` returns `null` when no element matches. Trying to set `textContent` on that missing element causes an error.

### 5. Explain what reload does

Show your partner the paragraph before a click and after a click, then reload. Which message returns? The example displays a record as text; it does not measure shade, save a file, store a database record or send a participant's answer anywhere.

## The smallest Leaflet map

Enable Step 5 only after the button exercise works. Read the comments in `scripts/map.js`; use the library setup as provided. You can explore a few values without learning every Leaflet method today.

1. Click the marker. Change the text in `label`, save, reload, and open the popup again. This is a separate string from `recordText`; changing it does not edit the paragraph's record.
2. Change `zoom` from `14` to `16`. Predict whether you will see a wider or smaller area. Drag and zoom, then try **Return to the example point**.
3. Change the latitude to `47.0750`, leaving longitude unchanged. Predict the direction the point moves. Restore it if you prefer the starting location. Latitude must be within -90 to 90; longitude within -180 to 180. Use an invented public example, not a home address or your device's location.
4. In `styles/map.css`, change `height` from `22rem` to `15rem`. Does this change the coordinates or only the space available for the map? Temporarily comment out that map stylesheet link, observe the collapsed container, then restore it.
5. Find the credits on the map. Distinguish the OpenStreetMap basemap images from our invented marker. Keep the attribution in place.

Leaflet's coordinate pair is `[latitude, longitude]`. This map does not use GeoJSON, fetch a dataset or collect a location from the visitor. An exact-looking marker is not proof that its category has been measured or that shade covers a particular area.

## Show what you learned

Show a partner a working button and identify one connection across HTML, CSS and JS. Check that the page stays readable in a narrow window and that you can reach and activate the button using Tab and Enter or Space.

In `practice/lab_03/notes.txt`, record:

- One prediction, what you changed and what happened.
- The mismatched selector you repaired and the Console error you saw.
- One useful thing the simplified record makes possible and one detail it loses.
- One extra question or category you would propose for a PPGIS form, and a limitation it would still have.

## Reference links

- [MDN: external scripts and defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script).
- [MDN: querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) and [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
- [MDN: event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
- [Leaflet Quick Start](https://leafletjs.com/examples/quick-start/), for the optional extension.
- [José van Dijck, 2014, on datafication](https://ojs.library.queensu.ca/index.php/surveillance-and-society/article/view/datafication). 
