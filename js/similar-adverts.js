import {numWord} from './utils.js';

const ApartmentTypes = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'Отель': 'hotel'
};

const similarAdvertTemplate = document.querySelector('#card').content.querySelector('.popup');

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

const renderSimilarAdverts = (({offer, author}) => {
  const popupElement = similarAdvertTemplate.cloneNode(true);

  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = `${offer.address}`;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = ApartmentTypes[offer.type];
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${numWord(offer.rooms, ['комната', 'комнаты', 'комнат'])} для ${offer.guests} ${numWord(offer.guests, ['гостя', 'гостей', 'гостей'])}`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  popupElement.querySelector('.popup__description').textContent = offer.description;
  popupElement.querySelector('.popup__avatar').src = author.avatar;

  const advertFeaturesList = popupElement.querySelector('.popup__features');
  advertFeaturesList.innerHTML = '';

  if (offer.features) {
    const newFeatureElements = createAdvertFeatures(offer.features);

    advertFeaturesList.appendChild(newFeatureElements);
  } else {
    advertFeaturesList.remove();
  }

  const advertPhotosList = popupElement.querySelector('.popup__photos');
  advertPhotosList.innerHTML = '';

  if (offer.photos) {
    const newPhotoElements = createAdvertPhotos(offer.photos);
    advertPhotosList.appendChild(newPhotoElements);
  } else {
    advertPhotosList.remove();
  }

  return popupElement;

});


export {renderSimilarAdverts, createAdvertPhotos, createAdvertFeatures, ApartmentTypes};


