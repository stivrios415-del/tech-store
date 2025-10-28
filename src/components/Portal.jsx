import React from 'react';
import Portal from './Portal';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, total }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="cart-overlay" onClick={onClose}></div>
      <div className="cart-sidebar">
        <div className="cart-content">
          <div className="cart-header">
            <h2>🛒 Tu Carrito</h2>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <div className="cart-items">
            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Tu carrito está vacío</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price} c/u</span>
                  </div>
                  
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    
                    <span className="item-total">${item.price * item.quantity}</span>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              <button className="checkout-btn">Finalizar Compra</button>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default CartSidebar;