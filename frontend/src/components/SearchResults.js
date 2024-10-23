import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import productService from '../services/productService';  // Import product service for fetching search results

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = new URLSearchParams(useLocation().search).get('q');  // Extract search term from URL

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const results = await productService.searchProducts(query);
        setSearchResults(results);
      } catch (error) {
        setError('Error fetching search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) {
    return <div>Loading search results...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="search-results-container">
      <h2>Search Results for "{query}"</h2>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((product) => (
            <li key={product._id}>
              <a href={`/product/${product._id}`}>{product.name}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default SearchResults;
