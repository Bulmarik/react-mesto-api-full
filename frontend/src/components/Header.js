import React from 'react';
import { Route, Link, useHistory } from 'react-router-dom';

export default function Header(props) {
  const history = useHistory();
  
  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  return (
    <header className="header">
      <div className="header__logo" />
      <div className="header__nav">
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Вход</Link>
        </Route>
        <Route exact path="/">
          <p className="header__user-email">{props.email}</p>
          <button onClick={signOut} className="header__link">Выход</button>
        </Route>
      </div>
    </header>
  );
}