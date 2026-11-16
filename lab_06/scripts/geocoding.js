// Leaflet Control Geocoder is a library with adapters for place-search APIs.
// We use its Photon adapter, with our own small HTML form. No extra library CSS is needed.
const geocoder = L.Control.Geocoder.photon({ serviceUrl: "https://photon.komoot.io/api/" });
const searchForm = document.querySelector("#search-form");
const searchButton = document.querySelector("#search-button");
const searchStatus = document.querySelector("#search-status");
const searchResults = document.querySelector("#search-results");

async function findPlace(event) {
  event.preventDefault();
  searchButton.disabled = true;
  searchResults.replaceChildren();
  searchStatus.textContent = "Searching for public places…";
  try {
    // The library makes the request and returns an array of candidate places.
    // Nothing runs while typing. Only submitting this form starts a request.
    const query = document.querySelector("#place-name").value;
    const results = await geocoder.geocode(query);
    searchStatus.textContent = results.length + " results. Choose one and check its position.";
    if (results.length === 0) {
      searchStatus.textContent = "No result. Try adding Graz, or click the map instead.";
    }
    for (const result of results) {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = result.name;
      button.addEventListener("click", function () {
        map.setView(result.center, 17);
        chooseLocation(result.center); // Reuse the selection function in map.js.
        searchStatus.textContent = "Selected " + result.name + ". Check or adjust the point on the map.";
      });
      item.append(button);
      searchResults.append(item);
    }
  } catch (error) {
    searchStatus.textContent = "Search unavailable. Click the map or type coordinates in the form.";
  }
  searchButton.disabled = false;
}

searchForm.addEventListener("submit", findPlace);
