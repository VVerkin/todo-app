import createElements from './createElements.js';

const {
  createLogo,
  createForm,
  createTable,
  createRow,
} = createElements;


export const renderToDo = (app, title) => {
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

export const renderTasks = (elem, data) => {
  const allRow = data.map(createRow);
  elem.append(...allRow);
  return allRow;
};
