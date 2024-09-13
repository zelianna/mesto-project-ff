import { deleteCardFromServer, addLike, removeLike } from "./api.js";

// Функция создания карточки
export function createCard(
  cardData,
  currentUser,
  deleteCard,
  handleLikeButtonClick,
  handleImageClick
) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);

  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeCount = cardElement.querySelector(".card__like-count");

  if (cardData.likes.some((l) => l._id === currentUser._id)) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Устанавливаем количество лайков
  cardLikeCount.textContent = cardData.likes.length;

  // Проверяем, является ли текущий пользователь владельцем карточки
  if (cardData.owner._id !== currentUser._id) {
    deleteButton.remove(); // Удаляем кнопку, если карточка не моя
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardData._id, cardElement); // Удаление с сервера
    });
  }

  likeButton.addEventListener("click", () =>
    handleLikeButtonClick(cardData, likeButton, cardLikeCount)
  );

  cardImage.addEventListener("click", () => handleImageClick(cardData));

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(cardId, cardElement) {
  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove(); // Удаляем карточку из DOM после успешного удаления с сервера
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

// Функция обработчика лайка
export function handleLikeButtonClick(cardData, likeButton, likeCountElement) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const cardId = cardData._id; // _id карточки

  // Определяем, ставим лайк или убираем
  if (isLiked) {
    removeLike(cardId)
      .then((updatedCardData) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeCountElement.textContent = updatedCardData.likes.length;
      })
      .catch((error) => {
        console.error("Ошибка при снятии лайка:", error);
      });
  } else {
    addLike(cardId)
      .then((updatedCardData) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountElement.textContent = updatedCardData.likes.length;
      })
      .catch((error) => {
        console.error("Ошибка при постановке лайка:", error);
      });
  }
}
