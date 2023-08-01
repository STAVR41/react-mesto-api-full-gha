import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({ errorMessegeInput, buttonStateForm, onValidation, textLoadingSubmit, onAddPlace, onClose, isOpen }) {
    const [newCard, setNewCard] = useState({
        name: "",
        link: "",
    })
    useEffect(() => {
        setNewCard({ name: "", link: "" })
    }, [isOpen])
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(newCard)
    }

    return (
        <PopupWithForm buttonStateForm={buttonStateForm} onValidation={onValidation} textLoadingSubmit={textLoadingSubmit} onSubmit={handleSubmit} onClose={onClose} title={"Новое место"} name={"card"} isOpen={isOpen} >
            <input value={newCard.name ?? ""} onChange={e => setNewCard({ ...newCard, name: e.target.value })} required maxLength="30" minLength="2" tabIndex="1" type="text" name="cardName" id="cardName-input"
                className="form__input form__input_type_text" placeholder="Название" />
            <span className={`cardName-input-error form__input-error ${errorMessegeInput.cardName ? "form__input-error_active" : ""}`}>{errorMessegeInput.cardName}</span>
            <input value={newCard.link ?? ""} onChange={e => setNewCard({ ...newCard, link: e.target.value })} required tabIndex="2" type="url" name="cardImg" id="link-input"
                className="form__input form__input_type_link" placeholder="Ссылка на картинку" />
            <span className={`link-input-error form__input-error ${errorMessegeInput.cardImg ? "form__input-error_active" : ""}`}>{errorMessegeInput.cardImg}</span>
        </PopupWithForm>
    )
}
export default AddPlacePopup 