import React from 'react';
import './Header.css';

const Header = ({ cartItemsCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <h1>🛍️ TechStore</h1>
          <span>Tu tienda de tecnología</span>
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