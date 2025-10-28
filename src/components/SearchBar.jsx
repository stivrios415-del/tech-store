import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange }) => {
  const categories = [
    { value: 'all', label: 'Todos los Productos' },
    { value: 'splash', label: ' splash' },
    { value: 'cremas', label: 'cremas' },
  ];

  return (
    <div className="search-bar">
 <input
  type="text"
  placeholder="Buscar productos..."
  className="search-input"
  style={{ fontSize: '14px' }} 
/>
  <select
    value={selectedCategory}
    onChange={(e) => onCategoryChange(e.target.value)}
    className="search-select"
  >
    <option value="all">Todas los productos</option>
    <option value="splash">Splash </option>
    <option value="cremas">Cremas</option>
  </select>
</div>
  );
};

export default SearchBar;