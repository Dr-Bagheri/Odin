
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    } else {
      setCart([
        { productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', quantity: 2, deliveryOptionId: '1' },
        { productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', quantity: 1, deliveryOptionId: '2' }
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId) => {
    setCart(prevCart => {
      const matchingItem = prevCart.find(cartItem => cartItem.productId === productId);
      if (matchingItem) {
        return prevCart.map(cartItem =>
          cartItem.productId === productId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { productId, quantity: 1, deliveryOptionId: '1' }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.productId !== productId));
  };

  const updateDeliveryOption = (productId, deliveryOptionId) => {
    setCart(prevCart =>
      prevCart.map(cartItem =>
        cartItem.productId === productId
          ? { ...cartItem, deliveryOptionId }
          : cartItem
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateDeliveryOption }}>
      {children}
    </CartContext.Provider>
  );
};