const showInputError = function (form, input, errorMessage, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage; // Отображение сообщения об ошибке
  errorElement.classList.add(config.errorClass); // Показ сообщения об ошибке
};

const hideInputError = function (form, input, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass); // Удаление класса выделения ошибочного поля
  errorElement.classList.remove(config.errorClass); // Скрытие сообщения об ошибке
  errorElement.textContent = ""; // Очистка текста ошибки
};

const isValid = function (form, input, config) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.error); // Используем кастомное сообщение об ошибке при несоответствии шаблону
  } else {
    input.setCustomValidity(""); // Сбрасываем кастомное сообщение об ошибке
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config); // Показываем ошибку, если поле не валидно
  } else {
    hideInputError(form, input, config); // Скрываем ошибку, если поле валидно
  }
};

// Функция для проверки наличия невалидных полей
const hasInvalidInput = function (inputList) {
  return inputList.some(function (input) {
    return !input.validity.valid;
  });
};

// Функция переключения состояния кнопки отправки формы
const toggleButtonState = function (inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass); // Добавляем класс для неактивной кнопки
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass); // Убираем класс для активной кнопки
  }
};

export const clearValidation = function (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach((input) => {
    hideInputError(form, input, config); // Очистка ошибок
  });

  // Сброс состояния кнопки
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config); // Деактивация кнопки
};

// Слушатели событий инпутов

const setEventListeners = function (form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach(function (input) {
    input.addEventListener("input", function () {
      isValid(form, input, config);
      toggleButtonState(inputList, button, config);
    });
  });
};

export const enableValidation = function (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(function (form) {
    setEventListeners(form, config);
  });
};
