function ImagePopup({ card, onClose }) {
  const handleCloseOverlay = (event) => {
    if (event.target.classList.contains("popup_opened")) onClose();
  };
  return (
    <div
      className={`popup popup_background_fullscreen popup_fullscreen-image ${
        card ? "popup_opened" : ""
      }`}
      onClick={handleCloseOverlay}
    >
      <figure className="popup__fullscreen">
        <button
          className="popup__close-icon popup__close-icon_fullscreen"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : ""}
          className="popup__fullscreen-image"
          alt={card ? `${card.name}` : ""}
        />
        <figcaption className="popup__fullscreen-caption">
          {card ? card.name : ""}
        </figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
