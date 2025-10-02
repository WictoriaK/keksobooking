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
const num_word = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;

  if(value > 10 && value < 20) {
    return words[2];
  }

  if(num > 1 && num < 5) {
    return words[1]
  };

  if(num === 1) {
    return words[0];
  }

  return words[2];
}

export {getRandomPositiveInteger, getRandomArrayElement, getRandomFloatNumber,  num_word};

