class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headeres = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headeres,
    }).then(this._checkResponse);
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headeres,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`,
      }),
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headeres,
    }).then(this._checkResponse);
  }

  addCard(card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headeres,
      body: JSON.stringify({
        name: `${card.name}`,
        link: `${card.link}`,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(card) {
    return fetch(`${this._baseUrl}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headeres,
    }).then(this._checkResponse);
  }

  putLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headeres,
    }).then(this._checkResponse);
  }

  deleteLikeCard(cardId, jwt) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headeres,
    }).then(this._checkResponse);
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headeres,
      body: JSON.stringify({ avatar: `${link}` }),
    }).then(this._checkResponse);
  }

  register(user) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headeres,
      body: JSON.stringify({
        password: `${user.password}`,
        email: `${user.email}`,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          console.log("некорректно заполнено одно из полей");
          return res;
        }
        return res;
      })
      .then(this._checkResponse);
  }

  authorize(user) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headeres,
      body: JSON.stringify({
        password: `${user.password}`,
        email: `${user.email}`,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          console.log("не передано одно из полей");
        } else if (res.status === 401) {
          console.log("пользователь с email не найден");
        }
        return res;
      })
      .then(this._checkResponse);
  }

  validateUser(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const api = () => new Api({
  baseUrl: "https://api.evg.vetrow.mesto.nomoreparties.sbs",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-type": "application/json",
  },
});

const auth = new Api({
  baseUrl: "https://api.evg.vetrow.mesto.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
  },
});

export { api, auth };
