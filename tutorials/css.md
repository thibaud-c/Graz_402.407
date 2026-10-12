# 6. Style a page with CSS

[Tutorial index](README.md) · Next: [JavaScript](javascript.md)

Allow 55 minutes. Continue with `practice/place_page` from HTML. Add `style.css` beside `index.html`. Keep the browser Inspector open to try one rule at a time.

## Cheatsheet

| Selector or property | Meaning |
| --- | --- |
| `p` / `.observation` / `#map` | Match an element type / class / ID |
| `.observation p` | Paragraphs anywhere inside an observation |
| `.observation > p` | Paragraphs directly inside an observation |
| `button:hover` / `:focus-visible` | Pointer-hover / keyboard-focus state |
| `padding` / `margin` | Space inside / outside the border |
| `position` | How a box is positioned in relation to normal flow |
| `display: flex` | Lay out items along a main axis |
| `display: grid` | Lay out items in rows and columns |

## 1. How CSS connects to HTML

HTML gives content a structure. CSS rules select parts of that structure and set their presentation. Add this inside the HTML `head`:

```html
<link rel="stylesheet" href="style.css">
```

`rel="stylesheet"` tells the browser what the linked file is for; `href` gives its location relative to the HTML page. If you move the stylesheet to a `styles` folder, change the path to `styles/style.css`. Save both files and reload. Use Network in developer tools to check that the CSS request succeeds.

Inside the HTML `main`, try:

```html
<section class="observation" id="park-note">
  <h2>Stadtpark</h2>
  <p>A shaded route through the park.</p>
</section>
```

In `style.css`, add:

```css
.observation {
  color: #172a35;
  background: #ffffff;
  padding: 1rem;
}
```

The selector `.observation` matches the HTML `class="observation"`. The dot belongs in CSS, not in the HTML class value. Inside braces, each declaration has a property, a colon, a value, and a semicolon. One rule can style many elements. Each element can have several classes, such as `class="observation selected"`.

You may also see CSS in a `<style>` element in HTML or a `style` attribute on one element. Use the separate stylesheet for these exercises so the page's structure and visual rules are easy to find.

## 2. Choose the right selector

| Selector | What it matches | When it helps |
| --- | --- | --- |
| `*` | Every element | A shared box-sizing rule |
| `p` | All paragraphs | Default paragraph spacing |
| `.observation` | Any element with this class | Style several observation cards |
| `#park-note` | The element with this unique ID | A specific element; IDs also connect labels and scripts |
| `h1, h2` | Either heading type | Apply the same rule to several selectors |
| `.observation p` | All descendant paragraphs | Style text inside a card, even inside another wrapper |
| `.observation > p` | Only direct-child paragraphs | Leave more deeply nested paragraphs alone |
| `input[type="number"]` | Inputs whose type attribute is `number` | Style coordinate fields |
| `button:hover` | A button under the pointer | Give pointer feedback |
| `button:disabled` | A disabled button | Show an action is unavailable |
| `:focus-visible` | An element with browser-indicated visible focus | Help keyboard users locate their current control |
| `.observation.selected` | One element with both classes | Highlight an active card |
| `.observation::before` | A generated box before its content | Add decoration, such as a target line; keep essential text in HTML |

A space in `.observation .selected` means a selected element *inside* an observation. Without the space, both classes must be on the same element. Classes are reusable; each ID must be unique on a page.

Try `p { color: #005a8d; }`, then `.observation p { color: #172a35; }`. Inspect the paragraph's Styles panel. For ordinary rules of the same origin and cascade layer, specificity decides which rule wins. A class is more specific than an element type; an ID is more specific than a class. When specificity is equal, the later rule wins. The Inspector crosses out declarations that lost. Avoid solving every conflict with `!important`.

Some properties, such as text colour and font, normally inherit from a parent. Layout properties such as margin do not. Start with body defaults:

```css
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  background: #f5f7f8;
  max-width: 60rem;
  margin: auto;
  padding: 1rem;
}
:focus-visible { outline: 3px solid #8a3500; outline-offset: 3px; }
```

Reference: [MDN CSS selectors](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Basic_selectors).

## 3. Understand the box model

Each displayed element occupies a box. From the inside out, its parts are content, padding, border, and margin.

| Part | What it controls |
| --- | --- |
| Content | Space for text, images, or children |
| Padding | Space between content and border; it shares the background |
| Border | The edge around content and padding |
| Margin | Space outside the border separating it from other boxes |

With default `content-box` sizing, `width: 200px`, `padding: 10px`, and `border: 2px solid` produce an outer border-box width of 224 pixels: 200 + 20 + 4. Horizontal margins would add more space around it. With `box-sizing: border-box`, the declared 200 pixels includes padding and border.

```css
/* Give elements and their generated boxes predictable widths. */
*, *::before, *::after { box-sizing: border-box; }
.observation { border: 2px solid #176b58; margin-bottom: 1rem; }
img { max-width: 100%; height: auto; }
```

Select the section in Inspector and find its box-model diagram. Change padding from 1rem to 2rem and compare it with changing margin. Inspector edits disappear on reload; copy the intended rules into your stylesheet.

