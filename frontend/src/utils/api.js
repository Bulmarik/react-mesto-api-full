class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  
  _handleResponse(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards = (token) => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._handleResponse)
  }

  getUser = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(this._handleResponse)
  }

  setAvatar = (avatar, token) => {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(avatar)
    })
    .then(this._handleResponse)
  }

  setUser = (name, description, token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(this._handleResponse)
  }

  addNewCard = (item, token) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
      })
    })
    .then(this._handleResponse)
  }

  delCard = (cardId, token) => {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        _id: cardId,
      })
    })
    .then(this._handleResponse)
  }

  changeLikeCardStatus = (cardId, isLiked, token) => {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          _id: cardId,
        })
      })
      .then(this._handleResponse)
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          _id: cardId,
        })
      })
      .then(this._handleResponse)
    }
  }
}

const api = new Api({
  baseUrl: 'https://api.bulmarik.nomoredomains.icu',
});

export default api;