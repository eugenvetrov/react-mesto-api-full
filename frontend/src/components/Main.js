import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import defaultUserImg from "../images/default-user.png";
import Card from "./Card.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const Cards = props.cards.map((item) => {
    return (
      <Card
        key={item._id}
        card={item}
        onCardClick={props.onCardClick}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    );
  });

  return (
    <main className="main">
      <section className="profile">
        <div
          className="profile__avatar-edit"
          onClick={props.onEditAvatar}
        ></div>
        <img
          src={currentUser ? currentUser.avatar : defaultUserImg}
          className="profile__avatar"
          alt="аватар профиля"
        />
        <h1 className="profile__info-name">
          {currentUser ? currentUser.name : ""}
        </h1>
        <button
          className="profile__info-edit"
          type="button"
          onClick={props.onEditProfile}
        ></button>
        <p className="profile__info-description">
          {currentUser ? currentUser.about : ""}
        </p>
        <button
          className="profile__add"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="group">{Cards}</section>
    </main>
  );
}

export default Main;
