import {setUnactiveFormState, setActiveFormState} from './form.js';
import {createAdvertList} from './data.js';
import {renderSimilarAdverts} from './similar-adverts.js';

const advertForm = document.querySelector('.ad-form');
const advertFormAddress = advertForm.querySelector('#address');

setUnactiveFormState();

const similarAdverts = createAdvertList();

const TOKYO_COORDINATES = {
  lat: 35.69034,
  lng: 139.75175,
};

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 20],
});

const mainMarker = L.marker(
  {
    lat: TOKYO_COORDINATES.lat,
    lng: TOKYO_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon
  },
);


const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

mainMarker.on('moveend', (evt) => {
  const currentCoordinates = evt.target.getLatLng();
  const currentLat = (currentCoordinates.lat).toFixed(5);
  const currentLng = (currentCoordinates.lng).toFixed(5);
  advertFormAddress.value = `${currentLat},${currentLng}`;
});


const markerGroup = L.layerGroup().addTo(map);

const createAdvertMarker = (advert) => {
  const {location} = advert;
  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      draggable: true,
      icon: pinIcon
    },
  );

  marker.addTo(markerGroup).bindPopup(renderSimilarAdverts(advert));
};

const createSimilarAdverts = () => {
  similarAdverts.forEach((advert) => {
    createAdvertMarker(advert);
  });
};

const initMap = () => {
  map.on('load', setActiveFormState)
    .setView({
      lat: TOKYO_COORDINATES.lat,
      lng: TOKYO_COORDINATES.lng,
    }, 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);


  mainMarker.addTo(map);

  createSimilarAdverts();
};

initMap();


