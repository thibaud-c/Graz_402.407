# 14. Debug, test, and publish a small website

[Tutorial index](README.md)

Allow 40 minutes. Use a practice page or a separate group repository containing your chosen starter's files at the root.

## Cheatsheet

| Symptom | First check |
| --- | --- |
| Blank page | Browser Console's first error |
| No styles | Network request for CSS, filename and case |
| Blank map area | Map height, Leaflet loading, Console |
| Tiles missing but controls visible | Internet access and tile requests |
| Fetch fails | HTTP status, URL, CORS, response format |
| Works locally but not on Pages | Relative paths and case-sensitive names |
| Button does nothing | Matching ID and attached event handler |

## 1. Make a bug small enough to understand

Save, reload, and reproduce the problem. Write what you expected and what happened. Read the first Console error, click its file/line link, and inspect the variable or element involved. Use `console.log` to inspect one value. Change one thing and test again.

In Network, a 404 often means the path is wrong. A 200 response containing HTML instead of JSON may mean you requested a web page instead of a data endpoint. Inspect the response before changing your parser.

## 2. Test the actual interaction

Ask a classmate to open your project from their own clone. They should not need your personal file paths. Try a phone-sized viewport, keyboard navigation, and a zoomed text size. Labels, visible focus, readable contrast, and a text explanation of map content are part of the page.

For maps, check a known location and the coordinate order. For a story, test every stop. For PPGIS, test invalid inputs, deletion, and the downloaded file. Disable internet access and inspect how loading failures appear. Local GeoJSON can still load from Live Server, but remote libraries and tiles need a connection unless already cached.

## 3. Publish your group site with GitHub Pages

These steps apply to a separate group repository, not the instructor's course repository. Make sure its root contains `index.html`, `style.css`, `app.js`, and any required data files. Use relative paths. Commit and push the named files following the [Git guide](git.md#7-work-in-a-group-repository).

1. A repository administrator opens **Settings > Pages** on GitHub.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose `main` and `/(root)`, then save. If your account or repository settings do not offer this option, ask the instructor to confirm the permitted hosting setup.
4. Wait for the deployment to finish. Use the site link GitHub displays, usually `https://USERNAME.github.io/REPOSITORY/`.
5. Open that URL in a fresh browser tab and test all local assets and interactions again.

An alternative is to put the website in `/docs` and select that folder. A Pages source cannot select any arbitrary nested folder. 

Assume published site files are public. Check sources and image permissions before publishing. Keep participant responses and credentials out. Pages serves the frontend; it does not create a form database.

See [GitHub's Pages instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) for the current settings and availability.

## Exercise: someone else's computer

Publish a harmless practice page or use a local preview if hosting is unavailable. Ask a classmate to complete its main action without help. Record one error or usability problem, fix it, and repeat the action.

You are done when the classmate can open the page and use its main control, there are no unexplained Console errors, and all sources have credits. Record the tested URL, browser, and date. A successful deployment alone is not a successful user test.
