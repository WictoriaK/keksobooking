import {resetSliderElement} from './price-slider.js';
import {sendData} from './api.js';
import {showSuccessModal, showErrorModal} from './api-messages.js';
import {resetMap} from './map.js';

const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_PRICE = 100000;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp', 'avif'];

const housingTypesMinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const roomsAndGuestsAmount = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const advertForm = document.querySelector('.ad-form');
const advertFormFields = advertForm.querySelectorAll('fieldset');
const advertTitleElement = advertForm.querySelector('#title');
const advertPriceElement = advertForm.querySelector('#price');
const advertHousingTypeElement = advertForm.querySelector('#type');
const advertTimeIn = advertForm.querySelector('#timein');
const advertTimeOut = advertForm.querySelector('#timeout');
const advertRoomNumber = advertForm.querySelector('#room_number');
const advertCapacity = advertForm.querySelector('#capacity');
const mapFormFilters = document.querySelector('.map__filters');
const mapFormFields = mapFormFilters.querySelectorAll('.map__filter');
const mapFormFeatures = mapFormFilters.querySelector('.map__features');
const sliderElement = document.querySelector('.ad-form__slider');
const formResetBtn = advertForm.querySelector('.ad-form__reset');
const advertAvatarChooser = advertForm.querySelector('#avatar');
const advertAvatarPreview = advertForm.querySelector('.ad-form-header__preview img');
const advertPhotoChooser = advertForm.querySelector('#images');
const advertPhotoPreview = advertForm.querySelector('.ad-form__drop-zone');


const setUnactiveFormFieldsState = (formFields) => {
  formFields.forEach((field) => {
    field.disabled = true;
    sliderElement.setAttribute('disabled', true);
  });
};

const setUnactiveFormState = () => {
  advertForm.classList.add('ad-form--disabled');
  mapFormFilters.classList.add('ad-form--disabled');

  setUnactiveFormFieldsState(advertFormFields);
  setUnactiveFormFieldsState(mapFormFields);
  mapFormFeatures.disabled = true;
};

const setActiveFormFieldsState = (formFields) => {
  formFields.forEach(field => {
    field.disabled = false;
    sliderElement.removeAttribute('disabled');
  });
};

const setActiveFormState = () => {
  advertForm.classList.remove('ad-form--disabled');
  mapFormFilters.classList.remove('ad-form--disabled');

  setActiveFormFieldsState(advertFormFields);
  setActiveFormFieldsState(mapFormFields);
  mapFormFeatures.disabled = false;
};

// validation
const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form-title__error-text',
  errorTextTag: 'span',
});

const validateAdvertTitle = (advertTitleValue) => advertTitleValue.length >= MIN_LENGTH && advertTitleValue.length <= MAX_LENGTH;

const validateAdvertPrice = (value) => {
  const price = Number(value);
  const housingType = advertHousingTypeElement.value;


  switch (housingType) {
    case 'bungalow':
      return price > housingTypesMinPrice[housingType] && price <= MAX_PRICE;
    case 'flat':
      return price > housingTypesMinPrice[housingType] && price <= MAX_PRICE;
    case 'hotel':
      return price > housingTypesMinPrice[housingType] && price <= MAX_PRICE;
    case 'house':
      return price > housingTypesMinPrice[housingType] && price <= MAX_PRICE;
    case 'palace':
      return price > housingTypesMinPrice[housingType] && price <= MAX_PRICE;
  }
};

const getPriceErrorMessage = () => {
  const housingType = advertHousingTypeElement.value;

  return `Цена должна быть от  ${housingTypesMinPrice[housingType]} и не больше ${MAX_PRICE}`;
};

const onHousingTypeChange = () => {
  const housingType = advertHousingTypeElement.value;
  advertPriceElement.placeholder = housingTypesMinPrice[housingType];
};

advertHousingTypeElement.addEventListener('change', onHousingTypeChange);

const syncTime = (source, target) => {
  target.value = source.value;
};

const validateCapacity = () => {
  const rooms = advertRoomNumber.value;
  const capacity = advertCapacity.value;

  return roomsAndGuestsAmount[rooms].includes(capacity);
};

const getCapacityErrorMessage = () => {
  const rooms = advertRoomNumber.value;
  const allowedCapacities = roomsAndGuestsAmount[rooms];
  const guestText = allowedCapacities.length === 1 ? 'гостя' : 'гостей';

  return `Для ${rooms} ${rooms === '1' ? 'комнаты' : 'комнат'} доступно: ${allowedCapacities.join(', ')} ${guestText}`;
};

advertTimeIn.addEventListener('change', () => syncTime(advertTimeIn, advertTimeOut));
advertTimeOut.addEventListener('change', () => syncTime(advertTimeOut, advertTimeIn));

advertRoomNumber.addEventListener('change', () => {
  pristine.validate(advertCapacity);
});

advertCapacity.addEventListener('change', () => {
  pristine.validate(advertCapacity);
});

pristine.addValidator(advertTitleElement, validateAdvertTitle, 'Обязательное поле. Длинна от 30 до 100 символов');
pristine.addValidator(advertPriceElement, validateAdvertPrice, getPriceErrorMessage);
pristine.addValidator(advertCapacity, validateCapacity, getCapacityErrorMessage);


advertAvatarChooser.addEventListener('change', () => {
  const file = advertAvatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    advertAvatarPreview.src = URL.createObjectURL(file);
  }
});

advertPhotoChooser.addEventListener('change', () => {
  advertPhotoPreview.innerHTML = '';

  const file = advertPhotoChooser.files[0];
  const image = document.createElement('img');
  image.src = URL.createObjectURL(file);
  image.width = 150;
  image.height = 70;
  image.style.objectFit = 'cover';
  image.alt = 'Фото жилья';


  advertPhotoPreview.insertAdjacentElement('beforebegin', image);
  advertPhotoPreview.style.display = 'none';

});

const resetForm = () => {
  advertForm.reset();
  mapFormFilters.reset();
  resetSliderElement();
};

formResetBtn.addEventListener('click', resetForm);

const setAdvertFormSubmit = () => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      sendData(
        () => {
          showSuccessModal();
          resetForm();
          resetMap();
        },
        () => showErrorModal(),
        new FormData(evt.target),
      )
    }
  });
};


export {setUnactiveFormState, setActiveFormState, housingTypesMinPrice, setAdvertFormSubmit, mapFormFilters};
