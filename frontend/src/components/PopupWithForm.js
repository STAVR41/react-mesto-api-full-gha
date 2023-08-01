import { useEffect } from "react"

function PopupWithForm({ buttonStateForm, onValidation, textLoadingSubmit, onSubmit, title, name, children, isOpen, onClose }) {
    useEffect(() => {
        function handleEscClose(evt) {
            if (evt.key === "Escape") {
                onClose()
            }
        }
        function handleClickOverlay(evt) {
            if (evt.target.classList.contains('popup_opened')) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keyup", handleEscClose);
            document.addEventListener("mousedown", handleClickOverlay)
        } else {
            document.removeEventListener("keyup", handleEscClose);
            document.removeEventListener("mousedown", handleClickOverlay)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen])

    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className={`popup__container popup__container_type_${name}`}>
                {title ? <h3 className={`popup__title popup__title_type_${name}`}>{title}</h3> : ""}
                <form onChange={onValidation} onSubmit={onSubmit} action="#" name={name} className={`form form_type_${name}`}>
                    {children}
                    {textLoadingSubmit ? <button disabled={buttonStateForm} tabIndex="3" type="submit" className={`form__save form__save_type_${name} ${buttonStateForm ? "form__save_inactive" : ""}`}>{textLoadingSubmit}</button> : ""}
                </form>
                <button onClick={onClose} tabIndex="4" type="button" className="popup__close"></button>
            </div>
        </div >
    )
}
export default PopupWithForm


