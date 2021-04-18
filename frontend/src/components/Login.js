import React from 'react';
import { withRouter } from 'react-router-dom';

function Login(props) {
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

  function handleSubmit(e){
    e.preventDefault();
    props.onLogin({
      inputValue, 
      setInputValue
    })
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit} id="login-form" action="#" method="post">
        <h3 className="login__title">Вход</h3>
        <input className="login__input login__input_type_email" onChange={handleChange} value={inputValue.email} name="email" placeholder="Email" type="email" required />
        <span className="login__error" id="email-error" />
        <input className="login__input login__input_type_password" onChange={handleChange} value={inputValue.password} name="password" maxLength="30" minLength="7" placeholder="Пароль" type="password" required />
        <span className="login__error" id="password-error" />
        <button className="login__submit-btn" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default withRouter(Login);