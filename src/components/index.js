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
  openModal(editProfilePopup);
});

addButton.addEventListener("click", () => {
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
