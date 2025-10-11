
import { housingTypesMinPrice } from "./form.js";

const sliderElement = document.querySelector('.ad-form__slider');
const advertFormPriceElement = document.querySelector('#price');
const advertHousingTypeElement = document.querySelector('#type');
const housingStartType = advertHousingTypeElement.value;


advertFormPriceElement.value = housingTypesMinPrice[housingStartType];

noUiSlider.create(sliderElement, {
  range: {
    min: housingTypesMinPrice[housingStartType],
    max: 100000,
  },
  start: housingTypesMinPrice[housingStartType],
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderElement.noUiSlider.on('update', () => {
  advertFormPriceElement.value = sliderElement.noUiSlider.get();
});

const onAdvertHousingTypeChange = () => {
  const housingType = advertHousingTypeElement.value;

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: housingTypesMinPrice[housingType],
      max: 100000
    },
    start: housingTypesMinPrice[housingType],
    connect: 'lower',
  });
};

advertHousingTypeElement.addEventListener('change', onAdvertHousingTypeChange);
