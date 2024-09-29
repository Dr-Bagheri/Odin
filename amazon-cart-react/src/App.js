import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Amazon from './components/Amazon';
import CheckoutPage from './components/CheckoutPage';
import Orders from './components/Orders';
import Products from './components/Products';
import ProductList from './components/ProductList';
import { CartProvider } from './context/CartContext';
import { DeliveryOptionsProvider } from './context/DeliveryOptionsContext';
import { OrdersProvider } from './context/OrdersContext';
import { ProductsProvider } from './context/ProductsContext';

function App() {
  return (
    <CartProvider>
      <DeliveryOptionsProvider>
        <OrdersProvider>
          <ProductsProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product-list" element={<ProductList />} />
                  <Route path="/" element={<Amazon />} />
                </Routes>
              </div>
            </Router>
          </ProductsProvider>
        </OrdersProvider>
      </DeliveryOptionsProvider>
    </CartProvider>
  );
}

export default App;