
const userName = prompt('Введите ваше имя');

const getStorage = (key) => {
  // Запрос данных из localStore по ключу и распарсивание полученного объекта
  const localData = JSON.parse(localStorage.getItem(key));
  // Условие, при котором возвращаются данне, а если их нет - пустой массив
  return localData || [];
};
console.log(getStorage());
// Ф-я получает ключ и объект в виде аргументов и дописывает данные в localStorage

const setStorage = (key, obj) => {
  // Вызываем ф-ю, которая получает данные из localStorage и возвращает их.
  const newData = getStorage(key);
  // Добавляем данные (объект) в массив
  newData.push(obj);
  // Отправляем данные в localStorage
  localStorage.setItem(userName, JSON.stringify(newData));
};

const removeStorage = (key, task) => {
  const existingData = getStorage(key);
  const updatedData = existingData.filter(item => item.task !== task);
  localStorage.setItem(userName, JSON.stringify(updatedData));
};

const updateLocalStorage = (arr) => {
  localStorage.setItem(userName, JSON.stringify(arr));
};

export default {
  userName,
  getStorage,
  setStorage,
  removeStorage,
  updateLocalStorage,
};
