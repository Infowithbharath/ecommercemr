// src/pages/SubcategoriesPage.js
import React from 'react';
import SubcategoriesList from '../components/SubcategoriesList';
import SubcategoryForm from '../components/SubcategoryForm';

const SubcategoriesPage = () => {
  return (
    <div>
      <h1>Manage Subcategories</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h2>Create / Edit Subcategory</h2>
          <SubcategoryForm />
        </div>
        <div>
          <h2>Subcategories List</h2>
          <SubcategoriesList />
        </div>
      </div>
    </div>
  );
};

export default SubcategoriesPage;
