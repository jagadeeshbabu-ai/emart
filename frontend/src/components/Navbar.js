import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          E-Commerce Store
        </Link>
        
        <div className="nav-links">
          <Link to="/">Home</Link>
          
          {user ? (
            <>
              <Link to="/cart" className="cart-icon">
                🛒
                {getCartItemCount() > 0 && (
                  <span className="cart-badge">{getCartItemCount()}</span>
                )}
              </Link>
              <span>Welcome, {user.name}</span>
              <button onClick={logout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

