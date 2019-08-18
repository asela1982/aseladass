
//////////////
// leaftlet///
//////////////
var mymap = L.map('map').setView([25, 0], 2);

L.marker([6.9271, 79.8612]).bindPopup('BSc in Physical Sciences').addTo(mymap)
L.marker([48.8566, 2.3522]).bindPopup('MBA in International Finance').addTo(mymap)
L.marker([30.2672, -97.7431]).bindPopup('Program in Data Analytics and Visualization').addTo(mymap)
L.marker([1.3521, 103.8198]).bindPopup('Tableau Conference on Tour').addTo(mymap)
L.marker([45.5017, -73.5673]).bindPopup('John Molson MBA International Case Competition').addTo(mymap)
L.marker([29.7604, -95.3698]).bindPopup('Program in Data Exploration and Introduction to Statistical Learning').addTo(mymap)


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.emerald',
    accessToken: "pk.eyJ1IjoiYXNlbGExOTgyIiwiYSI6ImNqaTJ5MWl6MzFzZmcza255emwxMjBnZGMifQ.fEWF7ZWAMNRFFPG6WGbzGg"
}).addTo(mymap);
