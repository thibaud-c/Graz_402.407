# 5. Structure a page with HTML

[Tutorial index](README.md) · Next: [CSS](css.md)

Allow 45 minutes. Complete VS Code setup first. Create `practice/place_page` in VS Code and a file named `index.html` inside it.

## Cheatsheet

| HTML | Purpose |
| --- | --- |
| `<h1>Title</h1>` | Page's main heading |
| `<h2>Section</h2>` | Section heading |
| `<p>Text</p>` | Paragraph |
| `<a href="https://example.org">Source</a>` | Link |
| `<img src="photo.jpg" alt="Description">` | Image with a text alternative |
| `<ul><li>Item</li></ul>` | Unordered list |
| `<button type="button">Show place</button>` | An action |
| `<label for="comment">Comment</label>` | Label for a form control |

HTML is markup. Elements describe content and its purpose. CSS will control appearance; JavaScript will add behaviour.

## 1. Make a complete document

Type this into `index.html`, save, and open with Live Server:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>A place in Graz</title>
</head>
<body>
  <header><h1>A place in Graz</h1></header>
  <main>
    <h2>What I noticed</h2>
    <p>This is where I will describe a place.</p>
  </main>
  <footer><p>Author: a geography student</p></footer>
</body>
</html>
```

The doctype asks for modern HTML. `head` contains information about the page; `body` contains visible content. `title` appears in the browser tab. The viewport setting helps the page fit a phone. `lang` tells assistive tools the language. Use `de` if you write your page in German.

## 2. Read an element

In `<a href="https://www.graz.at/">City of Graz</a>`, `a` is the element name, `href` is an attribute specifying the destination, and the text between the tags is the link label. Use labels that say where a link goes.

Most elements have an opening and closing tag. `img`, `input`, and `meta` do not have closing tags. Nest complete elements inside one another. Put a list after a paragraph rather than inside it.

## 3. Add evidence and navigation

Inside `main`, add a paragraph explaining what you observed, then a link to a source. Add an `h2` and a list of two questions you cannot answer from that observation alone.

If you have an image you may use, put it beside `index.html` and reference its filename. Describe the relevant information in `alt`; credit its creator in a visible caption using `figure` and `figcaption`. Decorative images use `alt=""`. Do not copy arbitrary images from search results.

## 4. Add an accessible form control

```html
<label for="place-name">Place name</label>
<input id="place-name" name="place-name" type="text" maxlength="80">
<button type="button">Show place</button>
```

An `id` identifies one element on the page and must be unique. `for` connects the label to that input. Click the label and check the cursor moves into the input. The button does nothing yet. HTML alone does not save the answer.

Use headings in a logical order, and use buttons for actions and links for navigation. These choices also help keyboard and screen-reader users.

Reference: [MDN HTML guide](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content).

## 5. Inspect HTML in your browser

The browser's Inspector shows the live DOM, the page structure created from your HTML and any JavaScript changes. It helps you connect what you see on screen to the element responsible for it.

1. Open your local page with Live Server. Right-click its main heading and choose **Inspect** in Chrome or Edge, or **Inspect** in Firefox.
2. Find the selected `<h1>` in **Elements** in Chrome/Edge or **Inspector** in Firefox. Expand its parent to see where it sits inside `header` and `body`.
3. Hover over another element in the tree. The browser highlights its box on the page. Check its attributes, such as `id`, `class`, and `href`.
4. Double-click the heading's text in the inspector, change it, and press Enter. Your page changes immediately.
5. Reload. The original heading returns. Inspector edits are temporary; save the intended change in `index.html` in VS Code to keep it.

You can also open developer tools with **Ctrl+Shift+I** on Windows/Linux or **Cmd+Option+I** on macOS in Chrome/Edge and Firefox. In Safari, enable web developer features in **Safari > Settings > Advanced** if needed, then choose **Develop > Show Web Inspector**. Labels can differ by browser version.

If an element is in an unexpected place, inspect the DOM and compare it with your source. Browsers repair some malformed HTML, so "it appears on screen" does not prove the nesting is correct. The adjacent Styles panel shows its CSS; the next tutorial uses that panel.

References: [Chrome DevTools](https://developer.chrome.com/docs/devtools/open) and [Firefox Inspector](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/open_the_inspector/index.html).

For a small geography question and source link to adapt, see the [HTML helper](../code_snippets/01_web_page/snippets.md).

## Connection to digital geographies

A page about a neighbourhood makes choices about whose descriptions appear first and who can access them. A clear heading structure and text alternatives let readers encounter geographic knowledge in different ways, including through assistive technology. Missing labels or image-only explanations can exclude some readers.

Read [W3C's page-structure guide](https://www.w3.org/WAI/tutorials/page-structure/) alongside the [digital-geographies introduction](https://eprints.ncl.ac.uk/223990). Apply the question to your page: whose account of this place is visible, and who might have difficulty reaching it? Accessibility supports access, but it does not by itself make the account representative.

## Exercise: describe a place

Turn your page into a short field observation with one main heading, two sections, a list, a source link, and the labelled input. Add an image only if you have permission to use it. Preview it and press Tab repeatedly.

You are done when the tab title is meaningful, the sections follow a logical order, the link works, and the input and button can be reached with the keyboard. Explain why the input's value disappears after a reload.

<details><summary>Check your work</summary>

The input is currently only part of the page. There is no code to store it. The label's `for` and input's `id` must match exactly. Inspect the page in the browser's Elements or Inspector panel to see how the browser interpreted your HTML.

</details>
