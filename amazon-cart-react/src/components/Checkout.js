import React from 'react';
import '../styles/shared/general.css';
import '../styles/pages/checkout/checkout-header.css';
import '../styles/pages/checkout/checkout.css';

const Checkout = () => {
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <a href="amazon.html">
              <img className="amazon-logo" src="images/amazon-logo.png" alt="Amazon Logo" />
              <img className="amazon-mobile-logo" src="images/amazon-mobile-logo.png" alt="Amazon Mobile Logo" />
            </a>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<a className="return-to-home-link" href="amazon.html">3 items</a>)
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" alt="Checkout Lock Icon" />
          </div>
        </div>
      </div>

      <div className="main">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary js-order-summary">
            {/* Order summary content */}
          </div>
		  <div className="payment-summary js-payment-summary">
			{/* Payment summary content */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;