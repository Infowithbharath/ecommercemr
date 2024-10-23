// src/layout/AdminLayout.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <nav style={{ background: '#f5f5f5', padding: '1rem' }}>
        <ul style={{ listStyleType: 'none', display: 'flex', gap: '20px' }}>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/subcategories">Subcategories</Link>
          </li>
        </ul>
      </nav>
      <div className="admin-content" style={{ padding: '2rem' }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
