import { cardTemplate, cardList, handleImageClick } from "./index.js";
import { deleteCardFromServer } from './api.js'; 

// Функция создания карточки
export function createCard(
  cardData,
  currentUser,
  deleteCard,
  handleLikeButtonClick,
  handleImageClick
) {
  const cardElement = cardTemplate.cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeCount = cardElement.querySelector(".card__like-count");


  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Устанавливаем количество лайков
  cardLikeCount.textContent = cardData.likes.length;

  // для отладки
  console.log("Card owner ID:", cardData.owner._id);
  console.log("Current user ID:", currentUser._id);
 

  // Проверяем, является ли текущий пользователь владельцем карточки
  if (cardData.owner._id !== currentUser._id) {  
    deleteButton.remove(); // Удаляем кнопку, если карточка не принадлежит пользователю
  } else {
    deleteButton.addEventListener("click", () => {
      console.log("cardData._id:", cardData._id);
      deleteCard(cardData._id, cardElement); // Передаем _id карточки для удаления с сервера
    });
  }

  likeButton.addEventListener("click", handleLikeButtonClick);
  cardImage.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

/* // Функция удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
} */

// Обновляем функцию удаления карточки
export function deleteCard(cardId, cardElement) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove(); // Удаляем карточку из DOM после успешного удаления с сервера
      
    })
    .catch((error) => {
      console.error('Ошибка при удалении карточки:', error);
    });
}


// Функция обработчика лайка
export function handleLikeButtonClick(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_is-active");
}
