# 12. Story maps and digital geographies

[Tutorial index](README.md) · Next: [PPGIS](ppgis.md)

Allow 40 minutes. Read HTML, CSS, JavaScript, and Leaflet first. This guide introduces a way to communicate geographic knowledge and a few small interactions to try.

## 1. What is a story map?

A story map combines a geographic narrative with one or more maps. Text, images, audio, or other media explain why locations matter and how they relate to one another. Readers may follow a sequence or explore locations in an order they choose.

For example, a story about access to shade could compare a square, a park, and the route between them. The map locates the evidence; the narrative explains the question, observations, and limits. Adding an interactive map to a page is not enough to make a clear argument.

"Story map" describes a form of communication. ArcGIS StoryMaps is one product for making it, but you can also use ordinary HTML, CSS, JavaScript, and Leaflet. No ArcGIS account is required for the snippets here.

## 2. Why does this matter for digital geographies?

Story maps connect spatial evidence to experience. They can make a local account easier to share, compare change across places, or bring an underrepresented perspective into a public conversation. Their sequence and interaction also guide attention. A default map extent may frame an issue as local even when its causes reach far beyond that area.

A story's author selects locations, sources, images, and voices. A polished page can make uncertain claims appear settled. Readers should be able to distinguish an observation from an interpretation and inspect the sources. [Roth's review of visual storytelling in cartography](https://doi.org/10.1080/00087041.2019.1633103) provides concepts for examining these choices.

Before coding, ask: who is telling this story, which places and voices are absent, and what can the reader question or explore? Consider how an account changes when it is read on a phone, with a screen reader, or without the basemap loading.

## 3. The small pieces

| Piece | Role | Question to ask |
| --- | --- | --- |
| A heading and short section | Introduce one claim or observation | Is it clear why this place matters? |
| A location and map view | Put the account in geographic context | Is this scale appropriate? |
| A button or link | Let the reader choose where to focus | Does the control describe its action? |
| A caption and source | Explain evidence, date, and authorship | Can someone check the claim? |

Sketch two short sections before adding interaction. Write their main point and source. Keep a text description of the locations so the account does not rely entirely on the map. Use photographs only with permission and give meaningful alt text.

## 4. Helper snippets to try

Open the [story-map helper snippets](../code_snippets/05_story_map/snippets.md). They show only two reusable pieces:

- connect one HTML button to a new view of an existing Leaflet map;
- store one stop as an object and give its marker a text popup.

Each snippet states what must already exist and where to paste it. Read a few lines, predict their effect, then try them in a copy of the basic Leaflet example. For a runnable reference, the same folder contains a [two-stop demonstration](../code_snippets/05_story_map/index.html) with [commented JavaScript](../code_snippets/05_story_map/app.js). You do not need to copy that whole demonstration to use a helper.

Start with deliberate button clicks. Automatic scrolling and animation are optional design choices, not requirements of a story map. A reader should be able to pause, revisit a section, and follow the argument in the text.

## Useful links

- [Roth, 2021: Cartographic Design as Visual Storytelling](https://doi.org/10.1080/00087041.2019.1633103). Research review. Read the discussion of narrative genres to compare a guided sequence with an exploratory map.
- [Esri: Make Your Story Map Successful](https://www.esri.com/about/newsroom/arcuser/make-your-story-map-successful). Short design advice with examples. The article uses Esri's tools; apply its questions about audience and media to your Leaflet page rather than its product-specific instructions.
- [Leaflet quick start](https://leafletjs.com/examples/quick-start/). Technical reference for map views, markers, popups, and events.
- [Digital Turn, Digital Geographies?](https://eprints.ncl.ac.uk/223990). Broader reading on the relationship between digital technology and geography. Ask how the web page helps produce a particular understanding of a place.

## Exercise: change the viewpoint

Use the button helper to connect two short accounts to two locations in a copy of the basic Leaflet page. Give each account a source or label it as a fictional observation. Change their order and the starting zoom.

You are done when both controls work and the narrative still makes sense without clicking them. Explain how reversing the order or changing the map extent alters the emphasis. Name one perspective missing from your account.
