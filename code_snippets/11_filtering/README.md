# Whose Graz appears?

A small example to explore. It connects HTML, CSS, JavaScript and webGIS to choices about representation, data, and access. It is a starting point for the understanding and practice of digital geographies.

All six observations, their categories and contributor groups are **invented**.

## Open and experiment

1. Open `index.html` in a browser. It works without an install or build step. When editing in VS Code, use the course's Live Server workflow.
3. Keep `index.html`, `style.css` and `app.js` together. The map library and basemap need internet access. If Leaflet cannot load, the text list and filters still work.

Try to:
- Select **Campus group only**. Which parts of the city now appear to matter?
- Then select **Shade**. Explain the empty result. Does it show that Graz has no shade?
- Reset. Turn map labels on, then hide the basemap. What information belongs to our observations and what came from the background map?
- Choose **Stop E** in the list. How does the closer map view change what you notice?

The controls change what is displayed. They do not delete records or change how the fictional records were collected. Display filtering is an analogy for selective visibility, not a demonstration of an actual platform's collection method or algorithm.


## 🥊 A short coding challenge

Make the changes yourself; compare with a partner.

1. Add a new fictional observation using the existing object structure. Keep latitude and longitude in the expected order and within valid ranges. Does the count update automatically?
2. Add a category and the corresponding HTML option. What information does this classification include or flatten?
3. Choose a different default contributor group. Keep the filter visible and the count truthful. Discuss how a default can influence the first impression.

For each change, record your prediction, what happened, and one geographical implication. Do not add real participant data to this public example.

## Discuss through / by / of the digital

- **Through:** What geographical knowledge can we produce by filtering, mapping and comparing records? What would we need before making claims about the actual city?
- **By:** How might the default view, headings, categories or visual emphasis influence attention and action? This example demonstrates a design change; it does not prove an effect on real behaviour.
- **Of:** What devices, networks, external providers and skills underpin the page? Whose access or language needs have we overlooked?

The lenses overlap. Use them to ask questions rather than placing every feature into one exclusive box. The framework is discussed in [Ash, Kitchin and Leszczynski, 2018](https://kitchin.org/wp-content/uploads/2019/04/PIHG-digital-geog-2018.pdf).

Finish with three sentences: one choice you changed, what changed on the page, and what further evidence you would need to assess its effect on people or places.

## Check your work

Save and reload. Use the browser Console to diagnose errors. Test all records, one group, one category and the empty combination **Campus group + Shade**. Reset should restore all records, hide labels and show the basemap. Try keyboard navigation and a narrow window; the observation list is available alongside the map.

Relevant official documentation: [Leaflet Quick Start](https://leafletjs.com/examples/quick-start/) and [Leaflet API reference](https://leafletjs.com/reference.html), especially CircleMarker, LayerGroup, Tooltip and Map. This example uses Leaflet 1.9.4, consistent with the other course snippets.

The example makes no response submissions and stores no participant data.
