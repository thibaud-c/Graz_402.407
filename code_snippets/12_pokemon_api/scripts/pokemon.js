// 1. Connect the HTML form to the places where we will show the response.
const form = document.querySelector("#pokemon-form");
const nameInput = document.querySelector("#pokemon-name");
const requestButton = document.querySelector("#request-pokemon");
const apiStatus = document.querySelector("#api-status");
const summary = document.querySelector("#pokemon-summary");
const typesList = document.querySelector("#pokemon-types");
const jsonView = document.querySelector("#response-json");

async function requestPokemon(event) {
  event.preventDefault(); // Use JavaScript instead of opening a new page on submit.
  const name = nameInput.value.trim().toLowerCase();
  if (name === "") {
    apiStatus.textContent = "Enter a Pokémon name or ID.";
    return; // Stop here if there is nothing to request.
  }
  // Keep the API address fixed; insert the requested name as one URL component.
  const url = "https://pokeapi.co/api/v2/pokemon/" + encodeURIComponent(name);
  requestButton.disabled = true;
  apiStatus.textContent = "Requesting " + url;
  try {
    // 2. Wait for the response, check its status, then read its JSON body.
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    const data = await response.json();
    summary.textContent = data.name + " (#" + data.id + "): raw height " + data.height +
      ", raw weight " + data.weight + ". What are these in metres and kilograms?";

    // 3. Some Pokémon have two types. A loop handles each item in the array.
    typesList.replaceChildren();
    for (const slot of data.types) {
      const item = document.createElement("li");
      item.textContent = slot.type.name; // Text from the API is displayed, not executed.
      typesList.append(item);
    }
    jsonView.textContent = JSON.stringify(data, null, 2); // Show readable JSON text.
    apiStatus.textContent = "HTTP " + response.status + ": JSON received from " + url;
  } catch (error) {
    apiStatus.textContent = "Request failed: " + error.message +
      ". The last successful response stays below.";
  }
  requestButton.disabled = false;
}

// Passing the function's name lets the form call it when submitted.
form.addEventListener("submit", requestPokemon);
