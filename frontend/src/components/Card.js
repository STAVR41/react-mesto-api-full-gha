import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ onCardDelete, onCardLike, card, onCardClick }) {
	const currentUser = useContext(CurrentUserContext);
	const isOwn = card.owner._id === currentUser._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ""}`);
	function handleDeleteClick() {
		onCardDelete(card)
	}
	function handleLikeClick() {
		onCardLike(card)
	}
	function handleClick() {
		onCardClick(card);
	}

	return (
		<article className="card">
			<div onClick={handleClick} className="card__img" style={{ backgroundImage: `url(${card.link})` }}></div>
			<div className="card__text-block">
				<h2 className="card__title">{card.name}</h2>
				<div className="card__like-block">
					<button onClick={handleLikeClick} type="button" className={cardLikeButtonClassName}></button>
					<p className="card__counter">{card.likes.length}</p>
				</div>
			</div>
			{isOwn && <button onClick={handleDeleteClick} className="card__delete" type="button"></button>}
		</article>
	)
}

export default Card
