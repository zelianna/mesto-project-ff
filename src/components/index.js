import "../pages/index.css";
import avatar from "../images/avatar.jpg";
import { openModal, closeModal } from "./modal.js";
import { createCard, deleteCard, handleLikeButtonClick } from "./card.js";
import { clearValidation, enableValidation } from "./validation.js";
import {
  fetchUserData,
  fetchCardsData,
  updateUserData,
  addCard,
  updateAvatar,
} from "./api.js";

let currentUser;
const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${avatar})`;

// DOM узлы
const cardList = document.querySelector(".places__list");

const popups = document.querySelectorAll(".popup");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const editProfilePopup = document.querySelector(".popup_type_edit");

const editProfileAvatar = document.querySelector(".popup_type_avatar");
const profileAvatar = document.querySelector(".profile__image");
const avatarForm = document.forms.avatar;

const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardForm = newCardPopup.querySelector(".popup__form");
const imagePopup = document.querySelector(".popup_type_image");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const placeInput = document.querySelector(".popup__input_type_card-name");
const linkInput = document.querySelector("#link");

profileAvatar.addEventListener("click", () => {
  clearValidation(editProfileAvatar, validationConfig); // Сброс ошибок при открытии формы
  openModal(editProfileAvatar);
});

//Обновление аватара
avatarForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const submitButton = avatarForm.querySelector(".popup__button");
  const avatarInput = document.getElementById("avatar-link").value;

  if (avatarInput) {
    // Сохранить...
    renderLoading(true, submitButton);
    // Если URL валиден, вызываем функцию обновления аватара
    updateAvatar(avatarInput)
      .then((data) => {
        // Обновляем аватар на странице только при успешном ответе сервера
        profileAvatar.style.backgroundImage = `url(${data.avatar})`;
        closeModal(editProfileAvatar);
      })
      .catch((error) => {
        console.error("Ошибка при обновлении аватара:", error);
      })
      .finally(() => {
        // Возвращаем исходный текст кнопки
        renderLoading(false, submitButton);
      });
  } else {
    console.log("Введите корректную ссылку на аватар.");
  }
});

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editProfilePopup, validationConfig);

  openModal(editProfilePopup);
});

addButton.addEventListener("click", () => {
  clearValidation(newCardPopup, validationConfig);

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
  const submitButton = editProfilePopup.querySelector(".popup__button");
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Отображаем индикатор загрузки
  renderLoading(true, submitButton);

  updateUserData(nameValue, jobValue)
    .then((updatedUserData) => {
      // Обновляем данные на странице после обновления на сервере
      profileName.textContent = updatedUserData.name;
      profileJob.textContent = updatedUserData.about;
      closeModal(editProfilePopup); // Закрываем попап
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      // Возвращаем исходный текст кнопки
      renderLoading(false, submitButton);
    });
}

editProfilePopup.addEventListener("submit", handleProfileSubmit);

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  const submitButton = newCardForm.querySelector(".popup__button");
  renderLoading(true, submitButton); // Показываем "Сохранение..."

  // Отправляем запрос на добавление карточки
  addCard(placeValue, linkValue)
    .then((newCardData) => {
      // Создаем карточку и добавляем на страницу
      const newCardElement = createCard(
        newCardData,
        currentUser,
        deleteCard,
        handleLikeButtonClick,
        handleImageClick
      );
      cardList.prepend(newCardElement);
      closeModal(newCardPopup);
      newCardForm.reset();
      clearValidation(newCardPopup, validationConfig);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      renderLoading(false, submitButton); // Возвращаем начальный текст кнопки
    });
}

newCardPopup.addEventListener("submit", handleNewCardSubmit);

function handleImageClick(cardData) {
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupTitle = imagePopup.querySelector(".popup__caption");

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupTitle.textContent = cardData.name;

  openModal(imagePopup);
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

enableValidation(validationConfig);

// Обрабатываем Promise.all для запроса данных пользователя и карточек
document.addEventListener("DOMContentLoaded", () => {
  Promise.all([fetchUserData(), fetchCardsData()])
    .then(([userData, cardsData]) => {
      currentUser = userData;
      // Обновляем данные пользователя
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;

      // Рендерим карточки
      cardsData.forEach((cardData) => {
        const cardElement = createCard(
          cardData,
          userData,
          deleteCard,
          handleLikeButtonClick,
          handleImageClick
        );
        cardList.append(cardElement);
      });
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
    });
});

// Функция для изменения текста кнопки во время загрузки
function renderLoading(isLoading, submitButton, loadingText = "Сохранение...") {
  if (isLoading) {
    // Сохраняем исходный текст кнопки
    if (!submitButton.dataset.initialText) {
      submitButton.dataset.initialText = submitButton.textContent;
    }
    // Меняем на Сохранение...
    submitButton.textContent = loadingText;
  } else {
    // Возвращаем исходный текст кнопки
    submitButton.textContent = submitButton.dataset.initialText;
  }
}
