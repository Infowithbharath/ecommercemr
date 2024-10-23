// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        MC
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search for products..." />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="icons">
        <i className="fa fa-shopping-cart"></i>
        <span>Contact Us</span>
        <span>Support</span>
      </div>
    </header>
  );
};

export default Header;
