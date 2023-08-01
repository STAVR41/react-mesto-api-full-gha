import { NavLink } from "react-router-dom"
import Header from "./Header"
import { useState } from "react"

function Register({ onRegisterUser }) {
    const [formValue, setFormValue] = useState({
        password: "",
        email: ""
    })

    function handleSubmit(e) {
        e.preventDefault()
        onRegisterUser(formValue)
    }

    return (
        <>
            <Header text={"Вход"} link={"/sign-in"} />
            <div className="start-screen">
                <h2 className="start-screen__title">Регистрация</h2>
                <form onSubmit={handleSubmit} action="#" className="form form_type_login">
                    <input onChange={e => setFormValue({ ...formValue, email: e.target.value })} type="email" className="form__input form__input_type_login" placeholder="Email" required />
                    <input onChange={e => setFormValue({ ...formValue, password: e.target.value })} type="password" className="form__input form__input_type_login" placeholder="Пароль" required />
                    <button type="submit" className="form__save form__save_type_login">Зарегистрироваться</button>
                    <p className="form__enter">Уже зарегистрированы?<NavLink className="form__enter form__enter_type_link" to="/sign-in"> Войти</NavLink></p>
                </form>
            </div>
        </>
    )
}
export default Register