//import markerIcon from './images/icon-location.svg'
// const markerIcon = new Image();
// markerIcon.src = "./images/icon-location.svg"

// console.log(markerIcon)

const markerIcon = L.icon({
    iconUrl: './images/icon-location.svg',
    iconSize: [30, 40],
    iconAnchor: [14, 39],
    popupAnchor: [-3, -76],
    shadowUrl: '',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

// SET DEFAULT LOCATION TO BROOKLYN NEW YORK
const location = [40.650002, -73.949997];  
const map = L.map('map').setView([location[0]+0.05, location[1]], 11);
let marker = L.marker(location, {icon: markerIcon}).addTo(map);
//marker.setIcon(markerIcon);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const mainForm = document.getElementById('main-form');
const mainInput = document.getElementById('main-input');
const ipAddressValue = document.getElementById('ip-address');
const locationValue = document.getElementById('location');
const timezoneValue = document.getElementById('timezone');
const ispValue = document.getElementById('isp');



function trackNewLocation(latLong) {
    const newLocation = latLong;
    map.setView([newLocation[0]+0.05, newLocation[1]], 11);
    marker.remove();
    marker = L.marker(newLocation, {icon: markerIcon}).addTo(map);
}

const getIpGeoLocation = async (ipAddressInput) => {
    try{
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_0ikX39tjCgmNOHENM0xDG3OqM1EXi&ipAddress=${ipAddressInput}`);
        if(!res.ok) throw new Error('Something wrong : cannot track the IP address')
        const data = await res.json();

        const newLatLong = [data.location.lat, data.location.lng];
        ipAddressValue.innerText = data.ip;
        locationValue.innerText = data.location.city + ", " + data.location.region + " " + data.location.postalCode;
        timezoneValue.innerText = "UTC" + data.location.timezone;
        ispValue.innerText = data.isp;
        
        trackNewLocation(newLatLong);
    }
    
    catch(err){
        alert(err.message);
    }
}

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const ipAddressInput = mainInput.value
    mainInput.value = '';
    getIpGeoLocation(ipAddressInput)
})


getIpGeoLocation('');





