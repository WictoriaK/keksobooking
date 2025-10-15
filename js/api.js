const GET_DATA_URL = 'https://25.javascript.htmlacademy.pro/keksobooking/data';
const SEND_DATA_URL = 'https://25.javascript.htmlacademy.pro/keksobooking';

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then(response => response.json())
    .then((data) => {
      onSuccess(data);
    }).catch(() => {
    onFail();
  });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_DATA_URL,
    {
      method: 'POST',
      body,
    }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  }).catch(() => {
    onFail();
  });
};

export {getData, sendData}
