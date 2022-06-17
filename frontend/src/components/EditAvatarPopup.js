import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarInputRef = useRef();

  useEffect(() => {
    avatarInputRef.current.value = "";
  }, [props.isOpen]);

  function handleChange() {
    props.validateField("avatar", avatarInputRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (props.formValid) {
      props.onUpdateAvatar({
        avatar: avatarInputRef.current.value,
      });
    } else {
      alert("Простите! Указанная ссылка не является достаточно валидной.");
    }
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popup_profile-avatar"
      submitValue="Сохранить"
      isOpen={props.isOpen}
      onClose={(e) => props.onClose(e)}
      onSubmit={(e) => handleSubmit(e)}
      formValid={props.formValid}
    >
      <input
        className="popup__text popup__text_profile-avatar"
        id="profile-avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        ref={avatarInputRef}
        onChange={handleChange}
      />
      <span
        className="popup__error  popup__error_visible"
        id="profile-avatar-error"
      >
        {props.formErrors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
