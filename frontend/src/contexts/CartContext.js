import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Load user's cart from server when logged in
  useEffect(() => {
    const loadCart = async () => {
      if (!token) return;
      
      setLoading(true);
      try {
        const response = await axios.get('/api/cart');
        // The backend returns the cart with populated items
        setCart(response.data);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      loadCart();
    }
  }, [user, token]);

  const loadCart = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const response = await axios.get('/api/cart');
      // The backend returns the cart with populated items
      setCart(response.data);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (itemId, quantity = 1) => {
    if (!user || !token) {
      // For guest users, add to local cart
      addToLocalCart(itemId, quantity);
      return { success: true };
    }

    try {
      const response = await axios.post('/api/cart/add', { itemId, quantity });
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to add item to cart'
      };
    }
  };

  const addToLocalCart = (itemId, quantity) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.itemId === itemId);
      
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map(item =>
            item.itemId === itemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      } else {
        return {
          ...prevCart,
          items: [...prevCart.items, { itemId, quantity }]
        };
      }
    });
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!user || !token) {
      // For guest users, update local cart
      updateLocalQuantity(itemId, quantity);
      return { success: true };
    }

    try {
      const response = await axios.put('/api/cart/update', { itemId, quantity });
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update cart'
      };
    }
  };

  const updateLocalQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromLocalCart(itemId);
    } else {
      setCart(prevCart => ({
        ...prevCart,
        items: prevCart.items.map(item =>
          item.itemId === itemId
            ? { ...item, quantity }
            : item
        )
      }));
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user || !token) {
      // For guest users, remove from local cart
      removeFromLocalCart(itemId);
      return { success: true };
    }

    try {
      const response = await axios.delete(`/api/cart/remove/${itemId}`);
      setCart(response.data.cart);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to remove item from cart'
      };
    }
  };

  const removeFromLocalCart = (itemId) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.itemId !== itemId)
    }));
  };

  const clearCart = async () => {
    if (!user || !token) {
      // For guest users, clear local cart
      setCart({ items: [] });
      return { success: true };
    }

    try {
      await axios.delete('/api/cart/clear');
      setCart({ items: [] });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to clear cart'
      };
    }
  };

  const getCartItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = (items) => {
    if (!items) return 0;
    return items.reduce((total, item) => {
      const price = item.itemId?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart,
    getCartItemCount,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

