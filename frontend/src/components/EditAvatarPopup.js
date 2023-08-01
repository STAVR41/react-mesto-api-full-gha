import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ errorMessegeInput, buttonStateForm, onValidation, textLoadingSubmit, onUpdateAvatar, isOpen, onClose }) {
    const avatar = useRef();

    useEffect(() => {
        avatar.current.value = ""
    }, [isOpen])
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatar.current.value)
    }

    return (
        <PopupWithForm onValidation={onValidation} buttonStateForm={buttonStateForm} textLoadingSubmit={textLoadingSubmit} onSubmit={handleSubmit} onClose={onClose} title={"Обновить аватар"} name={"avatar"} isOpen={isOpen}>
            <input ref={avatar} required tabIndex="1" type="url" name="avatar" id="avatar-input"
                className="form__input form__input_type_avatar" placeholder="Ссылка на картинку" />
            <span className={`avatar-input-error form__input-error ${errorMessegeInput.avatar ? "form__input-error_active" : ""}`}>{errorMessegeInput.avatar}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup