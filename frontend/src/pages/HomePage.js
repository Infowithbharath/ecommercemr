import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import ProductTypeSlider from '../components/ProductTypeSlider';
import ProductPage from '../components/ProductPage';
import { getProductTypesBySubcategory } from '../services/productService';
import './HomePage.css';

const HomePage = () => {
  const { subcategoryId } = useParams(); // Extract subcategoryId from URL
  const navigate = useNavigate(); // For programmatic navigation
  const [selectedProductType, setSelectedProductType] = useState(null);
  const [productTypes, setProductTypes] = useState([]);

  // Fetch product types based on subcategoryId from the URL
  useEffect(() => {
    const fetchProductTypes = async () => {
      if (!subcategoryId) return;

      try {
        const response = await getProductTypesBySubcategory(subcategoryId);
        setProductTypes(response.data || []);
      } catch (error) {
        console.error('Failed to fetch product types:', error);
        setProductTypes([]);
      }
    };

    fetchProductTypes();
  }, [subcategoryId]);

  const handleProductTypeSelect = (productTypeId) => {
    setSelectedProductType(productTypeId);
    // Navigate to the Product Type Page
    navigate(`/product-type/${productTypeId}`);
  };

  const handleSubcategorySelect = (subcategoryId) => {
    // Navigate to the new subcategory page
    navigate(`/subcategory/${subcategoryId}`);
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <Navbar onSubcategorySelect={handleSubcategorySelect} />
      </header>

      <main className="homepage-main">
        <section className="homepage-banner">
          <Banner />
        </section>

        {/* Product Type Slider */}
        {productTypes.length > 0 && (
          <section className="homepage-products">
            <ProductTypeSlider 
              onProductTypeSelect={handleProductTypeSelect} 
              productTypes={productTypes}
            />
          </section>
        )}

        {/* Display products based on selected product type */}
        <section className="homepage-product-list">
          <ProductPage selectedProductType={selectedProductType} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
