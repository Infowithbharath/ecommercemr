import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import your CSS file
import Navbar from './components/Navbar'; // Assuming you have a Navbar
import CategoryForm from './components/CategoryForm';
import CategoriesList from './components/CategoriesList';
import SubcategoryForm from './components/SubcategoryForm';
import SubcategoriesList from './components/SubcategoriesList';
import ProductTypeForm from './components/ProductTypeForm'; // Import ProductTypeForm
import ProductTypeList from './components/ProductTypeList'; // Import ProductTypeList
import ProductForm from './components/ProductForm'; // Import ProductForm
import ProductList from './components/ProductList'; // Import ProductList

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<><CategoryForm /><CategoriesList /></>} />
            <Route path="/subcategories" element={<><SubcategoryForm /><SubcategoriesList /></>} />
            <Route path="/product-types" element={<ProductTypePage />} /> {/* Route for ProductTypeForm and ProductTypeList */}
            <Route path="/products" element={<ProductPage />} />
            {/* Add more routes for other components as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Create a separate component that renders both ProductTypeForm and ProductTypeList together
const ProductTypePage = () => {
  return (
    <div>
      <h1>Manage Product Types</h1>
      <ProductTypeForm /> {/* Render the form */}
      <ProductTypeList /> {/* Render the list */}
    </div>
  );
};

const ProductPage = () => {
  return (
    <div>
      <h1>Manage Products</h1>
      <ProductForm /> {/* Render the form */}
      <ProductList /> {/* Render the list */}
    </div>
  );
};

export default App;
