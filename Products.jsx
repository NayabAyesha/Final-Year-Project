import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Options from '../components/Options';
import ProductCard from '../components/ProductCard';
import '../components/ProductCard.css'

function Products() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('Price');
  const [ascending, setAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const handleChange = (e) => {
    setFilter(e.target.value);
    setAscending(true);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const toggleSortingOrder = () => {
    setAscending(!ascending);
  };

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const skip = (currentPage - 1) * perPage;
        const response = await fetch(
          `http://localhost:5000/api/searchproduct?search=${query}&skip=${skip}&limit=${perPage}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        let sortedProducts = [...data];
        if (filter === 'Price') {
          sortedProducts.sort((a, b) => (ascending ? a.price - b.price : b.price - a.price));
        } else if (filter === 'Rating') {
          sortedProducts.sort((a, b) => (ascending ? b.rating - a.rating : a.rating - b.rating));
        }

        setProducts(sortedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query, filter, ascending, currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, products.length);

  return (
    <div>
      <Navbar />
      <Options filter={filter} handleChange={handleChange} toggleSortingOrder={toggleSortingOrder} />
      <div className="product-list">
        {products.length > 0 ? (
          products.slice(startIndex, endIndex).map((product) => (
            <Link key={product.id} to={`/productdetails?pid=${product._id}`}>
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
      <div className="pagination flex gap-6 mt-10 justify-center">
        <button className='page_button w-32' onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button className='page_button w-32' onClick={handleNextPage} disabled={endIndex >= products.length}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
