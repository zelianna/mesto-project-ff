import "../pages/index.css";
import { initialCards } from "./cards";
import avatar from "../images/avatar.jpg";
import { openModal, closeModal } from "./modal.js";
import { createCard, deleteCard, handleLikeButtonClick } from "./card.js";

const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

// Темплейт карточки
export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// DOM узлы
export const cardList = document.querySelector(".places__list");

// Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(
    cardData,
    deleteCard,
    handleLikeButtonClick,
    handleImageClick
  );
  cardList.append(cardElement);
});

const popups = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const editProfilePopup = document.querySelector(".popup_type_edit");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const imagePopup = document.querySelector(".popup_type_image");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const placeInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector(".popup__input_type_url");

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editProfilePopup, validationConfig); // Сброс ошибок при открытии формы

  openModal(editProfilePopup);
});

addButton.addEventListener("click", () => {
  clearValidation(newCardPopup, validationConfig); // Сброс ошибок при открытии формы

  openModal(newCardPopup);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => {
    closeModal(popup);
  });
});

// Закрытие попапа при клике на оверлей
popups.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

function handleProfileSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closeModal(editProfilePopup);
}

editProfilePopup.addEventListener("submit", handleProfileSubmit);

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;
  const newCardData = {
    name: placeValue,
    link: linkValue,
  };

  // Создаем карточку
  const newCardElement = createCard(
    newCardData,
    deleteCard,
    handleLikeButtonClick,
    handleImageClick
  );
  cardList.prepend(newCardElement);
  closeModal(newCardPopup);
  newCardForm.reset();
  clearValidation(newCardPopup, validationConfig); // Сброс состояния кнопки при повторном открытии формы
}

newCardPopup.addEventListener("submit", handleNewCardSubmit);

export function handleImageClick(cardData) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupTitle = imagePopup.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupTitle.textContent = cardData.name;

  openModal(imagePopup);
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible' 
}; 

const showInputError = function(form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass); 
  errorElement.textContent = errorMessage; // Отображение сообщения об ошибке
  errorElement.classList.add(validationConfig.errorClass); // Показ сообщения об ошибке
};

const hideInputError = function(form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass); // Удаление класса выделения ошибочного поля
  errorElement.classList.remove(validationConfig.errorClass); // Скрытие сообщения об ошибке
  errorElement.textContent = ''; // Очистка текста ошибки

};

const isValid = function(form, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.error); // Используем кастомное сообщение об ошибке при несоответствии шаблону
  } else {
    input.setCustomValidity(''); // Сбрасываем кастомное сообщение об ошибке
  }
  

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage); // Показываем ошибку, если поле не валидно
  } else {
    hideInputError(form, input); // Скрываем ошибку, если поле валидно
  }
};

  // Функция для проверки наличия невалидных полей
  const hasInvalidInput = function(inputList) {
    return inputList.some(function(input) {
      return !input.validity.valid;
    })
  };

  // Функция переключения состояния кнопки отправки формы
const toggleButtonState = function(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass); // Добавляем класс для неактивной кнопки
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass); // Убираем класс для активной кнопки
  }
};

const clearValidation = function(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(input => {
    hideInputError(form, input); // Очистка ошибок
  });

  // Сброс состояния кнопки
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button); // Деактивация кнопки
};
  



    // Слушатели событий инпутов
  
    const setEventListeners = function(form) {
      const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
      const button = form.querySelector(validationConfig.submitButtonSelector);
      toggleButtonState(inputList, button);
      inputList.forEach(function(input) {
        input.addEventListener('input', function() {
          isValid(form, input);
          toggleButtonState(inputList, button);
        });
      });
    };
    
    
    const enableValidation = function() {
      const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
      formList.forEach(function(form) {
        setEventListeners(form);
      });
    };
    
    enableValidation();
