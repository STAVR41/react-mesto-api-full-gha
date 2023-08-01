import PopupWithForm from "./PopupWithForm"

function DeleteCardPopup({ onSubmit, textLoadingSubmit, isOpen, card, onClose }) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(card)
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClose={onClose} textLoadingSubmit={textLoadingSubmit} isOpen={isOpen} title={"Вы уверены?"} name={"delete"} />
    )
}
export default DeleteCardPopup