// Step 4 loads scripts/app.js from the HTML. // starts a JavaScript comment.
// const gives a value a name. Quotes make this value a piece of text, a string.
// TRY: change only the text between these quotes, then save and reload.
const recordText = "Tags: shade + afternoon.";

// querySelector finds HTML using CSS selector syntax: # means an ID.
const button = document.querySelector("#record-button");
const output = document.querySelector("#record-output");

// These lines run as soon as this script runs, before anyone clicks.
output.textContent = "JavaScript is connected. Click to show the example record.";
button.disabled = false;

// Register an event listener. The function inside runs LATER, on a button click.
button.addEventListener("click", function () {
  // textContent replaces the paragraph's words without interpreting them as HTML.
  output.textContent = recordText;
  // No dot here: we add a class name. CSS uses the selector .recorded to style it.
  output.classList.add("recorded");
  // This message goes to the browser Console, not to the page or the terminal.
  console.log("The button was clicked. The page text changed.");
});
