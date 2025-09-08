import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const ItemCard = ({ item }) => {
  const [adding, setAdding] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    setAdding(true);
    const result = await addToCart(item._id, 1);
    setAdding(false);

    if (result.success) {
      alert('Item added to cart!');
    } else {
      alert(result.message || 'Failed to add item to cart');
    }
  };

  return (
    <div className="item-card">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-content">
        <div className="item-category">{item.category}</div>
        <h3 className="item-name">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-price">${item.price}</div>
        <button
          onClick={handleAddToCart}
          disabled={adding || item.stock === 0}
          className={`btn ${item.stock === 0 ? 'btn-secondary' : 'btn-primary'}`}
        >
          {adding ? 'Adding...' : item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ItemCard;

