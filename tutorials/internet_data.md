# 10. REST APIs, GET requests, and changing data

[Tutorial index](README.md) · Next: [OGC web services](ogc_webservices.md)

Allow 60 minutes. Complete JavaScript and GeoJSON first. Copy `code_snippets/04_internet_data` to `practice/live_data` and serve it with Live Server.

## Cheatsheet

| Term | Meaning |
| --- | --- |
| API | An interface another program can call |
| Endpoint | A URL provided by an API |
| REST | An approach to exposing resources through HTTP |
| GET | Request a representation of a resource |
| POST | Send data for a server to process, often creating a record |
| Status | HTTP result, such as 200, 404, or 429 |
| JSON / GeoJSON | Data formats, not communication protocols |
| CORS | Server-controlled permission for cross-origin browser reads |
| Polling | Repeated requests for updated data |
| Streaming | Reading chunks or events as they arrive |

## 1. Inspect a request

The starter requests the [USGS past-day earthquake GeoJSON feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson). Results change. This is a GET feed; it is not a database for your project responses. The [USGS feed documentation](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) explains its properties and coordinates.

Open developer tools, select **Network**, and reload. Select the GeoJSON request. Find its URL, GET method, HTTP status, and response body. Find one feature's `properties.place` and `geometry.coordinates`. The depth value in this USGS feed has a provider-specific meaning; consult its schema rather than assuming every third coordinate is a height above ground.

A query string starts with `?`; `&` separates parameters. For example, the [USGS catalogue API](https://earthquake.usgs.gov/fdsnws/event/1/) supports requests with `format=geojson`, a date range, and spatial limits. These parameters only work where the provider documents them. The summary feed URL already selects a fixed time window.

## 2. Wait for a response and check it

Find this pattern in the starter:

```js
async function readData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
}
```

`fetch` returns a Promise, a result that will be available later. `await` waits inside an `async` function. The browser can still respond to the user. A 404 response does not automatically reject `fetch`; check `response.ok`. Catch errors and display a useful message. The starter also limits request time so the button cannot stay disabled forever.

Use the starter's local demo option when the feed is unavailable. Its points are invented and labelled as demo data, not silently presented as live earthquakes. The last successful map stays visible if a refresh fails, and the message tells you it was not updated.

## 3. Understand cross-origin errors

A browser page at `localhost` and an API at another host have different origins. The API must allow that browser request through CORS headers. A URL can work in a browser tab yet fail when JavaScript tries to read it from your page.

`mode: "no-cors"` does not make JSON readable; it produces an opaque response. Do not turn off browser security or send participant data through random public proxies. Use an endpoint that supports browser access, download permitted public data and serve it locally, or ask the instructor about an approved server.

Keep private API keys out of browser code and GitHub. Anyone who receives a web page can inspect its source and network requests.

## 4. Poll at a reasonable interval

Check **Refresh every 60 seconds** in the starter. The script waits until a request finishes before scheduling another, replaces the old feature layer, and offers a way to stop. This is polling. The feed can remain unchanged between requests.

Only request as often as the provider permits. Handle `429` as a rate-limit response; stop and check the provider's guidance before retrying. Our starter stops automatic updates on any failure. For a historical analysis, save a permitted snapshot with its source and retrieval date rather than relying on tomorrow's live feed.

## 5. Read a streamed response

A single HTTP response can arrive in chunks. In the Console on your local starter page, run the following, then call `inspectStream()`:

```js
async function inspectStream() {
  try {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const reader = response.body.getReader();
    let bytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.length;
      console.log("Bytes received:", bytes);
    }
  } catch (error) {
    console.error("Could not read the stream:", error);
  }
}
```

This counts incoming bytes. It does not parse features incrementally. A chunk may split a JSON string in half, so calling `JSON.parse` on each chunk is wrong. `response.json()` is simpler when you need the complete ordinary GeoJSON document. A response body can only be consumed once.

A continuing stream is different again. Server-sent events use `EventSource` with a server that emits `text/event-stream`; WebSockets support communication in both directions. You cannot turn the USGS summary feed into an event stream by passing its URL to `EventSource`. A real-time sensor project needs a documented streaming endpoint, a message schema, reconnect behaviour, and a stop control. Live Server and GitHub Pages only serve static files; they do not create such an endpoint.

References: [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [readable streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams), [server-sent events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events).

## Exercise: inspect, fail, and recover

1. Load the live feed and record the retrieval time and feature count.
2. Switch to the demo file and explain why its result differs.
3. Temporarily change the demo URL in `app.js` to a nonexistent filename. Reload and request demo data. Find the 404 in Network and the visible failure message.
4. Restore the filename, reload, and confirm recovery.
5. Run `inspectStream()` and record its final byte count. Explain why it is not a feature count.

You are done when you can distinguish a failed request, a successful empty collection, polling, and a streamed response. Never describe an empty response as proof that nothing happened in the world.
