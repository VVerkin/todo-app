import {data} from '../script.js';

// Ф-я принимает заголовок и добавляет его в качестве заголовка
const createLogo = title => {
// Создаем в верстке эл-т h3
  const h3 = document.createElement('h3');
  // Добавляем содержимое в заголовок
  h3.textContent = `${title}`;
  // Возвращаем получившийся заголовок
  return h3;
};

// Ф-я принимает параметры и по ним кнопки
const createButtonsGroup = params => {
// Создаем обертку для кнопок
  const btnWrapper = document.createElement('div');
  // Добавляем класс для обертки
  btnWrapper.classList.add('btn-wrapper');
  //params - массив, перебераем его с помощью map
  //map передаем данные, на основе которых будут получаться кнопки
  //в скобках деструктурируем className, type, text
  const btns = params.map(({className, type, text}) => {
    // Создаем сами кнопки
    const button = document.createElement('button');
    // Заполняем кнопки данными
    button.type = type;
    button.textContent = text;
    button.className = className;
    // Возвращаем получившуюся кнопку
    return button;
  });
  // Вставляем btns в btnWrapper
  btnWrapper.append(...btns); // Т.к. мы не можем вставить массив в обертку,
                            // мы раскладываем его с помощью спред-оператора

  return {
    btnWrapper,
    btns,
  };
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
    <input type="text" name="task" class="form-control" placeholder="ввести задачу" required>
</label>
    `);
  // Добавляем кнопки
  const formButton = createButtonsGroup([
    {
      className: 'btn btn-primary me-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-warning',
      type: 'reset',
      text: 'Очистить',
    },

  ]);
  // Вставляем в форму сразу деструктурированные кнопки без обертки
  form.append(...formButton.btns);

  return form;
};

// Ф-я создает таблицу
const createTable = () => {
// Создаем обертку для таблицы
  const tableWrapper = document.createElement('div');
  // Добавляем стили обертке
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
  tableWrapper.append(table);
  table.tbody = tbody;

  return {
    tableWrapper,
    table,
    tbody,
  };
};

const createRow = ({task}) => {
  const tr = document.createElement('tr');
  tr.classList.add('table-light');

  // tr.insertAdjacentHTML('afterbegin', `
  // <td class='task-id'>${id}</td>
  // <td class='task'>${task}</td>
  // <td class='stat'>${stat}</td>
  // <td class='btns'>
  //     <button class="btn btn-danger me-3">
  //     Удалить
  //     </button>
  //     <button class="btn btn-success">
  //     Завершить  
  //     </button>
  // </td>
  // `);
  const tdIndex = document.createElement('td');
  tdIndex.textContent = data.length;

  const tdTask = document.createElement('td');
  tdTask.classList.add('task');
  tdTask.textContent = task;


  const tdStatus = document.createElement('td');
  tdStatus.classList.add('status');
  tdStatus.textContent = 'В процессе';

  const tdAction = document.createElement('td');
  // Добавляем кнопки
  const rowButton = createButtonsGroup([
    {
      className: 'btn btn-danger me-3',
      type: 'button',
      text: 'Удалить',
    },
    {
      className: 'btn btn-success',
      type: 'button',
      text: 'Завершить',
    },

  ]);

  tdAction.append(...rowButton.btns);

  tr.append(tdIndex, tdTask, tdStatus, tdAction);

  return tr;
};

export default {
  createLogo,
  createButtonsGroup,
  createForm,
  createTable,
  createRow,
};
