


const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_PRICE = 100000;

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


const setUnactiveFormFieldsState = (formFields) => formFields.forEach(field => field.disabled = true);

const setUnactiveFormState = () => {
  advertForm.classList.add('.ad-form--disabled');
  mapFormFilters.classList.add('.ad-form--disabled');

  setUnactiveFormFieldsState(advertFormFields);
  setUnactiveFormFieldsState(mapFormFields);
  mapFormFeatures.disabled = true;
};

const setActiveFormFieldsState = (formFields) =>  formFields.forEach(field => field.disabled = false);

const setActiveFormState = () => {
  advertForm.classList.remove('.ad-form--disabled');
  mapFormFilters.classList.remove('.ad-form--disabled');

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
  const price = parseInt(value);
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

const onTimeInChange = () => advertTimeOut.value = advertTimeIn.value;
const onTimeOutChange = () =>  advertTimeIn.value = advertTimeOut.value;


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

advertTimeIn.addEventListener('change', onTimeInChange);
advertTimeOut.addEventListener('change', onTimeOutChange);

advertRoomNumber.addEventListener('change', () => {
  pristine.validate(advertCapacity);
});

advertCapacity.addEventListener('change', () => {
  pristine.validate(advertCapacity);
});

pristine.addValidator(advertTitleElement, validateAdvertTitle, 'Обязательное поле. Длинна от 30 до 100 символов');
pristine.addValidator(advertPriceElement, validateAdvertPrice, getPriceErrorMessage);
pristine.addValidator(advertCapacity, validateCapacity, getCapacityErrorMessage);


advertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

// setUnactiveFormState();
