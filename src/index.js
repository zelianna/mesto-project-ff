import './pages/index.css';
import { initialCards } from './scripts/cards';
import avatar from './images/avatar.jpg';
import { openModal, closeModal } from './components/modal.js';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

// @todo: Темплейт карточки
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardList.append(cardElement);
});


const popups = document.querySelectorAll('.popup');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

editButton.addEventListener('click', () => {
  openModal(editProfilePopup);
});

addButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closeModal(popup);
  });
});

// Закрытие попапа при клике на оверлей
popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      console.log(event);
      closeModal(popup);
    }
  });
});
 

