# Lab 02: change how a page is read with CSS

[Back to the course](../README.md) · [Lab 01](../lab_01/README.md)

This lab introduces **uneven digital geographies**: inequalities in digital access, participation, and the representation of places. Our page explains the concept through two invented accounts. We will change how readers encounter those accounts using CSS.

Keep the words in the HTML unchanged during your styling experiments so you can compare their presentation. Predict, change one thing, save, and reload.

## In class: compare the page with its files

Open [index.html](index.html) with Live Server, then open it and [style.css](style.css) in VS Code.

1. Find `<link rel="stylesheet" href="style.css">` in the HTML `head`. Its relative path tells the browser where to load the stylesheet.
2. In Network, reload and find the request for `style.css`. Inspect its response. The browser receives HTML and CSS as separate files.
3. Right-click the main heading and choose **Inspect**. In the Styles or Rules panel, find the rule beginning with `h1`. Temporarily change its colour there, then reload. What returns?
4. Find `class="account featured"` and `class="account"` in the HTML. Which rules do these sections share? Why does only one have a yellow background?
5. Find the `aside` and its image. In a wide window it is beside the main text; in a narrow window it follows the text. Which CSS rules control that change?

HTML gives the page its content and structure. CSS controls its presentation. Inspector edits are temporary; save a change in `style.css` to keep it. [MDN: what is CSS?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/What_is_CSS).

### Read a CSS rule

```css
h1 {
  color: #204f70;
}
```

`h1` is the **selector**, matching main headings. Inside `{ }`, `color` is a **property** and `#204f70` is its **value**, a colour written as a hexadecimal code. A colon separates property and value; a semicolon ends the declaration. A rule can contain several declarations. CSS comments use `/* ... */`.

| Selector | What it matches in this page |
| --- | --- |
| `body` | The page's body; many text settings pass down to its children |
| `h1` | The main heading |
| `.account` | Both sections with `class="account"` among their class names |
| `.featured` | The first section, which also has the class `featured` |
| `#question` | The heading with `id="question"` |
| `h1, h2, h3` | Any of the three heading types; commas group selectors |
| `.side-panel img` | Images inside the side panel; the space means inside |
| `a:hover` | A link while the pointer is over it |
| `a:focus-visible` | A link with visible keyboard focus |

The dot and hash belong in CSS selectors. HTML uses `class="account"` and `id="question"`, without those prefixes. An element can have several classes separated by spaces. [MDN: basic selectors](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Basic_selectors).

## Your practice

### 1. Make a working copy

Create `practice/lab_02` and copy `index.html`, `style.css`, and the whole **images folder** into it. Keep this README open in its original folder. Open the copied HTML with Live Server and check that its URL includes `/practice/lab_02/`.

Save both files after any edit. Keep the editor and browser beside each other. The CSS path starts beside the HTML file; the image path enters `images`, as in Lab 01. The included photo loads locally, so the example works without an internet connection. Following its source links needs internet access.

```text
practice/lab_02/
├── index.html
├── style.css
└── images/
    └── digital-workspace.jpg
```

### 2. Change colours and text size

1. In the `h1` rule, change the colour to another dark colour. You can try a colour name such as `darkgreen`. Which part of the page changes?
2. Add `font-size: 2.5rem;` inside that rule. Save and reload. What does the larger heading draw attention to? `rem` is a unit relative to the root font size.
3. Change the body's `background-color`. Keep the text easy to read against it. Do all boxes use that background, or do some have their own?

Choose a version you can read comfortably. Colour should support meaning; the section headings must still explain the accounts when colour is unavailable.

### 3. Change space and page width

1. In `.account`, change `padding` from `1rem` to `2rem`. Does the space grow inside or outside the border?
2. Change `margin-bottom` from `1rem` to `2rem`. Compare the gap between the accounts with the previous change. Find both values in the Inspector's box-model diagram.
3. Change the body's `max-width` from `60rem` to `40rem`. What happens to the line lengths and the positions of the sections? Make the browser window narrow, then wide again.

**Padding** separates content from its border. **Margin** separates the box from neighbouring boxes. `max-width` limits width while allowing the page to fit a smaller window. The starter's `box-sizing` rule includes padding and borders in declared widths. [MDN: the box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model).

### 4. Compare who receives emphasis

1. Look at the first account. Which rule gives it a different background and left border?
2. In CSS, temporarily change the selector `.featured` to `.account`, leaving its declarations in place. Save and reload. Which sections now receive that emphasis? This later `.account` rule overrides the earlier one for the properties it sets.
3. Compare the two versions with a partner. Which account attracted their attention first? Treat their answer as an observation from this small comparison, not evidence about all readers.
4. Restore the selector `.featured`. For your final version, give the accounts equal visual treatment by removing the two declarations inside that rule. Keep the other `.account` rule.

You changed the presentation of the same text. You did not change who could contribute to the imagined map or add missing records. Explain what equal visual treatment achieves and what the underlying access problem still requires.

### 5. Break a selector and repair it

