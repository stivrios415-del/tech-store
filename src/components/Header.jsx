import React from 'react';
import './Header.css';
import logo from './logo.svg';

const Header = ({ cartItemsCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <span>La tienda de tus sueños</span>
        </div>

        <button onClick={onCartClick} className="cart-btn-mobile">
          🛒 {cartItemsCount}
        </button>
      </div>

      <nav className="nav-links">
        <a href="#inicio" className="nav-link">Inicio</a>
        <a href="#productos" className="nav-link">Productos</a>
        <a href="#ofertas" className="nav-link">Ofertas</a>
      </nav>
    </header>
  );
};

export default Header;