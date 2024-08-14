import { cardTemplate, cardList } from './index.js';

// @todo: Функция создания карточки
export function createCard(cardData, deleteCard) {
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
export function deleteCard(cardElement) {
    cardElement.remove();
  }