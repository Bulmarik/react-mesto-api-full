import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Register(props) {
  const [inputValue, setInputValue] = React.useState({
    email: "",
    password: ""
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setInputValue({
      ...inputValue,
      [name]: value 
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(inputValue);
  }

  return (
    <div className="register">
        <form className="register__form" onSubmit={handleSubmit} id="register-form" action="#" method="post">
          <h3 className="register__title">Регистрация</h3>
          <input className="register__input register__input_type_email" onChange={handleChange} value={inputValue.email} name="email" placeholder="Email" type="email" required />
          <span className="register__error" id="email-error" />
          <input className="register__input register__input_type_password" onChange={handleChange} value={inputValue.password} name="password" placeholder="Пароль" type="password" maxLength="30" minLength="7" required />
          <span className="register__error" id="password-error" />
          <button className="register__submit-btn" type="submit">Зарегистрироваться</button>
          <p className="register__question">Уже зарегистрированы? <Link to="/sign-in" className="register__link" src="">Войти</Link></p>
        </form>
    </div>
  )
}

export default withRouter(Register);