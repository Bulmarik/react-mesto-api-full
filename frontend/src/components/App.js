import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import RemovePlacePopup from './RemovePlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';
import success from '../images/ok.png';
import fail from '../images/x.png';

export default function App() {
  const history = useHistory();

  //// ХУКИ
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [headerEmail, setHeaderEmail] = React.useState("");
  const [infoTool, setInfoTool] = React.useState({message: '', icon: ''});

  //// ПРОМИСЫ
  // вход в учётную запись
  function handleLogin(data) {
    const {password, email} = data.inputValue;
    if (!email || !password){
      return;
    }
    auth.authorize(password, email)
      .then((res) => {
        if (res.token){
          data.setInputValue({email: '', password: ''});
          setLoggedIn(true);
          history.push('/');
          setHeaderEmail(email);
        }
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
        handleInfoTooltip({
          message: 'Неверный логин или пароль!',
          icon: fail
        });
      })
  }

  // регистрация новой учётной записи
  function handleRegister(data) {
    const {password, email} = data;
    auth.register(password, email)
      .then((res) => {
        if(res.status === 201){
          handleInfoTooltip({
            message: 'Вы успешно зарегистрировались!',
            icon: success
          });
          history.push('/sign-in');
        } else {
          handleInfoTooltip({
            message: 'Что-то пошло не так! Попробуйте ещё раз',
            icon: fail
          })
        }
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }

  // авторизация по токену
  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push("/");
            setHeaderEmail(res.data.email);
          }
        })
        .catch((res) => {
          console.log(`Ошибка: ${res.status}`);
        })
    }
  }, [history])

  // начальные карточки
  React.useEffect(() => {
    if(loggedIn) {
      api.getInitialCards()
        .then((initialCards) => {
          setCards(initialCards)
        })
        .catch((res) => {
          console.log(`Ошибка: ${res.status}`);
        })
    }
  }, [loggedIn])

  // инфо пользователя
  React.useEffect(() => {
    if(loggedIn) {
      api.getUser()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((res) => {
          console.log(`Ошибка: ${res.status}`);
        })
    }
  }, [loggedIn])

  // обновление аватара
  function handleUpdateAvatar(data) {
    api.setAvatar(data)
      .then ((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }

  // обновление инфо пользователя
  function handleUpdateUser(data) {
    api.setUser(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }

  // добавление новых карточек
  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }

  // удаление карточек
  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        const newList = cards.filter((c) => c._id !== card._id);
        setCards(newList);
        closeAllPopups();
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
    }

  // лайки карточек
  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards)
      })
      .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
      })
  }

  //// ОБРАБОТЧИКИ
  // открытие попапа редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // открытие попапа редактирования инфо пользователя
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // открытие попапа добавления карточек
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // открытие попапа просмотра карточек
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  
  // открытие попапа подтверждения удаления карточек
  function handleRemovePlaceClick(card) {
    setIsRemovePlacePopupOpen(card);
  }

  // открытие попапа отчета о регистрации новой учетной записи
  function handleInfoTooltip(data) {
    setIsInfoTooltipOpen(true);
    setInfoTool(data);
  }
  
  // закрытие попапа
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsRemovePlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header
          email={headerEmail}
        />

        <Switch>
          {/* Основной контент */}
          <ProtectedRoute 
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
              className="content"
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleRemovePlaceClick}
          />

          {/* Вход */}
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>

          {/* Регистрация */}
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          {/* Перенаправление на Вход */}
          <Route>
            {loggedIn ? (<Redirect to="/" />) : (<Redirect to="sign-in" />)}
          </Route>
        </Switch>

        <Footer />

        {/* Аватарка */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* Юзер */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* Добавление карточек */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* Удаление карточек */}
        <RemovePlacePopup
          isOpen={isRemovePlacePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />

        {/* Просмотр картинок */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        {/* Отчет о регистрации */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          infoTool={infoTool}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}