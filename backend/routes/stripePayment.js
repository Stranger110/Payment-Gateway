// routes/stripePayment.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Your Stripe secret key

router.post('/payment', async (req, res) => {
  const { token, amount } = req.body;

  try {
    // Create a payment with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      payment_method_data: {
        type: 'card',
        token: token, // Use the token from Google Pay
      },
      confirm: true, // Confirm the payment immediately
    });

    res.status(200).json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
