const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_PUBLIC_KEY');
const router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { paymentMethodId, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirmation_method: 'manual',
      confirm: true,
    });

    res.send({ success: true, paymentIntent });
  } catch (error) {
    console.error('[Error creating PaymentIntent]', error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;