// Load a CSV layer
const CSV_URL = "https://data.graz.gv.at/graz/wp-content/uploads/2024/06/ParkRide.csv";
const PROXY = 'https://corsproxy.io/?';

async function addCSVData() {
    const response = await fetch(PROXY + CSV_URL);

    if (!response.ok) {
        throw new Error("Network response failed");
    }

    let csvData = await response.text();
    let csv = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
    });

    let markerStyle = {
        color: "#ff0000",
        fillColor: "#ff0000",
        fillOpacity: 0.5,
        radius: 20,
    };

    csv.data.forEach(function (row) {
        let lat = Number(row.LAMBDA.replace(",", "."))
        let lon = Number(row.PHI.replace(",", "."))
        L.circle([lon, lat], markerStyle).bindPopup(row.NAME).addTo(map);
    });

    return response;
}