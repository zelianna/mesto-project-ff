// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
    const cardElement = cardTemplate.cloneNode(true);

    // Заполняем клонированный элемент данными
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;
  
    deleteButton.addEventListener('click', () => {
      deleteCard(cardElement);
    });
  
    return cardElement;
  }
  

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
  }
  

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard);
    cardList.append(cardElement);
  });
  