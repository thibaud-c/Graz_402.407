# A short geographic observation in HTML

[HTML tutorial](../../tutorials/html.md) · [Snippet index](../README.md)

Paste this inside the `main` element of your `index.html`. It is a fragment, not a separate complete HTML document.

```html
<!-- A heading groups the paragraph and source into one meaningful section. -->
<section>
  <h2>A place to investigate</h2>
  <p>How does the university campus connect to nearby public space?</p>
  <!-- A descriptive link works without JavaScript. -->
  <p>Background: <a href="https://www.uni-graz.at/en/">University of Graz</a>.</p>
</section>
```

Change the question and inspect the section in your browser. The original empty map rectangle is covered by the CSS box-model exercise; it was a styled container, not a geographic map. Embedded video and Google Maps markup were commented out in the original and are not needed to learn headings, paragraphs, and links.
