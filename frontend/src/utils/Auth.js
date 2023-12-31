class Auth {
    constructor(options) {
        this._options = options
    }
    _checkStatusServer(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }
    register(data) {
        return fetch(`${this._options.baseUrl}/signup`, {
            method: "POST",
            headers: this._options.headers,
            credentials: 'include',
            body: JSON.stringify({
                password: data.password,
                email: data.email,
            })
        }).then(res => this._checkStatusServer(res));
    }
    authorization(data) {
        return fetch(`${this._options.baseUrl}/signin`, {
            method: "POST",
            headers: this._options.headers,
            credentials: 'include',
            body: JSON.stringify({
                password: data.password,
                email: data.email,
            })
        }).then(res => this._checkStatusServer(res))
    }
    clearCookie() {
        return fetch(`${this._options.baseUrl}/users/signout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        }).then(res => this._checkStatusServer(res))
    }
    checkToken() {
        return fetch(`${this._options.baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        }).then(res => this._checkStatusServer(res))
    }
}
const auth = new Auth({
    baseUrl: "https://api.stavr.nomoreparties.co",
    headers: {
        "Content-Type": "application/json",
    }
});
export default auth