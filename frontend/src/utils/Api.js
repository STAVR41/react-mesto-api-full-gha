class Api {
    constructor(options) {
        this._options = options;
        this._url = this._options.baseUrl;
        this._headers = this._options.headers;
    }
    _checkStatusServer(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkStatusServer(res))
    }
    setAvatarUser(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({ avatar })
        })
            .then(res => this._checkStatusServer(res))
    }
    setProfileUser(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({ name, about })
        })
            .then(res => this._checkStatusServer(res))
    }
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkStatusServer(res))
    }
    addNewCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({ name, link })
        })
            .then(res => this._checkStatusServer(res))
    }
    addLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkStatusServer(res))
    }
    removeLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkStatusServer(res))
    }
    deleteCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            credentials: 'include',
        })
            .then(res => this._checkStatusServer(res))
    }

}
const api = new Api({
    baseUrl: 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api