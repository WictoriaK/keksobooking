//Функция, возвращающая случайное целое число из переданного диапазона включительно.

const getRandomPositiveInteger = (a, b = 1) => {
  if (a === undefined) {
    throw new Error('Первый параметр должен быть число');
  }

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomFloatNumber = (a, b, digits = 1) => {
  if (a === undefined) {
    throw new Error('Первый параметр должен быть число');
  }

  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

// склонение слов
const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;

  if (value > 10 && value < 20) {
    return words[2];
  }

  if (num > 1 && num < 5) {
    return words[1];
  }

  if (num === 1) {
    return words[0];
  }

  return words[2];
};

const isEscapeKey = (evt) => evt.key === 'Escape';


const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


const throttle = (callback, delayBetweenFrames) => {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getRandomPositiveInteger, getRandomArrayElement, getRandomFloatNumber, numWord, isEscapeKey, debounce};

