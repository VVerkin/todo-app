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

//Ф-я создает таблицу
const createTable = () => {
  const tableWrapper = document.createElement('div');
  // Создаем обертку для таблицы
  tableWrapper.classList.add('table-wrapper');
  // Создаем таблицу
  const table = document.createElement('table');
  // Назначаем классы по bootstrap
  table.classList.add('table', 'table-hover', 'table-bordered');
  // Создаем thead для заголовков таблицы
  const thead = document.createElement('thead');
  // Вставляем верстку шапки таблицы
  thead.insertAdjacentHTML('beforeend', `
    <tr> 
    <th>№</th>
    <th>Задача</th>
    <th>Статус</th>
    <th>Действия</th>
    </tr>
    `);
  // Создаем тело таблицы
  const tbody = document.createElement('tbody');
  // tbody ничего не содержит, поэтому просто вставляем в таблицу
  table.append(thead, tbody); // Важен порядок вставки
  // Что бы не возвращать tbody как объект, в сам элемент table добавим свойство tbody (как в контейнер)
  table.tbody = tbody;
  return {
    table,
    tableWrapper,
  };
};

// Основная функция
const renderToDo = () => {
  const container = getContainer();
  const logo = createLogo();
  const form = createForm();
  // Вызов функции создания таблицы
  const {table, tableWrapper} = createTable();
  container.append(logo, form, tableWrapper, table);
  tableWrapper.append(table);

  return {
    logo,
    form,
    table,
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
