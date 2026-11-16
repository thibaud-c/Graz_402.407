// This short provided extension turns our collection into a downloadable text file.
const downloadLink = document.querySelector("#download");
downloadLink.addEventListener("click", function (event) {
  // Our one export test: there must be at least one saved idea.
  if (collection.features.length === 0) {
    event.preventDefault();
    recordStatus.textContent = "Save an idea before downloading.";
    return;
  }
  const text = JSON.stringify(collection, null, 2); // Turn the object into readable JSON.
  // A data URL contains the file's text. The HTML download attribute names the file.
  // shortcut: suitable for a few classroom records; use a Blob for larger exports.
  downloadLink.href = "data:application/geo+json;charset=utf-8," + encodeURIComponent(text);
});
