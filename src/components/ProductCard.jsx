import React from 'react';
import './ProductCard.css';

const imageMap = {
  1: '/vainilla.jpg',  //splash
  2: '/pure.jpg', // splash2 
  3: '/coconut.jpg', 
  4: '/rorr.jpg', 
  5: '/ddddw.jpg', 
  6: '/agguaa.jpg', 
  7: '/cree.jpg',
};

const ProductCard = ({ product, onAddToCart }) => {
  console.log('ProductCard -> id:', product.id, 'imagen:', imageMap[product.id]);
  return (
    <div className="product-card">
      <img src={imageMap[product.id]} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
     <button className="btn-add" onClick={onAddToCart}>Añadir al carrito</button>
    </div>
  );
};

export default ProductCard;