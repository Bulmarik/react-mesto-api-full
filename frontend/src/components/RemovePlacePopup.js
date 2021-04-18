import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function RemovePlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onCardDelete(props.isOpen);
  }
  
  return (
    <PopupWithForm 
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='delete'
      title='Вы уверены?'
      button='Да'
    />
  )
}