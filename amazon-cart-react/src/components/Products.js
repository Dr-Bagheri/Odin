
import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/backend/products.json')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="products">
      {products.map(product => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>Rating: {product.rating.stars} ({product.rating.count} reviews)</p>
          <p>Price: ${(product.priceCents / 100).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;