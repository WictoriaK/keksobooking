import './price-slider.js';
import {setAdvertFormSubmit, mapFormFilters, setUnactiveFormState} from './form.js';
import {initMap} from './map.js';
import {createSimilarAdverts} from './similar-adverts.js';
import {getData} from './api.js';
import {showGetDataAlert} from './api-messages.js';
import {onFilterChange} from './filter-form.js';
import {debounce} from './utils.js';

const PINS_AMOUNT = 10;
const RERENDER_DELAY = 500;

setUnactiveFormState();

getData((adverts) => {
    initMap();
    createSimilarAdverts(adverts.slice(0, PINS_AMOUNT));
    onFilterChange(
      debounce((filteredAdverts) => {
        createSimilarAdverts(filteredAdverts.slice(0, PINS_AMOUNT));
      }, RERENDER_DELAY),
      adverts
    )
  },
  () => {
    showGetDataAlert('Не удалось загрузить данные. Попробуйте позже');
    mapFormFilters.classList.add('ad-form--disabled');
  });

setAdvertFormSubmit();
