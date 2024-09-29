
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductsContext } from '../context/ProductsContext';
import '../styles/shared/general.css';
import '../styles/shared/amazon-header.css';
import '../styles/pages/orders.css';
import { formatCurrency } from '../utils/money';

const Orders = () => {
  const { cart } = useContext(CartContext);
  const { getProduct } = useContext(ProductsContext);

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
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>

      <div className="order-main">
		<div className="orders-grid">
        {cart.length === 0 ? (
          <div>No items in the cart</div>
        ) : (
          cart.map(cartItem => {
            const product = getProduct(cartItem.productId);
            return (
              <div key={cartItem.productId} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>${formatCurrency(product.priceCents * cartItem.quantity)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{cartItem.productId}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-details">
                    <div className="product-name">
                      {product.name}
                    </div>
                    <div className="product-delivery-date">
                      Arriving on: {new Date().toLocaleDateString()}
                    </div>
                    <div className="product-quantity">
                      Quantity: {cartItem.quantity}
                    </div>
                    <button className="buy-again-button button-primary">
                      <img className="buy-again-icon" src="images/icons/buy-again.png" alt="Buy Again" />
                      <span className="buy-again-message">Buy it again</span>
                    </button>
                  </div>

                  <div className="product-actions">
                    <Link to="">
                      <button className="track-package-button button-secondary">
                        Track package
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
		</div>
      </div>
    </>
  );
};

export default Orders;