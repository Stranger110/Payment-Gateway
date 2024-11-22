// captureOrder.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Use 'https://api-m.paypal.com' for live
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;

router.post('/capture-order', async (req, res) => {
  const { orderID } = req.body;

  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64');
    const capture = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
    });

    res.json(capture.data);
  } catch (error) {
    console.error('Error capturing PayPal order', error);
    res.status(500).json({ error: 'An error occurred while capturing the order' });
  }
});

module.exports = router;
