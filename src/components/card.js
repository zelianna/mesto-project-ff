import { cardTemplate, cardList } from './index.js';

// Функция создания карточки
export function createCard(cardData, deleteCard, handleLikeButtonClick) {
    const cardElement = cardTemplate.cloneNode(true);
  
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    deleteButton.addEventListener("click", () => {
      deleteCard(cardElement);
    });
    likeButton.addEventListener("click", handleLikeButtonClick);
     
    return cardElement;
  }

  // Функция удаления карточки
export function deleteCard(cardElement) {
    cardElement.remove();
  }

  // Функция обработчика лайка
export function handleLikeButtonClick(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_is-active');
  }
  