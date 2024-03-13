// Ф-я получает контейнер
const getContainer = () => {
  // Получаем эл-т div
  const container = document.querySelector('.app-container');
  // Назначаем контейнеру необходимые классы
  container.classList.add('vh-100', 'w-100','d-flex','align-items-center','justify-content-center','flex-column');
  // Возвращаем получившийся контейнер
  return container;
};
getContainer();

// Ф-я создает заголовок
const createHeader = () => {
  // Создаем в верстке эл-т h3
  const h1 = document.createElement('h1');
  // Добавляем содержимое в заголовок
  h1.textContent = 'Todo App';
  // Вставляем h3 в контейнер
  h1.append(container);
  return h1;
};
createHeader();
