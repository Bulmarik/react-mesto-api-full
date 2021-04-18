import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Card(props) {  
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`${isOwn ? 'elements__del-btn' : 'elements__del-btn_hidden'}`);
  const isLiked = props.card.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-btn ${isLiked ? 'elements__like-btn_active' : ''} `;

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
    <li className="elements__item">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick} />
      <img className="elements__image" onClick={handleClick} src={props.card.link} alt={props.card.name} />
      <div className="elements__description">
        <h2 className="elements__name">{props.card.name}</h2>
        <div className="elements__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
          <div className="elements__like-count">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}