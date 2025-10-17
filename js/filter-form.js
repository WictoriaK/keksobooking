import {clearMarker} from './map.js';

const DEFAULT_VALUE = 'any';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housePrice = mapFilters.querySelector('#housing-price');
const houseRooms = mapFilters.querySelector('#housing-rooms');
const houseGuests = mapFilters.querySelector('#housing-guests');
const featuresFilter = mapFilters.querySelectorAll('.map__checkbox');


const priceMapFilter = {
  low: {
    start: 0,
    end: 10000,
  },
  middle: {
    start: 10000,
    end: 50000,
  },
  high: {
    start: 50000,
    end: 1000000,
  },
};

const checkHousingType = (advert) => housingType.value === advert.offer.type || housingType.value === DEFAULT_VALUE;

const checkHousePrice = (advert) => housePrice.value === DEFAULT_VALUE || (advert.offer.price >= priceMapFilter[housePrice.value].start && advert.offer.price <= priceMapFilter[housePrice.value].end);

const checkHouseRooms = (advert) => Number(houseRooms.value) === advert.offer.rooms || houseRooms.value === DEFAULT_VALUE;

const checkHouseGuests = (advert) => Number(houseGuests.value) === advert.offer.guests || houseGuests.value === DEFAULT_VALUE;

const checkHouseFeatures = (advert) => {
  const checkedFeatures = Array.from(featuresFilter).filter(feature => feature.checked).map(feature => feature.value);

  if (checkedFeatures.length === 0) {
    return true;
  }

  if (!advert.offer.features) {
    return false;
  }

  return checkedFeatures.every(feature => advert.offer.features.includes(feature));
};

const checkAllFilters = (adverts) => adverts.filter((advert) =>
  checkHousingType(advert) &&
  checkHousePrice(advert) &&
  checkHouseRooms(advert) &&
  checkHouseGuests(advert) &&
  checkHouseFeatures(advert)
);


const onFilterChange = (cb, adverts) => {
  mapFilters.addEventListener('change', () => {
    clearMarker();
    const filteredAdverts = checkAllFilters(adverts);
    cb(filteredAdverts);
  });
};

export {onFilterChange, checkAllFilters};
