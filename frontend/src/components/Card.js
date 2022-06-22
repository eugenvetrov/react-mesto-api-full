import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser?._id;
  const isLiked = props.card.likes.some((i) => i === currentUser?._id);
  const cardDeleteButtonClassName = `group__delete-icon ${
    isOwn ? "" : "group__delete-icon_disable"
  }`;
  const cardLikeButtonClassName = `group__like-icon ${
    isLiked ? "group__like-icon_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  return (
    <article className="group__rectangle" key={props.card._id}>
      <img
        className="group__image"
        src={props.card.link}
        onClick={handleClick}
        alt={props.card.name}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <h2 className="group__name">{props.card.name}</h2>
      <button className="group__like" type="button">
        <div
          className={cardLikeButtonClassName}
          alt="Отметить как понравившееся"
          onClick={handleLikeClick}
        ></div>
      </button>
      <p className="group__like-number">{props.card.likes ? props.card.likes.length : ''}</p>
    </article>
  );
}

export default Card;
