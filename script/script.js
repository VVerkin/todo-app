// import createElements from './modules/createElements.js';
// import render from './modules/render.js';

// Ф-я получает контейнер
const getContainer = () => {
  // Получаем эл-т div
  const container = document.querySelector('.app-container');
  // Назначаем контейнеру необходимые классы
  container.classList.add('vh-100', 'w-100','d-flex','align-items-center','justify-content-center','flex-column');
  // Возвращаем получившийся контейнер
  return container;
};

// Ф-я добавляет логотип в виде загловка
const createLogo = () => {
  // Создаем в верстке эл-т h3
  const h3 = document.createElement('h3');
  // Добавляем содержимое в заголовок
  h3.textContent = 'Todo App';
  // Возвращаем получившийся заголовок
  return h3;
};

// Основная функция
const renderToDo = (container, h3) => {
  container.append(h3);
};

{
// Ф-я, которая инициализирует наше приложение
  const init = () => {
    const container = getContainer();
    const h3 = createLogo();
    renderToDo(container, h3);
  };

  init();
};