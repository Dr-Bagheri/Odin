import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shared/general.css';
import '../styles/pages/checkout/checkout-header.css';
import '../styles/pages/checkout/checkout.css';
import OrderSummary from './checkout/OrderSummary';
import PaymentSummary from './checkout/PaymentSummary';

const CheckoutPage = () => {
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="amazon-logo" src="images/amazon-logo.png" alt="Amazon Logo" />
              <img className="amazon-mobile-logo" src="images/amazon-mobile-logo.png" alt="Amazon Mobile Logo" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link" to="/">3 items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" alt="Checkout Lock Icon" />
          </div>
        </div>
      </div>

      <div className="checkout-main">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary js-order-summary">
            <OrderSummary />
          </div>

          <div className="payment-summary js-payment-summary">
            <PaymentSummary />
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;