// GET DOM ELEMENTS
const mainForm = document.getElementById('main-form');
const mainInput = document.getElementById('main-input');
const ipAddressValue = document.getElementById('ip-address');
const locationValue = document.getElementById('location');
const timezoneValue = document.getElementById('timezone');
const ispValue = document.getElementById('isp');

// CUSTOM MARKER ICON
const markerIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [30, 40],
    iconAnchor: [14, 39],
    popupAnchor: [-3, -76],
});

// SET DEFAULT LOCATION TO BROOKLYN NEW YORK
const firstLocation = [40.650002, -73.949997];  
const map = L.map('map').setView([firstLocation[0]+0.05, firstLocation[1]], 11);
let marker = L.marker(firstLocation, {icon: markerIcon}).addTo(map);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// SET MAP VIEW TO THE [LATITUDE, LONGITUDE] OF THE TARGET
function trackNewLocation(latLong) {
    const newLocation = latLong;
    map.setView([newLocation[0]+0.05, newLocation[1]], 11);  //shifting the map view down from the target to make the marker visible
    marker.remove();
    marker = L.marker(newLocation, {icon: markerIcon}).addTo(map);
}

// GET THE LOCATION, ISP, ETC. DATA FOR THE INPUTTED IP ADDRESS
const getIpGeoLocation = async (ipAddressInput) => {
    try{
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_0ikX39tjCgmNOHENM0xDG3OqM1EXi&ipAddress=${ipAddressInput}`);
        if(!res.ok) throw new Error('Something wrong : cannot track the IP address')
        const data = await res.json();

        // GET THE LATITUDE LONGITUDE DATA
        const newLatLong = [data.location.lat, data.location.lng];

        // SET THE RESULT VALUE TEXT TO THE FETCHED DATA
        ipAddressValue.innerText = data.ip;
        locationValue.innerText = data.location.city + ", " + data.location.region + " " + data.location.postalCode;
        timezoneValue.innerText = "UTC" + data.location.timezone;
        ispValue.innerText = data.isp;
        
        // SET THE MAP VIEW TO THE FETCHED LATITUDE, LONGITUDE DATA
        trackNewLocation(newLatLong);
    }
    
    catch(err){
        alert(err.message);
    }
}

// SUBMIT EVENT LISTENER
mainForm.addEventListener('submit', (e) => {
    e.preventDefault(); //PREVENT RELOAD PAGE FROM SUBMITTING THE FORM
    const ipAddressInput = mainInput.value
    mainInput.value = '';
    
    getIpGeoLocation(ipAddressInput)
})


// GET THE USER IP LOCATION
getIpGeoLocation('');





