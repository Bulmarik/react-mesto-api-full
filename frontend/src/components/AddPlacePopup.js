import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [place, setPlace] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: place,
      link: link,
    });
    setPlace('');
    setLink('');
  }

  function inputPlace(e) {
    setPlace(e.target.value);
  }

  function inputLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='add-card'
      title='Новое место'
      button='Добавить'>
        <input className="popup__input popup__input_type_place" value={place} onChange={inputPlace} name="place" maxLength="30" minLength="1" placeholder="Название" type="text" required />
        <span className="popup__error" id="place-error" />
        <input className="popup__input popup__input_type_url" value={link} onChange={inputLink} name="card-url" placeholder="Ссылка на картинку" type="url" required />
        <span className="popup__error" id="card-url-error" />
    </PopupWithForm>
  )
}