`rem` is relative to the root font size; `px` is a CSS pixel. Percentage widths refer to the containing block. A maximum width adapts more easily to a phone than a fixed 1200-pixel width. Vertical margins between ordinary block elements can collapse into one margin; `gap` in flex/grid containers avoids relying on those margins to separate children.

Reference: [MDN box model](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model).

## 4. Position and normal flow

In normal flow, block elements such as sections usually appear one below another. Start there. Use flex or grid for the main page layout; positioning is useful for a badge, overlay, or persistent control.

| `position` value | Behaviour | Example |
| --- | --- | --- |
| `static` | Default normal flow; inset properties do not move it | A paragraph |
| `relative` | Keeps its original space but can be offset; establishes a reference for positioned descendants | A card containing a badge |
| `absolute` | Removed from normal flow; usually positioned relative to its nearest positioned ancestor | A badge in the card's corner |
| `fixed` | Removed from normal flow; usually positioned relative to the viewport | A persistent help control |
| `sticky` | Stays in flow, then sticks at an inset within its scrolling container | A section heading or map alongside a narrative |

```css
.observation { position: relative; }
.badge { position: absolute; top: 0.5rem; right: 0.5rem; }
```

To try it, put `<span class="badge">Example</span>` inside your observation section. The section becomes the badge's reference box. Since the badge no longer reserves space, it may cover text; allow room or keep it in normal flow instead.

`top`, `right`, `bottom`, and `left` specify insets. `z-index` helps control overlap within stacking contexts; a huge value does not automatically place an element above everything. Sticky positioning needs an inset such as `top: 1rem`, enough space to move, and a suitable scroll container. Keep map controls and form labels visible when adding overlays.

Reference: [MDN positioning](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Positioning).

## 5. Flexbox for a row or column

Flexbox arranges a container's direct children along one main axis. It works well for a row of map controls that should wrap on a narrow screen.

```html
<div class="map-controls">
  <button type="button">Show all</button>
  <button type="button">Show parks</button>
</div>
```

```css
.map-controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-start;
  align-items: center;
}
```

`flex-direction` chooses a row or column. `justify-content` distributes free space on that main axis; `align-items` aligns items across it. `gap` separates items and `flex-wrap` lets them form another line. These properties belong to the parent. `flex: 1` on a child lets it grow to share available space.

The buttons need JavaScript before they can filter a map. Here they only demonstrate layout. Reference: [MDN Flexbox](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox).

## 6. Grid for rows and columns

Grid is useful when you want explicit column and row tracks, such as narrative text beside a map. In the [story-map snippet](../code_snippets/05_story_map/), the `.layout` container has two child boxes.

```css
.layout { display: grid; gap: 1rem; }
@media (min-width: 48rem) {
  .layout { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
}
#map { height: 60vh; min-height: 20rem; }
```

Below the breakpoint the children stack. Above it, two columns share the available width. `fr` divides free space between tracks; `minmax(0, 1fr)` lets a track shrink below its contents' preferred width. `grid-template-rows` sets row tracks; `grid-column: span 2` lets an item cover two columns when those columns exist.

Use flex when alignment primarily follows one row or column; use grid when controlling both dimensions helps. They can be nested. Keep the HTML reading order sensible rather than using visual reordering to hide a confusing structure. A map still needs an explicit height; neither grid nor flex supplies one automatically.

Reference: [MDN Grid](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids).

Explore the [page layout snippet](../code_snippets/08_page_layout/): its navigation uses flex, and its main content uses grid. Resize the page to see two columns become one.

## Connection to digital geographies

Visual prominence shapes how readers interpret a place. A large map beside a small account may make the basemap seem more authoritative than local testimony. Colour can imply categories or danger, and a legend is needed to explain what the symbols mean. A phone layout changes which account a reader encounters first.

Use [Roth's review of cartographic visual storytelling](https://doi.org/10.1080/00087041.2019.1633103) to think about emphasis and sequence, then connect these design choices to the [digital-geographies readings](../README.md#digital-geographies). Ask what your styling brings forward, what it pushes aside, and whether your design remains usable without colour alone.


## Documentation and video to keep nearby

| Resource | Content |
| --- | --- |
| [w3 school's CSS Tutorial](https://www.w3schools.com/css/css_intro.asp) | Reference for CSS properties and selectors. There is also small quizzes that can help you to practice. |
| [web.dev Learn CSS](https://web.dev/learn/css) | In-depth articles that explain the basics of CSS. |
| [Learn CSS in 20 Minutes; Web Dev Simplified](https://youtu.be/1PnVor36_40?si=x50MF-9-JECDPdCG) | Fundamental concepts of web development with CSS. |

## Exercise: readable on a phone

Style your place page. Match an HTML class with a CSS rule, add padding and a border to its section, and keep keyboard focus visible. Try a flex row of buttons and a grid holding two sections. Test at 375 pixels wide and in a wide window.

In Inspector, find one matched selector, one inherited property, and the box-model diagram. Temporarily position a badge in a section and check whether it covers content. Keep it only if it remains readable.

You are done when there is no horizontal scrolling, the focused control is visible, and you can explain when you chose flex, grid, or normal flow. Describe one way your colours or layout might affect how a reader understands the place.
