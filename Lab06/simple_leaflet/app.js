const map = L.map('mymap').setView([47.5, 14.5], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([47.0707, 15.4395]).addTo(map)
    .bindPopup('<b>Graz</b><br>City center.').openPopup();

document.querySelector('#zoom-graz').addEventListener('click', () => {
    alert('Zooming to Graz!');
});

function zoomToGraz() {
    mymap.setView([47.06, 15.44], 13);
}