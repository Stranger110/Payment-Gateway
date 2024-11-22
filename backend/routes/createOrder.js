// createOrder.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Use 'https://api-m.paypal.com' for live
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

router.post('/create-order', async (req, res) => {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const order = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '100.00', // This should be dynamic based on your cart
        },
      }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
    });

    res.json(order.data);
  } catch (error) {
    console.error('Error creating PayPal order', error);
    res.status(500).json({ error: 'An error occurred while creating the order' });
  }
});

module.exports = router;
