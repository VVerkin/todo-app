// import createElements from './modules/createElements.js';
// import render from './modules/render.js';

// Ф-я получает контейнер
const getContainer = () => {
  // Получаем эл-т div
  const container = document.querySelector('.app-container');
  // Назначаем контейнеру необходимые классы
  container.classList.add('vh-100', 'w-100','d-flex', 'align-items-center', 'justify-content-center', 'flex-column');
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
// Ф-я cоздает форму для добавления данных
const createForm = () => {
  // Создаем форму
  const form = document.createElement('form');
  // Добавляем классы
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  // Форма статичная, поэтому просто вставляем верстку
  form.insertAdjacentHTML('beforeend', `
  <label class="form-group me-3 mb-0">
    <input type="text" class="form-control" placeholder="ввести задачу">
  </label>
  <button type="submit" class="btn btn-primary me-3">
    Сохранить
  </button>

  <button type="reset" class="btn btn-warning">
    Очистить
  </button>
    `);
  return form;
};


// Основная функция
const renderToDo = (container, h3) => {
  const form = createForm();
  container.append(h3, form);

  return {
    h3,
    form,
  };
};

{
// Ф-я, которая инициализирует наше приложение
  const init = () => {
    const container = getContainer();
    const title = createLogo();
    const form = createForm();
    renderToDo(container, title, form);
  };

  init();
}
