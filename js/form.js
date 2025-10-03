const advertForm = document.querySelector('.ad-form');
const advertFormFields = advertForm.querySelectorAll('fieldset');

const mapFormFilters = document.querySelector('.map__filters');
const mapFormFields = mapFormFilters.querySelectorAll('.map__filter');
const mapFormFeatures = mapFormFilters.querySelector('.map__features');


const setUnactiveFormFieldsState = (formFields) => formFields.forEach(field => {
  field.disabled = true;
});

const setUnactiveFormState = () => {
  advertForm.classList.add('.ad-form--disabled');
  mapFormFilters.classList.add('.ad-form--disabled');

  setUnactiveFormFieldsState(advertFormFields);
  setUnactiveFormFieldsState(mapFormFields);
  mapFormFeatures.disabled = true;
};

const setActiveFormFieldsState = (formFields) =>  formFields.forEach(field => {
  field.disabled = false;
});


const setActiveFormState = () => {
  advertForm.classList.remove('.ad-form--disabled');
  mapFormFilters.classList.remove('.ad-form--disabled');

  setActiveFormFieldsState(advertFormFields);
  setActiveFormFieldsState(mapFormFields);
  mapFormFeatures.disabled = false;
};


setUnactiveFormState();
