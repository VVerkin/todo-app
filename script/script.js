'use strict';

{
  const data = [
    {
      number: 1,
      task: 1,
      stat: 1,
    },
    {
      number: 2,
      task: 2,
      stat: 2,
    },
  ];
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
      <input type="text" class="form-control" placeholder="ввести задачу">
    </label>
      `);
    // Добавляем кнопки
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary me-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-warning',
        type: 'button',
        text: 'Очистить',
      },

    ]);
    // Вставляем в форму сразу деструктурированные кнопки без обертки
    form.append(...buttonGroup.btns);

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


  const renderToDo = (app, title) => {
    // В приложение вставляем заголовок
    const logo = createLogo(title);
    const form = createForm();
    const table = createTable();
    // Добавляем классы
    app.classList.add('vh-100', 'w-100','d-flex', 'align-items-center', 'justify-content-center', 'flex-column');
    // Вставляем на страницу заголовок, формуб таблицу
    app.append(logo, form, table.tableWrapper);

    return {
      list: table.tbody,
    };
  };

  const createRow = ({number, task, stat}) => {
    const tr = document.createElement('tr');
    tr.classList.add('table-light');

    const buttonDel = document.createElement('button');
    buttonDel.classList.add('btn', 'btn-danger');

    const buttonDone = document.createElement('button');
    buttonDone.classList.add('btn', 'btn-success');

    const tdNumer = document.createElement('td');
    tdNumer.textContent = number;

    const tdTask = document.createElement('td');
    tdTask.classList.add('task');
    tdTask.textContent = task;

    const tdStat = document.createElement('td');
    tdStat.textContent = stat;

    const tdAction = document.createElement('td');
    tdAction.append(buttonDel, buttonDone);

    tr.append(tdNumer, tdTask, tdStat, tdAction);

    return tr;
  };


  const renderTasks = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
  };

  // Ф-я принимает селектор приложения с html страницы и заголовок
  const init = (selectorApp, title) => {
    // Получаем элемент по селектору
    const app = document.querySelector(selectorApp);
    // Вызываем renderToDo и передаем туда сразу app
    const toDo = renderToDo(app, title);
    console.log('toDo', toDo);
    // Деструктуризация list, что бы передавать отдельно, а не toDo.list
    const {list} = toDo;
    renderTasks(list, data);

    // Функционал
  };

  window.toDoInit = init;
}
