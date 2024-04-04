import serviceStorage from './modules/serviceStorage.js';

import * as control from './modules/control.js';

import {renderToDo, renderTasks} from './modules/render.js';


const {
  getStorage,
  updateLocalStorage,
} = serviceStorage;

const {
  updateRowNumbers,
  formControl,
  taskControl,
} = control;

export const data = [];

{
  // Ф-я принимает селектор приложения с html страницы и заголовок
  const init = (selectorApp, title) => {
    // Получаем элемент по селектору
    const app = document.querySelector(selectorApp);
    // Деструктуризация list, что бы передавать отдельно, а не toDo.list
    const data = getStorage('tasks');
    const {
      list,
      form,
    } = renderToDo(app, title);
    renderTasks(list, data);

    // Функционал
    taskControl(list);
    formControl(form, list);
    updateRowNumbers();

    data.forEach(item => {
      if (item.status === 'Выполнена') {
        const tr = list.querySelector(`tr`);
        tr.classList.remove('table-light');
        tr.classList.add('table-success');
        const tdTask = tr.querySelector('.task');
        tdTask.style.textDecoration = 'line-through';
        const tdStatus = tr.querySelector('.status');
        tdStatus.textContent = 'Выполнена';
      }
    });
    // Обновляем данные в localStorage после обновления статусов всех задач
    updateLocalStorage(data);
  };

  window.toDoInit = init;
}
