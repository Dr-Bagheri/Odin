
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { ProductsContext } from '../context/ProductsContext';
import { formatCurrency } from '../utils/money';

const ProductList = () => {
  const { products } = useContext(ProductsContext);
  const { cart, addToCart } = useContext(CartContext);

  useEffect(() => {
    updateCartQuantity();
  }, [cart]);

  const updateCartQuantity = () => {
    let cartQuantity = 0;
    cart.forEach(cartItem => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  };

  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="products-grid js-products-grid">
      {products.map(product => (
        <div key={product.id} className="product-container">
          <div className="product-image-container">
            <img className="product-image" src={product.image} alt={product.name} />
          </div>

          <div className="product-name limit-text-to-2-lines">
            {product.name}
          </div>

          <div className="product-rating-container">
            <img className="product-rating-stars" src={`images/ratings/rating-${product.rating.stars * 10}.png`} alt={`${product.rating.stars} stars`} />
            <div className="product-rating-count link-primary">
              {product.rating.count}
            </div>
          </div>

          <div className="product-price">
            ${formatCurrency(product.priceCents)}
          </div>

          <div className="product-quantity-container">
            <select>
              {[...Array(10).keys()].map(i => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div className="product-spacer"></div>

          <div className="added-to-cart">
            <img src="images/icons/checkmark.png" alt="Checkmark" />
            Added
          </div>

          <button className="add-to-cart-button button-primary js-add-to-cart" onClick={() => {
            addToCart(product.id);
            updateCartQuantity();
          }}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;