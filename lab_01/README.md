# Lab 01: read a page, then change it

[Back to the course](../README.md)

You do not need to know HTML yet. Try to make a prediction, change one thing, save, and look at the result.

The example introduces **digital mediation**: how digital maps influence our understanding and experience of places. Its definition, examples, and link give us something geographical to discuss while we explore the HTML.

## Look behind a website (done in-class)

Open a website and its browser **developer tools**. These panels belong to the browser. The browser Console is different from the terminal used for commands such as `cd`.

| Panel | What to observe today |
| --- | --- |
| Inspector in Firefox, or Elements in Chrome/Edge | Select a heading or image. Where does it appear in the page structure? |
| Console | Look for messages and errors. A quiet Console does not prove that a page is correct. |
| Network | Keep the panel open and reload. Which files arrive? Can you find a document, an image, and their status? |

Right-click something on the page and choose **Inspect** to open the tools. For today, observe the Console messages; you can leave its command input empty. We will learn to write code there later. [Chrome developer tools](https://developer.chrome.com/docs/devtools/open) and [Network panel guide](https://developer.chrome.com/docs/devtools/network).

## Read our HTML file

Open [index.html](index.html) in VS Code and display the page in a browser (with live server). Compare the text file with what the browser draws.

Find these parts without changing them yet:

1. `<!doctype html>` at the top. It tells the browser to use modern HTML rules.
2. `<html>` and `</html>` around the document.
3. `<head>` and `</head>`, containing information about the page. Compare the `<title>` with the text in the browser tab.
4. `<body>` and `</body>`, containing the visible content. Find the `<h1>` that appears on the page.
5. One `<p>...</p>` paragraph and one `<li>...</li>` list item. What does the `/` in the closing tag tell you?
6. `<strong>` inside a paragraph. Which element opens first? Which closes first? What do `<small>` and `<i>` do?

In `<p>Hello Graz</p>`, `p` is the tag name and `Hello Graz` is the content. In `href="https://www.graz.at/"`, `href` is an **attribute** and the quoted text is its value. Attribute values give an element extra information. For instance, `href` tells a link where to go, `src` tells an image where to find its file, and `id` gives an element a unique identifier. Attributes are always written inside the opening tag. There can be multiple attributes in a single tag, separated by spaces.

The indented lines help us read which elements are inside others. Tags define the structure. A note between `<!--` and `-->` is a comment, visible in the file but hidden from the displayed page. These conventions are explained in [MDN's HTML syntax guide](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax).

## Your practice

### 1. Make your own copy

1. In your file manager, create a `practice` folder inside the course folder if it does not exist.
2. Inside `practice`, create a `lab_01` folder and copy the example `index.html` into it. Keep this README open in the original folder. Edit `practice/lab_01/index.html` so the shared example stays available.
3. Open that copied file in VS Code. Right-click it and choose **Open with Live Server** if the extension is installed. You can also double-click the file in your file manager to open it directly in a browser.
4. Keep the editor and browser next to each other. Save with **Ctrl+S** on Windows/Linux or **Cmd+S** on macOS. Reload the browser after each change if it does not refresh automatically.

Check that both windows show your copy. With Live Server, its URL should include `/practice/lab_01/`. Open developer tools and keep Network available for the image task.

### 2. Change words before changing tags

1. Replace `Digital mediation` in the main heading with your own title for the concept. Keep `<h1>` and `</h1>` in place.
2. Change the browser tab title. Does it change the large heading too?
3. Rewrite the explanation of digital mediation in your own words. Choose a public place in Graz and add a sentence about how a web map presents it.
4. Add your first name or initials to the footer.

Save and reload. Show a partner where each change came from in the file.

### 3. Try a few tags

Use the tag list below as a menu. You do not have to use every tag.

1. Add a third `<li>...</li>` inside the existing list, before `</ul>`, giving another example of how a map directs attention.
2. Add one new paragraph inside `<main>`, before `</main>`, describing something you noticed during the shared website observation.
3. Choose one word in that paragraph and wrap it in `<em>...</em>`. Predict what will change.
4. Change the existing list's opening and closing tags from `ul` to `ol`. What changes in the browser? Change them back if you prefer the original.

Keep complete pairs of tags. For example, a paragraph opens before its emphasis tag and closes after it: `<p>A <em>prominent</em> label.</p>`.

### 4. Break one thing, then repair it

1. Find the closing `</strong>` after `Digital mediation` in the first paragraph and temporarily remove only that tag.
2. Predict what might happen, then save and reload. Look at the paragraph and the content after it. Compare the Inspector's structure with your file. Did anything unexpected become bold? Did the Console report an error?
3. Restore `</strong>`, save, and reload. **Ctrl+Z** or **Cmd+Z** can undo the edit if you have not made other changes since.

A browser tries to repair some malformed HTML. It may still show the page, and it may not report the mistake in the Console. Seeing content on screen is only part of the check. Compare the source and the Inspector, and restore the intended tag pairs. [MDN: nesting elements](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/Basic_HTML_syntax#nesting_elements).

### 5. Add a saved map screenshot

1. Open Google Maps and look at the public place you chose. Save a screenshot as an image file on your computer, using your operating system's screenshot tool. Keep the map's source and attribution visible in the screenshot. You can use your own photograph of the place instead.
2. Create an `images` folder **inside your copied `lab_01` folder**. Put the image there. Use a short filename such as `graz-map.png`, with no spaces. Keep its actual format: renaming a JPEG to `.png` does not convert it.
3. Find the comment `Add your image here` in `index.html`. Below it, add this small example, adjusting the filename and description to your image:

```html
<figure>
  <img src="images/graz-map.png" alt="Map of the streets around Hauptplatz in Graz" width="320">
  <figcaption>Map screenshot: Google Maps. Captured on [your date].</figcaption>
</figure>
```

4. Replace the example `alt` text with a description of what your image shows. `alt` provides a text alternative; the caption is visible below the image. If you used your own photo, change the caption to credit it.
5. Save and reload. In Network, find the image request. Which file did the browser try to load?
6. Temporarily change `src` to `images/missing-map.png`. Save and reload. Inspect the failed request, then restore the working path. Live Server usually reports **404** for a missing file; opening the page directly can show a local-file error instead.

An image uses a single `<img>` tag, with no `</img>`. `src` points to its file. The optional `width` here sets its display width in pixels; it does not change the saved image. [MDN: HTML images](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_images).

### Relative paths: start beside the HTML file

Your working folder should now look like this:

```text
practice/
└── lab_01/
    ├── index.html
    └── images/
        └── graz-map.png
```

For this page, `src="images/graz-map.png"` means: start in the folder containing `index.html`, enter `images`, then find `graz-map.png`.

| Path | Where the browser looks |
| --- | --- |
| `graz-map.png` | Beside `index.html` |
| `images/graz-map.png` | In an `images` subfolder beside `index.html` |
| `../graz-map.png` | One folder above the folder containing `index.html` |

The examples show three different possible locations; use the one matching your files. The path is relative to the HTML file, not to the README or the folder VS Code happens to show first. Match the filename, extension, and letter case. Use `/` in HTML paths, including on Windows. Avoid a path such as `C:\Users\...` or `/Users/...`; it refers to a location on one computer.

## Tags we will reuse in the course

| Tag or example | Purpose | Try today? |
| --- | --- | --- |
| `<html lang="en">...</html>` | Contains the document; `lang` identifies its language | Recognise the wrapper |
| `<head>...</head>` | Information about the page | Find it |
| `<title>...</title>` | Browser tab title | Change its text |
| `<meta charset="utf-8">` | Text encoding, including accents; no closing tag | Keep it |
| `<body>...</body>` | Visible content | Find it |
| `<header>...</header>` | Introductory content | Find it |
| `<main>...</main>` | The page's main content | Add your content inside |
| `<footer>...</footer>` | Closing information or credits | Change its text |
| `<h1>...</h1>`, `<h2>...</h2>` | Main heading and section heading | Use one main heading |
| `<p>...</p>` | Paragraph | Add one |
| `<strong>...</strong>` | Strong importance, usually shown in bold | Break and repair its pair |
| `<em>...</em>` | Emphasis, usually shown in italics | Wrap a word |
| `<ul>...</ul>`, `<ol>...</ol>` | Bulleted or numbered list | Compare them |
| `<li>...</li>` | One list item inside `ul` or `ol` | Add an item |
| `<a href="https://www.graz.at/">City of Graz</a>` | A link to another page | Find the destination and label |
| `<img src="images/graz-map.png" alt="Description">` | Image with a text alternative; no closing tag | Add your image |
| `<figure>...</figure>`, `<figcaption>...</figcaption>` | Group an image with a caption | Credit your image |

Later we will also use `section` to group a topic, `nav` for navigation, and `div` as a general container. For participant forms we will meet `form`, `label`, `input`, `select`, `option`, `textarea`, and `button`. You can leave those until their lesson.

## Show what you learned

Show a partner your edited page and its HTML file. Point to one opening/closing pair, one nested element, one attribute, and the image's relative path. Check that your repaired page shows the intended text, list, image, and caption.

In a `notes.txt` file beside your copy, write a few lines about the change you made, the mistake you tried, how the browser reacted, and how you fixed it. Add one question you still have. Keep your image and HTML together so the page also works when you move the folder.

