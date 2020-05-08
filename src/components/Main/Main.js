import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  render() {
    return (
      <div>
        <nav className="mobile-menu">
          <input type="checkbox" id="checkbox" className="mobile-menu__checkbox"></input>
          <label htmlFor="checkbox" className="mobile-menu__btn">
            <div className="mobile-menu__icon"></div>
          </label>
            <div className="mobile-menu__container">
              <ul className="mobile-menu__list">
                <li className="mobile-menu__item"><a onClick={ () => this.props.history.push('/signin_form') } className="mobile-menu__link">Вход</a></li>
                <li className="mobile-menu__item"><a onClick={ () => this.props.history.push('/about') } className="mobile-menu__link">О нас</a></li>
                <li className="mobile-menu__item"><a onClick={ () => this.props.history.push('/contacts') } className="mobile-menu__link">Контакты</a></li>
              </ul>
            </div>
        </nav>
        <div className="body">
        <div className="body_background">
          </div>
          <div className="body_text">
            <h1>Электронная очередь "QR Scanner"</h1>
              <h4>Просканируйте QR Code для получения номера в электронной очереди:</h4>
            <p>
              <button 
                className="body_button"
                onClick={ () => this.props.history.push('/qr_code') }> 
                Сканировать
                </button></p>
          </div>
        </div>
        <div>
      </div>
        <footer className="footer">
          <div className="footer_item">
          <div className="footer-menu__container">
              <ul className="footer-menu__list">
                <li className="footer-menu__item"><a onClick={ () => this.props.history.push('/') } className="footer-menu__link">Главная</a></li>
                <li className="footer-menu__item"><a onClick={ () => this.props.history.push('/about') } className="footer-menu__link">О нас</a></li>
                <li className="footer-menu__item"><a onClick={ () => this.props.history.push('/contacts') } className="footer-menu__link">Контакты</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    );
  };
};

export default Main;
