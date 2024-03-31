'use strict';

{
  const data = [
    {
      task: 'Купить слона',
    },
  ];

  const addItemData = item => {
    data.push(item);
    console.log('data', data);
  };
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
      form,
    };
  };

  const createRow = ({task}, index) => {
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

  const renderTasks = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
};

  const updateRowNumbers = () => {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach((row, index) => {
      row.querySelector('td:first-child').textContent = index + 1;
    });
  };

  // Ф-я принимает contact и list и добавляет contact в list
  const addItemTable = (item, list) => {
  // добавляет contact в list  с применением ф-и createRow, которая на основе объекта делает строку
    list.append(createRow(item));
  };

  const formControl = (form, list) => {
    // Получаем форму
    form.addEventListener('submit', e => {
      // Убираем стандартное поведение формы
      e.preventDefault();
      // Реализуем отправку данных
      // Создаем formData и передаем туда форму через e.target
      const formData = new FormData(e.target);
      // Создаем объект на основе данных, введенных в поля формы
      const newTask = Object.fromEntries(formData);
      console.log('newTask:', newTask);
      addItemData(newTask);
      addItemTable(newTask, list);
      form.reset();
    });
  };
  
  // Ф-я при помощи делегирования удаляет строкку при нажатии
  // на иконку "удалить"и эл-т из массива
  const taskControl = (list) => {
    // Вещшаем обработчик события на tbody
    list.addEventListener('click', e => {
      // Получаем эл-т на котором произошел клик
      const target = e.target;
      // Проверяем, является ли ближайший родительский эл-т с классом 
      // "cms__table-btn-del" кнопкой удаления товара
      // В переменную получаем строку таблицы
      const tr = target.closest('tr');

      if (target.closest('.btn-danger')) {
        const task = parseInt(tr.querySelector('.task').textContent);
        // Получаем содержимое элемента "id" из строки
        // Находим индекс объекта в массиве "goods",
        // у которого значение свойства "id" совпадает с id товара
        // и удаляем этот объект из массива с помощью метода "splice"
        data.splice(data.findIndex((item) => item.task === task), 1);
        // Удаляем строку таблицы из DOM
        tr.remove();
        // Выводим в консоль получившийся массив после удаления строк
        updateRowNumbers();
        console.log(data);
      }
      if (target.closest('.btn-success')) {
        tr.classList.remove('table-light');
        tr.classList.add('table-success');
        const tdTask = tr.querySelector('.task');
        tdTask.style.textDecoration = 'line-through';
        const tdStatus = tr.querySelector('.status');
        tdStatus.textContent = 'Выполнена';
      }
    });
  };

  // Ф-я принимает селектор приложения с html страницы и заголовок
  const init = (selectorApp, title) => {
    // Получаем элемент по селектору
    const app = document.querySelector(selectorApp);
    // Деструктуризация list, что бы передавать отдельно, а не toDo.list
    const {
      list,
      form,
    } = renderToDo(app, title);
    renderTasks(list, data);
    // Функционал
    taskControl(list);
    formControl(form, list);
  };

  window.toDoInit = init;
}
