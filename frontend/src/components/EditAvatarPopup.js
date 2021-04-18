import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = '';
  }

  return (
    <PopupWithForm
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    name='edit-avatar'
    title='Обновить аватар'
    button='Сохранить'>
      <input className="popup__input popup__input_type_avatar-url" ref={avatarRef} name="ava-url" placeholder="Ссылка на аватар" type="url" required />
      <span className="popup__error" id="ava-url-error" />
  </PopupWithForm>
  )
}