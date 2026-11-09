# PokéAPI: a first API request

Copy this whole folder into `practice/12_pokemon_api` and open `index.html` with Live Server. This example uses ordinary browser JavaScript and no map libraries. Internet access is needed to request data from PokéAPI.

Read `index.html` for the form, `styles/style.css` for its appearance, and `scripts/pokemon.js` for the request and the loop. The two conditions check an empty name and an unsuccessful HTTP response. `try/catch` gives a readable message if the request fails.

Work in pairs for **12 minutes**, using a browser, the Network panel and the [PokéAPI documentation](https://pokeapi.co/docs/v2). You can open the URLs directly or try [the playground](index.html). Make a few deliberate requests; there is no automatic polling.

## 1. Ask for one record, 2 minutes

Open [the Pikachu endpoint](https://pokeapi.co/api/v2/pokemon/pikachu).

- Which part of the URL selects the resource?
- What request method, response status and response format do you observe?
- Predict what will change if you replace `pikachu` with `bulbasaur`. Make that one request.

## 2. Read fields and units, 3 minutes

Find `name`, `height`, `weight` and `types`. Use the documentation to find the units.

- What are Pikachu's height and weight in metres and kilograms?
- Is `types` an object or an array? How would you reach the first type's name?
- In `scripts/pokemon.js`, find the loop. Why is it useful to loop through types rather than always assume there is exactly one?

## 3. Request one page, 3 minutes

Open [three records starting at offset zero](https://pokeapi.co/api/v2/pokemon?limit=3&offset=0). Inspect `count`, `next` and `results`. Then follow the supplied `next` link.

- What do `limit` and `offset` change?
- Does `count` mean three Pokémon were returned? Compare it with `results.length`.
- What would `for (const item of data.results)` visit? Would it visit the whole database?

Record the value you actually see for `count`; you do not need to memorise it.

## 4. Ask for something missing, 2 minutes

Request [this deliberately missing name](https://pokeapi.co/api/v2/pokemon/not-a-real-pokemon-402407).

- What HTTP status do you observe?
- Find `if (!response.ok)` in the playground's script. Why is the test needed?
- What would go wrong if the page tried to read Pokémon fields from every response as though it were successful?

## 5. Connect the API to geography, 2 minutes

Is this response GeoJSON? Could we pass it directly to `L.geoJSON` to locate Pikachu in Graz? Explain what geographic structure and evidence are missing.

Finish with one sentence: **a record can be easy to request without being sufficient to answer our question**. Apply this to a fountain dataset, a PPGIS response or another example from the course.

## Keep your evidence small

Save five short answers in `practice/12_pokemon_api/api_notes.txt`, including one URL, one observed status, one nested property path and one uncertainty. If the service is unavailable, report that result and use the instructor's saved discussion examples. Do not present a failed live request as successful.
