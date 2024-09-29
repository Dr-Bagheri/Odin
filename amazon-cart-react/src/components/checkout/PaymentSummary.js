
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ProductsContext } from '../../context/ProductsContext';
import { DeliveryOptionsContext } from '../../context/DeliveryOptionsContext';
import { formatCurrency } from '../../utils/money';
import { OrdersContext } from '../../context/OrdersContext';
import { useNavigate } from 'react-router-dom';

const PaymentSummary = () => {
  const { cart } = useContext(CartContext);
  const { getProduct } = useContext(ProductsContext);
  const { getDeliveryOption } = useContext(DeliveryOptionsContext);
  const { addOrder } = useContext(OrdersContext);
  const navigate = useNavigate();
  
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach(cartItem => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = taxCents + totalBeforeTaxCents;

  const handlePlaceOrder = () => {
    const order = {
      items: cart,
      totalCents,
      date: new Date().toISOString()
    };
    addOrder(order);
	navigate('/orders');
    // Clear cart or redirect to order confirmation page
  };

  return (
    <>
      <div className="payment-summary-title">Order Summary</div>

      <div className="payment-summary-row">
        <div>Items ({cart.length}):</div>
        <div className="payment-summary-money">${formatCurrency(productPriceCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">${formatCurrency(totalBeforeTaxCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">${formatCurrency(taxCents)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">${formatCurrency(totalCents)}</div>
      </div>

      <button className="place-order-button button-primary" onClick={handlePlaceOrder}>
        Place your order
      </button>
    </>
  );
};

export default PaymentSummary;