1. Temporarily change `.account` in the shared rule to `.acount`, leaving the HTML unchanged. Save and reload.
2. Does the CSS file still load in Network? Which styles disappear, and which remain? Inspect a section and look for matched rules.
3. Restore `.account`. A valid CSS selector with the wrong class name can match nothing without producing a Console error.

Optional: change the HTML stylesheet path to `missing.css`. Reload and inspect the failed request. Restore `style.css`. How is a missing stylesheet different from a loaded stylesheet whose selector matches nothing?

### 6. Style the image and its panel

1. Find `.side-panel img`. Its `width: 100%` fills the panel's content width. Temporarily change it to `70%`. Does the image file change, or only its displayed size? Restore `100%` afterwards.
2. Change `aspect-ratio: 4 / 3` to `1 / 1`. The image box becomes square. With `object-fit: cover`, which objects are cropped out? Try `contain` to see the whole photograph inside that box, then choose the version you prefer. Neither setting stretches the photo. [MDN: object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/object-fit).
3. Change the panel's `border-radius` to `0`, then to `1rem`. Compare its corners. Try changing the image's radius separately.
4. Temporarily remove `box-shadow` from the panel. Does it change the panel's size, or its appearance? The values specify horizontal offset, vertical offset, blur, and colour.

The HTML image has dimensions describing its original size. CSS controls its displayed box. `height: auto` lets the CSS aspect ratio determine the height when a width is set. A crop can omit a device that matters to the discussion: explain how the photograph's framing affects the account of digital access.

### 7. Try a simple layout and link feedback

1. Find `.layout` in the HTML and its two children, `main` and `aside`. `display: grid` makes it a layout container, and `gap` leaves space between those children. Change the gap from `1.5rem` to `3rem`.
2. In the `@media` rule, change `2fr` to `1fr`. Above the breakpoint, the columns now share space equally. What happens to the text's line length and the photograph's prominence? `fr` divides the available space; `minmax(0, ...)` lets a column shrink without its content forcing it wider.
3. Resize the browser below and above the `48rem` breakpoint. Below it, there is one column and the panel follows the main text. Temporarily change the breakpoint to `60rem`, observe when the layout switches, then restore `48rem`.
4. Hover over a source link, then use Tab to reach it. Find `a:hover, a:focus-visible` in the CSS. Change its underline thickness from `3px` to `5px`. Keep the underline and keyboard outline visible in your final version.

The media query responds to the browser viewport's width. It changes the layout without moving the text in the HTML file. [MDN: media queries](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Media_queries) and [Grid](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids).

## Properties to reuse

| Property | What to try or observe |
| --- | --- |
| `color` | Text colour |
| `background-color` | The background behind content |
| `font-family` | The typeface; `system-ui, sans-serif` uses available system fonts |
| `font-size` | Text size, for example `1rem` or `2rem` |
| `line-height` | Space between text lines; `1.6` is relative to font size |
| `padding` | Space inside a box's border |
| `margin-bottom` | Space below a box |
| `border` | Width, style, and colour, for example `1px solid #697a86` |
| `max-width` | The greatest allowed width of the element |
| `text-align` | Alignment of text inside a box; the question heading starts centred |
| `font-style` | Upright or italic text; compare the question heading |
| `border-radius` | Rounded corners |
| `box-shadow` | A visual shadow outside a box |
| `width` / `height` | The displayed size of an element |
| `aspect-ratio` | The image box's width-to-height ratio |
| `object-fit` | Fit the photo within its box, keeping or cropping its content |
| `display: grid` | Lay out a container's children in tracks |
| `grid-template-columns` | Set the grid's columns |
| `gap` | Space between grid items |
| `text-decoration-thickness` | Thickness of a link's underline |

Keep the underlined source link and its visible keyboard focus. Press Tab until the link receives focus, then Enter to follow it. CSS also affects whether people can comfortably read and navigate the page.

## Show what you learned

Show a partner your final page and stylesheet. Point to one element selector, one class selector, one ID selector, and the HTML element each matches. Check that the two accounts are readable and have equal visual treatment. In a wide window, show the side panel; in a narrow window, show how it stacks below the text without horizontal scrolling. Check that the image and its credit remain visible.

In `practice/lab_02/notes.txt`, record one style change, its visible effect, the selector mistake you repaired, and one answer to this question: **How can styling improve access to a page while leaving inequalities in its data unresolved?**

## After class

Continue with the [CSS tutorial](../tutorials/css.md) for more selectors, positioning, flex, and grid. This lab introduces one simple grid; the tutorial explains other layouts in more detail.

The page's further-reading link is [Graham, De Sabbata and Zook, 2015](https://rgs-ibg.onlinelibrary.wiley.com/doi/10.1002/geo2.8). Start with the abstract and distinguish access, participation, and representation. The accounts in our exercise illustrate the concept; they are invented teaching examples.

The bundled photograph is [Laptop, notebook, phone, and mug on desk, Daniil Komov](https://unsplash.com/photos/laptop-notebook-phone-and-mug-on-desk-5qk-I8wqBgs), downloaded on 13 October 2026 under the [Unsplash License](https://unsplash.com/license). 
