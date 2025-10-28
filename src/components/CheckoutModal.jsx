// src/components/CheckoutModal.jsx
import React, { useState } from 'react';
import './CheckoutModal.css';

const CheckoutModal = ({ isOpen, onClose, total, cart }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const productos = cart
      .map(item => `• ${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(0)}`)
      .join('%0A');

    const mensaje = `¡Nuevo pedido!%0A%0A` +
      `Nombre: ${form.nombre} ${form.apellido}%0A` +
      `Dirección: ${form.direccion}%0A%0A` +
      `Productos:%0A${productos}%0A%0A` +
      `*Total: $${total.toFixed(0)}*%0A%0A` +
      `📸 Manda foto del comprobante por aquí mismo. ¡Gracias! 😊`;

    const telefono = '50489542041';
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-dark" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-dark" onClick={onClose}>×</button>
        <h2 className="modal-title-dark">Finalizar Compra</h2>

        <form onSubmit={handleSubmit} className="checkout-form-dark">
          <label className="form-label-dark">Nombre</label>
          <input type="text" name="nombre" required className="form-input-dark" onChange={handleChange} />

          <label className="form-label-dark">Apellido</label>
          <input type="text" name="apellido" required className="form-input-dark" onChange={handleChange} />

          <label className="form-label-dark">Lugar de Entrega</label>
          <textarea name="direccion" required className="form-textarea-dark" onChange={handleChange} />

          <div className="payment-info-dark">
            <p><strong>Total a pagar:</strong> ${total}</p>
            <p>Banco: davivienda</p>
            <p>Titular: Ronald</p>
            <p>Cuenta: 90779080978</p>
          </div>

          <button type="submit" className="confirm-btn-dark">Confirmar Pedido</button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;