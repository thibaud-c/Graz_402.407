// Read the IDs in index.html first. The # selector finds one HTML element.
// These variables refer to elements, not copies of their text.
const button = document.querySelector("#count-button");
const output = document.querySelector("#count");
// let allows reassignment. The counter exists only while this page is open.
let count = 0;
// Register a callback: the function runs later, once for each button click.
button.addEventListener("click", function () {
  // Update the stored number before drawing its new value.
  count = count + 1;
  // textContent changes visible text without interpreting HTML.
  // Backticks allow ${count} to insert the current value into the sentence.
  output.textContent = `Recorded stops: ${count}`;
  // Open the browser Console to see this debugging message. It is not page content.
  console.log("Current count:", count);
});
