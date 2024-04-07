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


export const addItemData = item => {
  data.push(item);
  console.log('data', data);
};

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

// Ф-я принимает contact и list и добавляет contact в list
export const addItemTable = (item, list) => {
  // добавляет contact в list  с применением ф-и createRow, которая на основе объекта делает строку
  list.append(createRow(item));
};

export const formControl = (form, list) => {
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
    activeSubmit();
    setStorage(userName, newTask);
  });
  form.addEventListener('reset', () => {
    activeSubmit();
  });
};
    
// Ф-я при помощи делегирования удаляет строкку при нажатии
// на иконку "удалить"и эл-т из массива
export const taskControl = (list) => {
  // Вещшаем обработчик события на tbody
  list.addEventListener('click', e => {
    // Получаем эл-т на котором произошел клик
    const target = e.target;
    // Проверяем, является ли ближайший родительский эл-т с классом 
    // "cms__table-btn-del" кнопкой удаления товара
    // В переменную получаем строку таблицы
    const tr = target.closest('tr');

    if (target.closest('.btn-danger')) {
      const task = target.closest('tr').querySelector('.task').textContent;
        // Получаем содержимое элемента "id" из строки
        // Находим индекс объекта в массиве "goods",
        // у которого значение свойства "id" совпадает с id товара
        // и удаляем этот объект из массива с помощью метода "splice"
        // data.splice(data.findIndex((item) => item.task === task), 1);
        // из localstorage
      removeStorage(userName, task);
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

      // Сохраняем статус строки в localStorage
      const task = tdTask.textContent;
      const updatedData = getStorage(userName).map(item => {
        if (item.task === task) {
          return {...item, status: 'Выполнена'};
        }
        return item;
      });
      updateLocalStorage(updatedData);
    }
  });
};
