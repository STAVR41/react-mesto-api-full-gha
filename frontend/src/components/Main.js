import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";

function Main({ exitAccount, emailUser, onCardDelete, cards, onCardLike, onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <>
            <Header exitAccount={exitAccount} emailUser={emailUser} link={"/sign-in"} text={"Выйти"} />
            <main className="content">
                <section className="profile">
                    <div className="profile__image-container">
                        <div onClick={onEditAvatar} className="profile__img-cover">
                            <div className="profile__img" style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
                        </div>
                        <div className="profile__container">
                            <div className="profile__info-container">
                                <h1 className="profile__title">{currentUser.name}</h1>
                                <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
                            </div>
                            <p className="profile__subtitle">{currentUser.about}</p>
                        </div>
                    </div>
                    <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
                </section>
                <section className="cards">
                    {cards.map(card =>
                        <Card onCardDelete={onCardDelete} onCardLike={onCardLike} onCardClick={onCardClick} card={card} key={card._id} />
                    )}
                </section>
            </main>
        </>
    )
}
export default Main