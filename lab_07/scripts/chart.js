// Chart.js draws inside the HTML canvas. Make one bar chart and reuse it.
const chart = new Chart(document.querySelector("#chart"), {
  type: "bar",
  data: {
    labels: [],
    datasets: [{
      label: "Mapped suggestions",
      data: [],
      backgroundColor: "#176b57"
    }]
  },
  options: {
    maintainAspectRatio: false,
    animation: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 8, // Keep the same scale for both views of the eight requests.
        ticks: { stepSize: 1 },
        title: { display: true, text: "Mapped suggestions" }
      }
    }
  }
});

function showCounts(labels, counts) {
  chart.data.labels = labels;             // Names under the two bars.
  chart.data.datasets[0].data = counts;   // Heights of the two bars.
  chart.update();                        // Redraw using those values.

  // Show the counts as ordinary text too, including for screen readers.
  document.querySelector("#counts").textContent =
    labels[0] + ": " + counts[0] + " · " + labels[1] + ": " + counts[1];
}
