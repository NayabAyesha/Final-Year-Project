import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './Categories.css';

function Categories() {
  const [category, setCategory] = useState('Laptop');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Laptop', 'Smart Watch', 'iPhone 12', 'Samsung Galaxy'];

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setLoading(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/searchproduct?search=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.slice(0, 10)); // Limit to 30 products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="categories-container">
        <div className="categories-list">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`category-button ${category === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <Link key={product._id} to={`/productdetails?pid=${product._id}`}>
                <ProductCard
                  name={product.name}
                  price={`Rs. ${product.price}`}
                  website={product.source}
                  imgSrc={product.image}
                  rating={product.rating}
                  reviews={product.numReviews}
                />
              </Link>
            ))
          ) : (
            <div>No products found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
