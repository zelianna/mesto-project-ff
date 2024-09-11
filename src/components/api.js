const configAPI = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
    headers: {
      authorization: 'dbc8d628-1ef0-4991-a7d3-2138c077d5c9',
      'Content-Type': 'application/json'
    }
  }

// Функция для выполнения GET-запроса данных пользователя
export const fetchUserData = () => {
    return fetch(`${configAPI.baseUrl}/users/me`, {
        method: 'GET',
        headers: configAPI.headers
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
    })
    .then((userData) => {
        return userData;
    })
    .catch((error) => {
        console.error('Ошибка при загрузке данных пользователя:', error);
        throw error; // Передайте ошибку дальше
    });
};

// Функция для выполнения GET-запроса карточек
export const fetchCardsData = () => {
    return fetch(`${configAPI.baseUrl}/cards`, {
      method: 'GET',
      headers: configAPI.headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((cardsData) => {
        return cardsData; // Возвращаем массив карточек
      })
      .catch((error) => {
        console.error('Ошибка при загрузке карточек:', error);
        throw error;
      });
  };
  
  // Функция для обновления данных пользователя
export const updateUserData = (name, about) => {
    return fetch(`${configAPI.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: configAPI.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then((updatedUserData) => {
      return updatedUserData; // Возвращаем обновленные данные пользователя
    })
    .catch((error) => {
      console.error('Ошибка при обновлении данных пользователя:', error);
      throw error;
    });
  };
  
  // Функция для добавления новой карточки на сервер
export const addCard = (name, link) => {
    return fetch(`${configAPI.baseUrl}/cards`, {
      method: 'POST',
      headers: configAPI.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then((newCardData) => {
      return newCardData; // Возвращаем объект новой карточки
    })
    .catch((error) => {
      console.error('Ошибка при добавлении карточки:', error);
      throw error;
    });
  };
  