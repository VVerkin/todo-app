import serviceStorage from './serviceStorage.js';

import createElements from './createElements.js';

import {data} from '../script.js';

const {
  userName,
  getStorage,
  setStorage,
  removeStorage,
  updateLocalStorage,
} = serviceStorage;

const {
  createRow,
} = createElements;

// Ф-я добавляет элемент в массив
export const addItemData = item => {
  data.push(item);
  console.log('data', data);
};
// Ф-я обновляет номер задачи
export const updateRowNumbers = () => {
  const rows = document.querySelectorAll('tbody tr');
  rows.forEach((row, index) => {
    row.querySelector('td:first-child').textContent = index + 1;
  });
};
// Ф-я активирует кнопку "Добавить", если инпут не пустой
export const activeSubmit = () => {
  const formInput = document.querySelector('input');
  const btnSubmit = document.querySelector('.btn-primary');
  const btnReset = document.querySelector('.btn-warning');
  btnSubmit.disabled = true;
  btnReset.disabled = true;
  formInput.addEventListener('input', () => {
    // Проверка на пустое значение
    if (formInput.value.trim() === '') {
      btnSubmit.disabled = true;
      btnReset.disabled = true;
    } else {
      btnSubmit.disabled = false;
      btnReset.disabled = false;
    }
  });
};

// Ф-я и добавляет строку с задачей в таблицу
export const addItemTable = (item, list) => {
  list.append(createRow(item));
};
// Ф-я управляет элементами формы
export const formControl = (form, list) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    // Реализуем отправку данных
    // Создаем formData и передаем туда форму через e.target
    const formData = new FormData(e.target);
    // Создаем объект на основе данных, введенных в поля формы
    const newTask = Object.fromEntries(formData);
    addItemData(newTask);
    addItemTable(newTask, list);
    form.reset();
    activeSubmit();
    setStorage(userName, newTask);
  });
  form.addEventListener('reset', () => {
    activeSubmit();
  });
};

// Ф-я при помощи делегирования удаляет строкку из таблицы при нажатии
// на иконку "удалить" и удаляет эл-т из массива
export const taskControl = (list) => {
  // Вещшаем обработчик события на tbody
  list.addEventListener('click', e => {
    // Получаем эл-т на котором произошел клик
    const target = e.target;
    // Проверяем, является ли ближайший родительский эл-т
    // кнопкой удаления задачи
    const tr = target.closest('tr');
    if (target.closest('.btn-danger')) {
      const task = target.closest('tr').querySelector('.task').textContent;
      removeStorage(userName, task);
      tr.remove();
      updateRowNumbers();
    }
    // Устанавливаем стили при нажатии на кнопку завершить
    if (target.closest('.btn-success')) {
      if (tr.classList.contains('table-light')) {
        tr.classList.remove('table-light');
        tr.classList.add('table-success');
        const tdTask = tr.querySelector('.task');
        tdTask.style.textDecoration = 'line-through';
        const tdStatus = tr.querySelector('.status');
        tdStatus.textContent = 'Выполнена';

        // Сохраняем статус строки в localStorage
        const task = tdTask.textContent;
        const updatedData = getStorage(userName).map(item => {
          if (item.task === task) {
            return {...item, status: 'Выполнена'};
          }
          return item;
        });
        updateLocalStorage(updatedData);
      } else {
        tr.classList.remove('table-success');
        tr.classList.add('table-light');
        const tdTask = tr.querySelector('.task');
        tdTask.style.textDecoration = 'none';
        const tdStatus = tr.querySelector('.status');
        tdStatus.textContent = 'В процессе';
        // Сохраняем статус строки в localStorage
        const task = tdTask.textContent;
        const updatedData = getStorage(userName).map(item => {
          if (item.task === task) {
            return {...item, status: 'В процессе'};
          }
          return item;
        });
        updateLocalStorage(updatedData);
      }
    }
  });
};
