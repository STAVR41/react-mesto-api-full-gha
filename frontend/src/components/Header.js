import { NavLink } from "react-router-dom"
import logo from "../images/logo.svg"
import { useState } from "react"

function Header({ exitAccount, emailUser, link, text }) {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <header className={`${menuActive ? "header active" : "header"}`}>
            <img src={logo} alt="Изображение" className="header__logo" />
            {emailUser ?
                <div onClick={() => setMenuActive(!menuActive)} className={`${menuActive ? "header__menu active" : "header__menu"}`}>
                    <span className={`${menuActive ? "header__burger active" : "header__burger"}`}></span>
                </div> : ""
            }
            {emailUser ?
                <div className={`${menuActive ? "header__nav active" : "header__nav"}`}>
                    {emailUser ? <p className="header__email">{emailUser}</p> : ""}
                    <NavLink onClick={exitAccount} to={link} className="header__link">{text}</NavLink>
                </div>
                : <div className="header__links">
                    <NavLink to={link} className="header__link">{text}</NavLink>
                </div>}

        </header>
    )
}
export default Header