
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ProductsContext } from '../../context/ProductsContext';
import { DeliveryOptionsContext } from '../../context/DeliveryOptionsContext';
import { formatCurrency } from '../../utils/money';
import dayjs from 'dayjs';

const OrderSummary = () => {
  const { cart, removeFromCart, updateDeliveryOption } = useContext(CartContext);
  const { getProduct } = useContext(ProductsContext);
  const { deliveryOptions, getDeliveryOption } = useContext(DeliveryOptionsContext);

  const renderDeliveryOptionsHTML = (product, cartItem) => {
    return deliveryOptions.map((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      return (
        <div key={deliveryOption.id} className="delivery-option-checkout js-delivery-option" data-product-id={product.id} data-delivery-option-id={deliveryOption.id}>
          <input
            type="radio"
            checked={isChecked}
            className="delivery-option-input-checkout"
            name={`delivery-option-${product.id}`}
            onChange={() => updateDeliveryOption(cartItem.productId, deliveryOption.id)}
          />
          <div>
            <div className="delivery-option-date-checkout">
              {deliveryDate}
            </div>
            <div className="delivery-option-price-checkout">
              {priceString} Shipping
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="order-summary">
      {cart.map(cartItem => {
        const product = getProduct(cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D');

        return (
          <div key={cartItem.productId} className={`cart-item-container js-cart-item-container-${product.id}`}>
            <div className="delivery-date-checkout">
              Delivery date: {deliveryDate}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image-checkout" src={product.image} alt={product.name} />

              <div className="cart-item-details">
                <div className="product-name-checkout">
                  {product.name}
                </div>
                <div className="product-price">
                  ${formatCurrency(product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                  </span>
                  <span className="update-quantity-link link-primary">
                    Update
                  </span>
                  <span className="delete-quantity-link link-primary js-delete-link" onClick={() => removeFromCart(cartItem.productId)}>
                    Delete
                  </span>
                </div>
                
              </div>
			  
			  <div className="delivery-options-checkout">
			  <div class="delivery-options-title-checkout" >Choose a delivery option:</div>
                  {renderDeliveryOptionsHTML(product, cartItem)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSummary;