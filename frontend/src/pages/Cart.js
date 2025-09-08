import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const Cart = () => {
  const { user } = useAuth();
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      if (!cart.items || cart.items.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Cart items are already populated with item details from the backend
        setItems(cart.items);
      } catch (error) {
        console.error('Error loading cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    const loadGuestCartItems = async () => {
      if (!cart.items || cart.items.length === 0) {
        setItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const itemIds = cart.items.map(item => item.itemId);
        const response = await axios.get(`/api/items?ids=${itemIds.join(',')}`);
        
        // Merge cart items with item details
        const cartItems = cart.items.map(cartItem => {
          const itemDetails = response.data.items.find(item => item._id === cartItem.itemId);
          return {
            ...cartItem,
            itemId: itemDetails || { _id: cartItem.itemId, name: 'Item not found', price: 0, image: '' }
          };
        });
        
        setItems(cartItems);
      } catch (error) {
        console.error('Error loading cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadCartItems();
    } else {
      loadGuestCartItems();
    }
  }, [user, cart]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    const result = await updateQuantity(itemId, newQuantity);
    if (!result.success) {
      alert(result.message || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      const result = await removeFromCart(itemId);
      if (!result.success) {
        alert(result.message || 'Failed to remove item');
      }
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      const result = await clearCart();
      if (!result.success) {
        alert(result.message || 'Failed to clear cart');
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading cart...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some items to get started!</p>
        </div>
      </div>
    );
  }

  const total = getCartTotal(items);

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      
      <div className="grid grid-2">
        <div>
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <img 
                src={item.itemId.image || 'https://via.placeholder.com/80x80?text=No+Image'} 
                alt={item.itemId.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.itemId.name}</h3>
                <div className="cart-item-price">${item.itemId.price}</div>
                
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(item.itemId._id, item.quantity - 1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.itemId._id, parseInt(e.target.value) || 1)}
                    className="quantity-input"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(item.itemId._id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <button
                  onClick={() => handleRemoveItem(item.itemId._id)}
                  className="btn btn-danger"
                  style={{ marginTop: '10px' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-total">
          <h3>Order Summary</h3>
          <div className="total-row">
            <span>Subtotal ({items.reduce((total, item) => total + item.quantity, 0)} items)</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="total-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="total-row">
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div className="total-row final">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
            Proceed to Checkout
          </button>
          
          <button 
            onClick={handleClearCart}
            className="btn btn-secondary" 
            style={{ width: '100%', marginTop: '10px' }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

