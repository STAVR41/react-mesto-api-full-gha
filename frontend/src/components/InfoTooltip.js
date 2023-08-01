import PopupWithForm from "./PopupWithForm";
import successfully from "../images/successfully.svg";
import error from "../images/Error.svg"



function InfoTooltip({ isOpen, onClose, text }) {


    return (
        <PopupWithForm name={"register"} isOpen={isOpen} onClose={onClose}>
            <img src={text === "Вы успешно зарегистрировались!" ? successfully : error} alt="Изображение" />
            <p className="form__text">{text}</p>
        </PopupWithForm>
    )
}
export default InfoTooltip 