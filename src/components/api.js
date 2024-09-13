const configAPI = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "dbc8d628-1ef0-4991-a7d3-2138c077d5c9",
    "Content-Type": "application/json",
  },
};

// Функция для выполнения GET-запроса данных пользователя
export const fetchUserData = () => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: "GET",
    headers: configAPI.headers,
  })
    .then(checkResponse)
    .then((userData) => {
      return userData;
    });
};

// Функция для выполнения GET-запроса карточек
export const fetchCardsData = () => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    method: "GET",
    headers: configAPI.headers,
  })
    .then(checkResponse)
    .then((cardsData) => {
      return cardsData; // Возвращаем массив карточек
    });
};

// Функция для обновления данных пользователя
export const updateUserData = (name, about) => {
  return fetch(`${configAPI.baseUrl}/users/me`, {
    method: "PATCH",
    headers: configAPI.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
};

// Функция для добавления новой карточки
export const addCard = (name, link) => {
  return fetch(`${configAPI.baseUrl}/cards`, {
    method: "POST",
    headers: configAPI.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(checkResponse)
    .then((newCardData) => {
      return newCardData; // Возвращаем объект новой карточки
    });
};

// Функция удаления карточки с сервера
export function deleteCardFromServer(cardId) {
  return fetch(`${configAPI.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: configAPI.headers,
  }).then(checkResponse);
}

// Функция для отправки PUT-запроса на добавление лайка
export function addLike(cardId) {
  return fetch(`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: configAPI.headers,
  }).then(checkResponse);
}

// Функция для отправки DELETE-запроса на снятие лайка
export function removeLike(cardId) {
  return fetch(`${configAPI.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: configAPI.headers,
  }).then(checkResponse);
}

// Функция для отправки PATCH-запроса для обновления аватара
export function updateAvatar(avatarUrl) {
  return fetch(`${configAPI.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: configAPI.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(checkResponse);
}

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
}
