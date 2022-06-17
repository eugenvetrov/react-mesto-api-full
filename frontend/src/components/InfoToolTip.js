import checkOk from "../images/check-ok.svg";
import checkError from "../images/check-error.svg";

function InfoToolTip(props) {
  const handleCloseOverlay = (event) => {
    if (event.target.classList.contains("popup_opened")) props.onClose();
  };
  return (
    <div
      className={`popup popup_background_form ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={handleCloseOverlay}
    >
      <div className="popup__container">
        <button
          className="popup__close-icon popup__close-icon_profile"
          type="button"
          onClick={props.onClose}
        ></button>
        {props.isAuthSuccesfull ? (
          <div className="popup__form popup__form_check-status">
            <img src={checkOk} className="popup__check-image" />
            <p className="popup__check-status">
              Вы успешно зарегестрировались!
            </p>
          </div>
        ) : (
          <div className="popup__form popup__form_check-status">
            <img src={checkError} className="popup__check-image" />
            <p className="popup__check-status">
              Что-то пошло не так! Попробуйте ещё раз.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default InfoToolTip;
