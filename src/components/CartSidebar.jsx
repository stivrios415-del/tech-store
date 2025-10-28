import React from 'react';
import ReactDOM from 'react-dom';
import './CartSidebar.css';

const CartSidebar = ({
  isOpen,
  onClose,
  cart,
  onIncrementQuantity,
  onDecrementQuantity,
  onRemoveItem,
  total,
  onCheckout          // ← nueva prop
}) => {
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const content = (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-header">
        <h2 className="cart-title">Carrito</h2>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="cart-content">
        {cart.length === 0 ? (
          <p className="empty-cart">Tu carrito está vacío</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-price">${item.price}</p>
                    <div className="item-controls">
                      <button onClick={() => onDecrementQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onIncrementQuantity(item.id)}>+</button>
                      <button className="remove-btn" onClick={() => onRemoveItem(item.id)}>🗑️</button>
                    </div>
                  </div>
                  <div className="item-total">${(item.price * item.quantity).toFixed(0)}</div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <span className="total-items">{totalItems} artículos</span>
                <span className="total-price">${total.toFixed(0)}</span>
              </div>
              <button className="checkout-btn" onClick={onCheckout}>
                Proceder al Pago
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('cart-portal'));
};

export default CartSidebar;