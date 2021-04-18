import React from 'react';

export default function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__overlay" onClick={props.onClose} />
      <div className="popup__container popup__container_type_image">
        <button className="popup__close-btn" type="button" onClick={props.onClose} />
        <figure className="popup__figure">
          <img className="popup__image" src={props.card.link} alt={props.card.name} />
          <figcaption className="popup__figcapture">{props.card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}