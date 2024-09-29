
import React, { createContext } from 'react';

export const DeliveryOptionsContext = createContext();

export const DeliveryOptionsProvider = ({ children }) => {
  const deliveryOptions = [
    { id: '1', deliveryDays: 7, priceCents: 0 },
    { id: '2', deliveryDays: 3, priceCents: 499 },
    { id: '3', deliveryDays: 1, priceCents: 999 }
  ];

  const getDeliveryOption = (deliveryOptionId) => {
    return deliveryOptions.find(option => option.id === deliveryOptionId) || deliveryOptions[0];
  };

  return (
    <DeliveryOptionsContext.Provider value={{ deliveryOptions, getDeliveryOption }}>
      {children}
    </DeliveryOptionsContext.Provider>
  );
};