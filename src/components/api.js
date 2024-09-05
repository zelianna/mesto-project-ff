const configAPI = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-22',
    headers: {
      authorization: 'dbc8d628-1ef0-4991-a7d3-2138c077d5c9',
      'Content-Type': 'application/json'
    }
  }

// Функция для выполнения GET-запроса
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

