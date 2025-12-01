import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import './App.css';

function App() {
   const [products] = useState([
  { id: 1, name: 'victoria secret base vainilla', price: 8, category: 'splash', image: '/vainilla.jpg', description: 'splash con un olor delicioso', rating: 4.9, stock: 15 },
  { id: 2, name: 'victoria secret', price: 8, category: 'splash', image: '/pure.jpg', description: 'splash con un perfume elegante', rating: 4.8, stock: 25 },
  { id: 3, name: 'victoria secret coco nut passion', price: 8, category: 'splash', image: '/coconut.jpg', description: 'splash olor a coco', rating: 4.7, stock: 30 },
  { id: 4, name: 'victoria secret cosmic wish', price: 8, category: 'splash', image: '/rorr.jpg', description: 'splash con un olor super riquisimo', rating: 4.6, stock: 20 },
  { id: 5, name: 'victoria secret temptation', price: 6, category: 'splash', image: '/ddddw.jpg', description: 'Frescura total con este splash', rating: 4.5, stock: 35 },
  { id: 6, name: 'victoria secret agua kiss', price: 9, category: 'splash', image: '/agguaa.jpg', description: 'un olor lleno de frescura total', rating: 4.9, stock: 10 },
  { id: 7, name: 'body cream', price: 9, category: 'cremas', image: '/cree.jpg', description: 'Crema con un olor muy masculino', rating: 4.9, stock: 11 },
  { id: 8, name: 'body cream bourbon', price: 10, category: 'cremas', image: '/bubur.jpg', description: 'crema con un olor increible', rating: 4.9, stock: 11 },
  { id: 9, name: 'body cream ocean', price: 8, category: 'cremas', image: '/ocenai.jpg', description: 'crema con un olor a oceano muy rico', rating: 4.9, stock: 11 },
  { id: 10, name: 'body cream after dark', price: 7, category: 'cremas', image: '/bpdu.jpg', description: 'crema con un olor muy abundante', rating: 4.6, stock: 78 },
  { id: 11, name: 'body cream noir',price: 12,category: 'cremas', image: '/nunu.jpg',description:'crema con un olor muy masculino', rating : 4.7,stock: 50},
  { id: 12, name: 'supermabelline',price:13,category:'lispticks', image: '',description:'elige el lipstick de tu preferencia',rating:4.8,stock:49},
  { id: 13, name: 'L oreal paris',price:11,category:'lispticks',image: '', description: 'este color queda perfecto',rating:4.6,stock:48},
  { id: 14, name: 'body cream marble',price:10,category:'cremas',image:'',description:'crema con un olor espectacular',rating:3.8,stock:47},
]);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const addToCart = product => {
    setCart(prev => {
      const exist = prev.find(i => i.id === product.id);
      if (exist) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartItemsCount = cart.reduce((s, i) => s + i.quantity, 0);

  const removeFromCart = productId =>
    setCart(prev => prev.filter(item => item.id !== productId));

  const incrementQuantity = productId =>
    setCart(prev => prev.map(item => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item)));

  const decrementQuantity = productId =>
    setCart(prev =>
      prev
        .map(item => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter(item => item.quantity > 0)
    );

  return (
    <div className="app">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />
      <main className="main-content">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <h2 className="products-count">
          {filteredProducts.length} Producto{filteredProducts.length !== 1 ? 's' : ''} Encontrado{filteredProducts.length !== 1 ? 's' : ''}
        </h2>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        total={cartTotal}
        onRemoveItem={removeFromCart}
        onIncrementQuantity={incrementQuantity}
        onDecrementQuantity={decrementQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Modal de pago con carrito */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={cartTotal}
        cart={cart}
      />
    </div>
  );
}

export default App;