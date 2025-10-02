import { createAdvertList } from './data.js';
import { numWord } from './utils.js';

const ApartmentTypes = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'Отель': 'hotel'
};

const mapCanvas = document.querySelector('.map__canvas');
const similarAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAdverts = createAdvertList();
const similarAdvertFragment = document.createDocumentFragment();


const createAdvertFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();

  features.forEach((element) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${element}`);
    featuresFragment.appendChild(feature);
  });

  return featuresFragment;
};


const createAdvertPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  photos.forEach((photoSrc) => {
    const newPhoto = document.createElement('img');
    newPhoto.classList.add('popup__photo');
    newPhoto.src = photoSrc;
    newPhoto.alt = 'Фотография жилья';
    newPhoto.setAttribute('width', '45');
    newPhoto.setAttribute('height', '40');
    photosFragment.appendChild(newPhoto);
  });

  return photosFragment;
};


const renderSimilarAdverts = () => {
  similarAdverts.forEach(({author,offer}) => {
    const advertElement = similarAdvertTemplate.cloneNode(true);

    advertElement.querySelector('.popup__title').textContent = offer.title;
    advertElement.querySelector('.popup__text--address').textContent = `${offer.address.lat}${offer.address.lng}`;
    advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    advertElement.querySelector('.popup__type').textContent = ApartmentTypes[offer.type];
    advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${numWord(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${numWord(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
    advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    advertElement.querySelector('.popup__description').textContent = offer.description;
    advertElement.querySelector('.popup__avatar').src = author.avatar;

    const advertFeaturesList = advertElement.querySelector('.popup__features');
    advertFeaturesList.innerHTML = '';

    if (offer.features) {
      const newFeatureElements = createAdvertFeatures(offer.features);

      advertFeaturesList.appendChild(newFeatureElements);
    } else {
      advertFeaturesList.remove();
    }

    const advertPhotosList = advertElement.querySelector('.popup__photos');
    advertPhotosList.innerHTML = '';

    if (offer.photos) {
      const newPhotoElements = createAdvertPhotos(offer.photos);
      advertPhotosList.appendChild(newPhotoElements);
    } else {
      advertPhotosList.remove();
    }

    similarAdvertFragment.appendChild(advertElement);

  });

  mapCanvas.appendChild(similarAdvertFragment);
};


export { renderSimilarAdverts };


