
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shared/general.css';
import '../styles/shared/amazon-header.css';
import '../styles/pages/amazon.css';
import ProductList from './ProductList';

const Amazon = () => {
  return (
    <>
      <div className="amazon-header">
        <div className="amazon-header-left-section">
          <Link to="/" className="header-link">
            <img className="amazon-logo" src="images/amazon-logo-white.png" alt="Amazon Logo" />
            <img className="amazon-mobile-logo" src="images/amazon-mobile-logo-white.png" alt="Amazon Mobile Logo" />
          </Link>
        </div>

        <div className="amazon-header-middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" alt="Search Icon" />
          </button>
        </div>

        <div className="amazon-header-right-section">
          <Link to="/orders" className="orders-link header-link">
            <span className="returns-text">Returns</span>
            <span className="orders-text">& Orders</span>
          </Link>

          <Link to="/checkout" className="cart-link header-link">
            <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart Icon" />
            <div className="cart-quantity js-cart-quantity">0</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div className="amazon-main">
        <ProductList />
      </div>
    </>
  );
};

export default Amazon;