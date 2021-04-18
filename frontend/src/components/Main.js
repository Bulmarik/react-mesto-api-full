import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar" onClick={props.onEditAvatar} style={{backgroundImage: `url(${currentUser.avatar})`}} alt="Аватарка" />
          <div className="profile__info">
            <div className="profile__user">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-btn" type="button" onClick={props.onEditProfile} />
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        <ul className="elements__items">
          {props.cards.map((data) => {
            return (
              <Card
                card={data}
                key={data._id}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            )
          })}
        </ul>
      </section>
    </>
  );
}