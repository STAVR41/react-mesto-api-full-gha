import { useState } from "react"
import Header from "./Header"
function Login({ onAuthorization }) {
    const [formValue, setFormValue] = useState({
        password: "",
        email: ""
    })
    function handleSubmit(e) {
        e.preventDefault()
        onAuthorization(formValue)
    }

    return (
        <>
            <Header text={"Регистрация"} link={"/sign-up"} />
            <div className="start-screen">
                <h2 className="start-screen__title">Вход</h2>
                <form onSubmit={handleSubmit} action="#" className="form form_type_login">
                    <input onChange={e => setFormValue({ ...formValue, email: e.target.value })} type="email" className="form__input form__input_type_login" placeholder="Email" required />
                    <input onChange={e => setFormValue({ ...formValue, password: e.target.value })} type="password" className="form__input form__input_type_login" placeholder="Пароль" required />
                    <button type="submit" className="form__save form__save_type_login">Войти</button>
                </form>
            </div>
        </>
    )
}
export default Login