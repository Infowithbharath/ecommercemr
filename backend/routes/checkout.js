const express = require('express');
const router = express.Router();
const PaytmChecksum = require('paytmchecksum');
const https = require('https');
const { v4: uuidv4 } = require('uuid');

// MongoDB Order model
const Order = require('../models/Order');

router.post('/checkout', async (req, res) => {
  const { name, phone, email, address, landmark, pincode, cart, totalPrice } = req.body;

  // Create new order and save it to the database
  const newOrder = new Order({
    name,
    phone,
    email,
    address,
    landmark,
    pincode,
    cart,
    totalPrice,
    paymentStatus: 'Pending',
  });

  try {
    const savedOrder = await newOrder.save();

    // Paytm Payment Integration Logic
    const paytmParams = {};

    paytmParams['MID'] = process.env.PAYTM_MERCHANT_ID;
    paytmParams['WEBSITE'] = 'WEBSTAGING'; // Use the correct staging or production website
    paytmParams['CHANNEL_ID'] = 'WEB';
    paytmParams['INDUSTRY_TYPE_ID'] = 'Retail';
    paytmParams['ORDER_ID'] = uuidv4(); // Unique order ID
    paytmParams['CUST_ID'] = phone; // Unique customer ID
    paytmParams['TXN_AMOUNT'] = totalPrice.toString(); // Transaction amount
    paytmParams['CALLBACK_URL'] = 'http://localhost:6000/api/checkout/callback'; // Callback URL for Paytm
    paytmParams['EMAIL'] = email || '';
    paytmParams['MOBILE_NO'] = phone;

    const paytmChecksum = await PaytmChecksum.generateSignature(paytmParams, process.env.PAYTM_MERCHANT_KEY);

    paytmParams['CHECKSUMHASH'] = paytmChecksum;

    res.json({
      status: 'success',
      data: paytmParams,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process the order' });
  }
});

router.post('/callback', (req, res) => {
  const received_data = req.body;

  // Validate checksum
  const paytmChecksum = received_data.CHECKSUMHASH;
  delete received_data.CHECKSUMHASH;

  const isValidChecksum = PaytmChecksum.verifySignature(received_data, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);

  if (isValidChecksum) {
    // Update the order payment status in the database
    if (received_data.STATUS === 'TXN_SUCCESS') {
      // Payment successful
      Order.findOneAndUpdate({ orderId: received_data.ORDERID }, { paymentStatus: 'Success' }, (err, order) => {
        if (err || !order) {
          return res.status(500).json({ error: 'Failed to update payment status' });
        }
        res.redirect('http://localhost:3000/payment-success'); // Redirect to success page
      });
    } else {
      // Payment failed
      Order.findOneAndUpdate({ orderId: received_data.ORDERID }, { paymentStatus: 'Failed' }, (err, order) => {
        if (err || !order) {
          return res.status(500).json({ error: 'Failed to update payment status' });
        }
        res.redirect('http://localhost:3000/payment-failure'); // Redirect to failure page
      });
    }
  } else {
    res.status(400).json({ error: 'Checksum Mismatch' });
  }
});


module.exports = router;
