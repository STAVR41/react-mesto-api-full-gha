function ImagePopup({ card, onClose, name }) {
    return (
        <div className={`popup popup_type_${name} ${card.link ? "popup_opened" : ""}`}>
            <div className="popup__imgBlock">
                <img src={card.link} alt={card.name} className="popup__img" />
                <div className="popup__caption">{card.name}</div>
                <button onClick={onClose} className="popup__close" type="button"></button>
            </div>
        </div>
    )
}
export default ImagePopup