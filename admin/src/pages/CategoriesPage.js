// src/pages/CategoriesPage.js
import React from 'react';
import CategoriesList from '../components/CategoriesList';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
  return (
    <div>
      <h1>Manage Categories</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h2>Create / Edit Category</h2>
          <CategoryForm />
        </div>
        <div>
          <h2>Categories List</h2>
          <CategoriesList />
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
