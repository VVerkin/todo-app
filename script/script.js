// import createElements from './modules/createElements.js';
// import render from './modules/render.js';
const data = [];
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

// Ф-я создает таблицу
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
  // Что бы не возвращать tbody как объект,
  // в сам элемент table добавим свойство tbody (как в контейнер)
  table.tbody = tbody;
  return {
    table,
    tableWrapper,
  };
};

// Ф-я создает строку на основе данных из объекта.
// В скобках сразу проводим деструктуризацию
const createRow = ({number, task, status}) => { 
  // Создаем строку
  const tr = document.createElement('tr');
  // Назначасем класс contact, т.к. записываем контакты людей
  tr.classList.add('table-light');
  // Создаем ячейки
  // в tdDel данных нет, есть кнопки. 
  const tdAct = document.createElement('td');
  // Создаем кнопки
  // Кнопка удалить
  const btnDel = document.createElement('button');
  // Появившиеся кнопки оформляем подготовленным классом
  btnDel.classList.add('btn', 'btn-danger');
  // Добавляем атрибут data-phone
  // btnDel.dataset.task = task;
  // в ячейку tdAct вставляем кнопку
  tdAct.append(btnDel);
  // Кнопка Завершить
  const btnDone = document.createElement('button');
  // Появившиеся кнопки оформляем подготовленным классом
  btnDone.classList.add('btn', 'btn-success');
  // Добавляем атрибут data-phone
  // btnDone.dataset.task = task;
  // в ячейку tdAct вставляем кнопку
  tdAct.append(btnDone);

  // Оформляем омтальные элементы
  const tdNumber = document.createElement('td');
  // В качестве контента берем деструктурированные данные
  tdNumber.textContent = number;
  const tdTask = document.createElement('td');
  // В качестве контента берем деструктурированные данные
  tdTask.textContent = task;
  const tdStatus = document.createElement('td');
  // В качестве контента берем деструктурированные данные
  tdStatus.textContent = status;

  // Вставляем td в tr
  tr.append(tdNumber, tdTask, tdStatus, tdAct);
  // Возвращаем получившуюся строку
  return tr;
};

// Ф-я добавляет элемент в таблицу
const addTaskTable = (item, tbody) => {
  tbody.append(createRow(item));
};

const addTaskData = item => {
  data.push(item);
  console.log('data:', data);
};

// Функция обрабатывает форму
const formControl = (form, tbody) => {
  // Вешаем событе на нажатие кнопки "Добавить" в форме
  form.addEventListener('submit', e => {
    // Убираем стандартную перезагрузку страницы при нажатии на кнопку "добавить"
    e.preventDefault();
    // Создаем FormData и передаем туда форму через e.target
    const formData = new FormData(e.target);
    // Создаем объект, который будет формироваться из введеных пользователем данных в формк=у
    const newTask = Object.fromEntries(formData);
    console.log('newTask:', newTask);

    // Вызываем функцию добавления контакта в таблицу на странице
    addTaskTable(newTask, tbody);
    addTaskData(newTask);
    // Очищаем форму после нажатия кнопки добавить товар
    form.reset();
    // setStorage('tasks', newTask);
  });
};

  // Ф-я при нажатии на кнопку "Удалить" показывает крестики, при нажатии на которые удаляется строка
  const deleteTask = (btnDel, tbody) => {
    // С помощью делегирования m,eltv кликать по list - это вся наша область таблицы
    tbody.addEventListener('click', e => {
      const target = e.target // Назначаем переменную, что бы дальне не писать event.target
      // contains используют если кнопка в единственном виде без содержимого 
      // closest используют когда внутри элемента есть еще элемент. Например, внутри кнопки svg
      if (target.closest('.btn-danger')) {
      // находим родителя у event.target и удаляем его
      // из localstorage
        // removeStorage(target.dataset.phone);
        // из таблицы
        target.closest('.table-light').remove();
      }
    });
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
    list: table.tbody,
    logo,
    form,
    table,
  };
};

// Ф-я принимает элемент и массив с объектами
const renderTasks = (arr) => {
  // Создаем элементы перебирая массив с объектами
  const allRow = arr.map(createRow);
  // выводим результат на страницу
  allRow.forEach(tr => tbody.append(tr));
};


// Ф-я, которая инициализирует наше приложение
  const init = (tbody) => {
    const container = getContainer();
    const title = createLogo();
    const form = createForm();
    renderToDo(container, title, form);

    //В ф-ю передаем list в чистом виде после деструктуризации и data
    renderTasks(data);
    formControl(form, tbody);
  };

  init();