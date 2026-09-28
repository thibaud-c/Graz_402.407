# Introduction to GIS and digital geographies

University of Graz · 402.407

How do maps on the web shape what we know about places, and whose knowledge do they include? In this course you will build small websites and interactive maps, then use them to tell a geographic story and collect people's observations about places. No previous coding or web development experience is assumed.

We use VS Code, Live Server, HTML, CSS, JavaScript, and Leaflet. 

## Before the first class

Create a [GitHub account](https://github.com/signup). Install [Git](https://git-scm.com/downloads) and [VS Code](https://code.visualstudio.com/download). Use a recent Firefox, Chrome, Edge, or Safari browser.

### Clone the course repository

A repository is a folder of files with a history of changes. Cloning makes a copy on your computer that can receive class updates.

1. Open a separate terminal application:

- Windows: open **PowerShell** from the Start menu.
- macOS: open **Terminal** from Applications > Utilities.
- Linux: open your distribution's **Terminal** application.

2. Run `git --version`. If no version appears, finish installing Git, close the terminal, and reopen it.
3. Create a place for your coursework and clone the repository. Run these commands one line at a time:

```sh
cd ~
mkdir university
cd university
# or navigate to your preferred location
git clone https://github.com/thibaud-c/Graz_402.407.git
cd Graz_402.407
git config pull.rebase false
ls
```

`cd ~` takes you to your home folder. `mkdir` creates a folder, and `cd` enters it. It is recommanded to use the folder you usually use for your classes, the `university` folder is only an example. You should see `README.md`, `tutorials`, and `code_snippets`. Clone once and keep this folder for the course. See [terminal navigation](tutorials/cli.md) if you get lost.

If you cannot install Git yet, use **Code > Download ZIP** on GitHub and extract the ZIP. That copy has no Git history and cannot use `git pull`. Move any work you want to keep into a proper clone once Git is available.

### Open your first page

1. In VS Code choose **File > Open Folder** and select `Graz_402.407`.
2. Open Extensions and install **Live Server** by **Ritwick Dey**, [link](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
3. In Explorer, open `code_snippets/01_web_page/index.html`.
4. Right-click that file and choose **Open with Live Server**.
5. Your browser should show a page about a walk in Graz. Click its button and watch the count change.

The address starts with `http://127.0.0.1` or `http://localhost`. This is a server on your own computer, not a published website. Keep VS Code open while you work. Follow the [VS Code tutorial](tutorials/vscode.md) for saving, previewing, and troubleshooting.

## At the beginning of each class

Save your files. In a terminal, enter your existing course folder:

```sh
# navigate to your preferred location
cd ~/university/Graz_402.407
git status
```

If you have changes, [commit the files you want to keep](tutorials/git.md#3-save-your-work-before-pulling). With a clean working tree, run:

```sh
git pull
```

If Git reports a conflict, follow the [conflict walkthrough](tutorials/git.md#5-resolve-a-merge-conflict). Do not delete your work or clone again to hide a conflict.

## Find the materials

- [Tutorials](tutorials/README.md): a suggested order, short reference tables, guided examples, and a small exercise at the end of each guide.
- [Code snippets](code_snippets/README.md): standalone starting points for class exercises and projects. Copy a whole example folder before editing it.
- [Group contract](templates/group_contract.md): agree on responsibilities, communication, and review before either project.
- [AI tutor instructions](AGENTS.md): ask for hints and explanations while doing your own coursework.

Create a `practice` folder for your experiments. In the second group project, you will need to keep actual participant data outside this repository. A public GitHub repository and its history are public, even if you later delete a file.

## Resources for learning and exploring

Use these alongside the tutorials. Start with one beginner resource and try its examples. Research papers are for discussion; read the abstract and introduction first, then choose a section relevant to your question. Some publisher versions require university access; institutional repositories may offer an accepted manuscript.

### HTML, CSS, and JavaScript

| Resource | Format and level | What to use it for |
| --- | --- | --- |
| [MDN Learn web development](https://developer.mozilla.org/en-US/docs/Learn_web_development) | Free course and documentation; beginner | Work through semantic HTML, CSS styling and layout, then JavaScript. Use the core modules; frameworks are not needed here. |
| [MDN JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) | Reference; beginner to intermediate | Look up arrays, objects, functions, and control flow when a code example uses something unfamiliar. |
| [Chrome DevTools: open the developer tools](https://developer.chrome.com/docs/devtools/open) | Illustrated documentation; beginner | Learn how to inspect HTML/CSS and find the Console. Firefox users can use its [Inspector guide](https://firefox-source-docs.mozilla.org/devtools-user/page_inspector/how_to/open_the_inspector/index.html). |
| [W3C Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/) | Practical guides; beginner | Check page structure, image alternatives, and form labels so more people can use your page. |

### Web GIS and web mapping

| Resource | Format and level | What to use it for |
| --- | --- | --- |
| [Leaflet tutorials](https://leafletjs.com/examples.html) | Official walkthroughs; beginner | Start with Quick Start, then GeoJSON. These use the same mapping library as the class. |
| [Introduction to Web Mapping](https://bgu-geography.com/web-mapping/) | University teaching material; beginner to intermediate | Explore how web maps work and how HTML, JavaScript, geographic data, and mapping libraries fit together. |
| [GeoJSON specification, RFC 7946](https://www.rfc-editor.org/rfc/rfc7946) | Technical standard; reference | Check what a Feature, FeatureCollection, or coordinate array means. Read the examples before the formal rules. |
| [USGS earthquake feed documentation](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) | Data-service documentation; intermediate | Read a real GeoJSON schema and compare it with the internet-data snippet. |

- [OGC web services tutorial](tutorials/ogc_webservices.md): discover standard map and feature services, with links to the official standards.

### Digital geographies

Digital geographies examines how digital technologies are shaped by places and societies, and how they change spatial knowledge, everyday life, and inequalities. Building a map gives us a way to investigate those relationships, as well as a technical skill.

| Resource | Format and level | A question to read with |
| --- | --- | --- |
| [Ash, Kitchin and Leszczynski, 2018: Digital Turn, Digital Geographies?](https://eprints.ncl.ac.uk/223990) | Research paper with repository record; introductory theory | How can geography be produced through, by, and of digital technologies? Start with the introduction. |
| [Digitale Geographien: Über uns](https://digitale-geographien.de/ueber-uns) | Research-network introduction in German; beginner | How do digital interactions change social and spatial relationships? Follow the network's publications and events for more examples. |
| [Elwood, Goodchild and Sui, 2012: Researching Volunteered Geographic Information](https://doi.org/10.1080/00045608.2011.595657) | Research paper; intermediate | Who contributes geographic information, and how does contributing become a social practice? |
| [Roth, 2021: Cartographic Design as Visual Storytelling](https://doi.org/10.1080/00087041.2019.1633103) | Research review; intermediate | How do sequence, emphasis, and interaction shape the story a map tells? |
| [Brown and Kyttä, 2014: Key issues and research priorities for public participation GIS](https://research.aalto.fi/en/publications/key-issues-and-research-priorities-for-public-participation-gis-p/) | Research review and institutional record; intermediate | When does collecting points support participation in decisions, and whose perspectives might be missing? |

The HTML, CSS, JavaScript, and geodata tutorials each connect a technical choice to one of these questions before their exercise. The [story-map](tutorials/story_map.md) and [PPGIS](tutorials/ppgis.md) guides apply these questions to two ways of making geographic knowledge on the web.

## Help improve the class

Reporting errors, suggesting ideas, and sharing useful resources through GitHub discussions **counts as participation**.

1. Open the repository's [Discussions page](https://github.com/thibaud-c/Graz_402.407/discussions) and check whether someone has already raised the topic.
2. If so, add a useful detail to the existing discussion. Otherwise, select **New discussion**.
3. Use a specific title, such as `Lab 01: HTML files does not open on Windows` or `tutorial: video explaining js basics`.
4. For an error, include the file and step, what you ran, what you expected, and the complete error message. Include your operating system.
5. For an idea or resource, explain which course topic it helps with and add the link.
6. Select **Create** or **Submit**, depending on the form shown.

Keep passwords, tokens, and personal data out of discussions. 

## AI use

AI has been used to draft, review, and improve the course materials.
