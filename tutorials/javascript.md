# 7. Make a page respond with JavaScript

[Tutorial index](README.md) · Next: [Leaflet](leaflet.md)

Allow 60 minutes. Read the coding concepts, HTML, and CSS guides first. Use your copy of `01_web_page`, or copy it into `practice/js_page` now.

## Cheatsheet

| JavaScript | Meaning |
| --- | --- |
| `const name = "Graz";` | Bind a name that will not be reassigned |
| `let count = 0;` | Bind a name you can reassign |
| `value === 3` | Compare without converting types |
| `if (condition) { ... }` | Run a block conditionally |
| `for (const place of places) { ... }` | Visit each item |
| `function label(name) { return name; }` | Define a function |
| `console.log(count);` | Print to the browser Console |
| `document.querySelector("#count")` | Find an element in the page |
| `element.textContent = "Hello";` | Set text safely |

Before trying a Console example, follow [Open the browser Console](#6-open-the-browser-console-and-debug-a-small-error) below.

## 1. Connect a script

The starter includes `<script src="app.js" defer></script>` in its head. `defer` lets the browser read the HTML before the script uses its elements. Open `app.js` and locate the button handler. Click the button and find its Console message.

JavaScript in this class runs in the browser. A shell does not understand `document.querySelector`. Use the browser Console for short experiments and your `.js` file for code you want to keep.

## 2. Translate the paper concepts

Try these lines in the browser's Console, one at a time. Reload if it says a `const` name was already declared.

```js
const distances = [250, 700, 500];
let nearby = 0;
for (const distance of distances) {
  if (distance <= 500) {
    nearby = nearby + 1;
  }
}
console.log(nearby);
```

Expect 2. Braces enclose blocks; `of` takes each value from the array. An array is JavaScript's ordered list. A record is an object, for example `{name: "Park A", distance: 250}`. Access its fields with a dot, such as `place.name`.

Define and call a function:

```js
function isNear(distance, limit) {
  return distance <= limit;
}
console.log(isNear(500, 500));
```

A return value can be used in another expression. Printing is useful for inspection but does not change the page.

## 3. Read and update the document

The DOM, or Document Object Model, is the browser's representation of the page. `querySelector` finds an element using the same selectors you used in CSS. It returns `null` if nothing matches.

```js
const button = document.querySelector("#count-button");
const output = document.querySelector("#count");
let count = 0;
button.addEventListener("click", function () {
  count = count + 1;
  output.textContent = `Recorded stops: ${count}`;
});
```

This is the pattern used by the starter. The function runs on each click. Passing a function to another function is called a callback. The backtick string inserts the current count where `${count}` appears. Use `textContent` for participant text or API labels. `innerHTML` interprets markup and can make untrusted input unsafe.

## 4. Form values are text

An input's `.value` is a string, even when `type="number"`. Check for empty text before converting it with `Number`, because `Number("")` is zero. Check `Number.isFinite(value)` and the allowed range after conversion. HTML's `required`, `min`, and `max` help visitors, but imported data also needs checking in code.

Use `===` for equality. `=` assigns a value. A misspelled variable can produce a `ReferenceError`; using `.textContent` on a missing element produces a `TypeError`. Read the first error and its file/line before changing unrelated code.

## 5. Reuse code with libraries and modules

Our Leaflet pages load its classic script from a URL before `app.js`. Leaflet then provides a global name, `L`. You do not write `import L` with this setup.

For your own separate files, a module can export a function:

```js
// helpers.js
export function isNear(distance, limit) {
  return distance <= limit;
}
```

```js
// app.js
import { isNear } from "./helpers.js";
console.log(isNear(100, 500));
```

To try this variation, change the HTML tag to `<script type="module" src="app.js"></script>`. Serve it with Live Server. Module imports use URLs relative to the importing file, and need a library build that supports modules. Keep the supplied starters' simpler script setup until a split is useful.

Reference: [MDN JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide).

## 6. Open the browser Console and debug a small error

The Console displays JavaScript messages and errors, and lets you run short commands in the current page. It is one of your main debugging tools. Keep it open while changing an interaction; a page can look normal even when part of its script failed.

- Chrome/Edge: open the browser menu, choose **More tools > Developer tools**, then **Console**. A direct shortcut is **Ctrl+Shift+J** on Windows/Linux or **Cmd+Option+J** on macOS.
- Firefox: choose **More tools > Web Developer Tools**, then **Console**, or use **Ctrl+Shift+K** on Windows/Linux or **Cmd+Option+K** on macOS.
- Safari: enable web developer features in **Settings > Advanced** if necessary, open **Develop > Show Web Inspector**, then choose **Console**.

For the first examples earlier in this guide, this is where to type. The VS Code terminal runs shell commands and is a different tool.

1. Open the Console on your copied web-page snippet and click its count button. Find `Current count:` in the output.
2. Type `document.querySelector("#count")`. The result should be the page element. Try `document.querySelector("#missing")` and expect `null`.
3. In your copy of `app.js`, temporarily misspell `#count` in its selector. Save, reload, and click the button.
4. Read the first error. Click its file/line link to locate the failed statement. The element lookup returned `null`, so setting its `textContent` fails.
5. Correct the selector in VS Code, save, reload, and test again. The count should update with no new error.

Use `console.log(value)` to check an assumption, and `console.table(arrayOfObjects)` to inspect small collections. In the Sources/Debugger panel, a breakpoint pauses execution so you can inspect values before the next line runs. Do not paste unfamiliar code into the Console; commands run with access to that page. Reloading clears temporary changes to the page, while saved source edits remain.

References: [Chrome DevTools entry points](https://developer.chrome.com/docs/devtools/open) and [Firefox Web Console](https://firefox-source-docs.mozilla.org/devtools-user/web_console/index.html).

## 7. Connect HTML, CSS, and JavaScript

The HTML file brings the other two files into one page. Put `<link rel="stylesheet" href="style.css">` and `<script src="app.js" defer></script>` in its `head`. The paths point to files beside this HTML file. HTML IDs and classes become the names that CSS and JavaScript use to find elements.

Here is a separate small experiment. Add these elements inside the HTML `body`:

```html
<button id="show-place" type="button">Show a place</button>
<p id="place-note" class="place-note">No place selected.</p>
```

Add this rule in `style.css`:

```css
/* Match an element only when it has both classes. */
.place-note.selected { background: #e0f2e9; padding: 0.5rem; }
```

Add this handler in `app.js`:

```js
const note = document.querySelector("#place-note");
document.querySelector("#show-place").addEventListener("click", function () {
  note.textContent = "Example place: Stadtpark, Graz.";
  note.classList.add("selected");
});
```

HTML supplies the button and paragraph. JavaScript handles the click, changes the paragraph's text, and adds a class. CSS matches the new class combination and changes its appearance. This keeps visual rules in the stylesheet. Inspect the paragraph before and after clicking to see its `class` attribute change.

A wrong filename breaks the connection between files; a wrong selector breaks the connection to an element. Check Network for missing files and the Console for script errors. The existing [web-page snippet](../code_snippets/01_web_page/) shows the same three-file structure.

## Connection to digital geographies

Interactive maps decide what happens when someone clicks, searches, or submits a location. Those rules influence which places and experiences become visible. For example, filtering a map to "popular" places may hide locations used by people who rarely contribute data.

Use [Elwood, Goodchild and Sui's discussion of volunteered geographic information](https://doi.org/10.1080/00045608.2011.595657) to ask who produces the records your interface displays. Before adding a filter or a required field, explain whose contributions it might exclude and how you would communicate that limitation.

## Exercise: add a reset action

In your copied starter add a second button. Give it a unique ID. Make its click handler reset both the variable and visible count to zero. Click the count button three times, reset, then click once more.

You are done when the final count is 1, there are no Console errors, and you can explain why resetting only the visible text would fail. Reload and explain why the count starts over.
