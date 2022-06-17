import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../images/logo-white.svg";
import CheckDeviceIsMobile from "./CheckDeviceIsMobile";

function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = CheckDeviceIsMobile();

  const handleMenuButton = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    props.signOut();
    setIsOpen(false);
  };

  return (
    <>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <header className="header">
              <img
                src={logo}
                className="header__logo"
                alt="Место Россия логотип"
              />
              <div className="header__user-menu">
                <Link to="/sign-up" className="header__link">
                  Регистрация
                </Link>
              </div>
            </header>
          }
        />
        <Route
          path="/sign-up"
          element={
            <header className="header">
              <img
                src={logo}
                className="header__logo"
                alt="Место Россия логотип"
              />
              <div className="header__user-menu">
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>
              </div>
            </header>
          }
        />
        <Route
          path="/"
          element={
            isMobile ? (
              isOpen ? (
                <header className="header">
                  <div className="header__user-menu header__user-menu_mobile">
                    <p className="header__user-email">
                      {props.loggedIn ? props.email : "unknown email"}
                    </p>
                    <p className="header__link" onClick={handleSignOut}>
                      Выйти
                    </p>
                  </div>
                  <img
                    src={logo}
                    className="header__logo"
                    alt="Место Россия логотип"
                  />
                  <button
                    className="header__menu-icon header__menu-icon_opened"
                    type="button"
                    onClick={handleMenuButton}
                  ></button>
                </header>
              ) : (
                <header className="header">
                  <img
                    src={logo}
                    className="header__logo"
                    alt="Место Россия логотип"
                  />
                  <button
                    className="header__menu-icon header__menu-icon_closed"
                    type="button"
                    onClick={handleMenuButton}
                  ></button>
                </header>
              )
            ) : (
              <header className="header">
                <img
                  src={logo}
                  className="header__logo"
                  alt="Место Россия логотип"
                />
                <div className="header__user-menu">
                  <p className="header__user-email">
                    {props.loggedIn ? props.email : "unknown email"}
                  </p>
                  <p className="header__link" onClick={handleSignOut}>
                    Выйти
                  </p>
                </div>
              </header>
            )
          }
        />
      </Routes>
    </>
  );
}

export default Header;
