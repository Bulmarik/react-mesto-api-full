import React from 'react';
import { Route, Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__nav">
        <Route path="/signin">
          <Link to="/signup" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/signup">
          <Link to="/signin" className="header__link">Вход</Link>
        </Route>
        <Route exact path="/">
          <p className="header__user-email">{props.email}</p>
          <button onClick={props.onSignOut} className="header__link">Выход</button>
        </Route>
      </div>
    </header>
  );
}