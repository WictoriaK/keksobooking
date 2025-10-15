import {isEscapeKey} from './utils.js';

const ALERT_SHOW_TIME = 5000;

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const closeErrorButton = errorPopup.querySelector('.error__button');


const keydownHandlerSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successPopup.remove();
    document.removeEventListener('keydown', keydownHandlerSuccess);
  }
};

const closeSuccessModal = () => {
  successPopup.remove();
  document.removeEventListener('keydown', keydownHandlerSuccess);
};

const showSuccessModal = () => {
  document.body.appendChild(successPopup);
  document.addEventListener('keydown', keydownHandlerSuccess);
  document.addEventListener('click', closeSuccessModal);
};


successPopup.addEventListener('click', closeSuccessModal);

const keydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorPopup.remove();
    document.removeEventListener('keydown', keydownHandler);
  }
};

const closeErrorModal = () => {
  errorPopup.remove();
  document.removeEventListener('keydown', keydownHandler);
};

const showErrorModal = () => {
  document.body.appendChild(errorPopup);
  document.addEventListener('keydown', keydownHandler);
  document.addEventListener('click', closeErrorModal);
};


closeErrorButton.addEventListener('click', closeErrorModal);
errorPopup.addEventListener('click', closeErrorModal);


const showGetDataAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {showGetDataAlert, showSuccessModal, showErrorModal};
