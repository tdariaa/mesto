export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  // получить список всех карточек в виде массива (GET)
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }

  // добавить карточку (POST)
  postNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._checkResponse)
  }

  // удалить карточку (DELETE)
  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse)
  }

  // получить данные пользователя (GET)
  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(this._checkResponse)
  }

  getAllNeededData() {
    return Promise.all([this.getInitialCards(), this.getProfileData()]);
  }

  // заменить данные пользователя (PATCH)
  patchProfileData({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
  }

  // заменить аватар (PATCH)
  patchAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this._checkResponse)
  }

  // “залайкать” карточку (PUT)
  putLike = (cardID) => {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }

  // удалить лайк карточки (DELETE)
  deleteLike = (cardID) => {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkResponse)
  }
}
