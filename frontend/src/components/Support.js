import React from 'react';
import './Support.css';

const Support = () => {
  return (
    <div className="support-container">
      <h2 className="support-title">Customer Support</h2>
      <p className="support-description">
        Our dedicated support team is available to help you with any issues or questions you may have. Choose an option below to get started.
      </p>
      <div className="support-options">
        <div className="support-option">
          <h3>General Support</h3>
          <p>If you have any general inquiries or need assistance with your orders, please contact us:</p>
          <a href="mailto:bharathkumar220502@gmail.com" className="support-link">Email Support</a>
          <a href="tel:+919150734658" className="support-link">Call Support</a>
        </div>
        <div className="support-option">
          <h3>Delivery Support</h3>
          <p>For delivery-related queries, contact our delivery team:</p>
          <a href="mailto:bkdhoni07@gmail.com" className="support-link">Email Delivery Support</a>
          <a href="tel:+919092634658" className="support-link">Call Delivery Support</a>
        </div>
      </div>
    </div>
  );
};

export default Support;
