const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const gpay = require('./routes/stripePayment');
const razor = require('./routes/razorpay');


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // The origin of your frontend
  methods: 'GET, POST',
}));


app.use("/create-order", razor);
app.use('/api/stripe', gpay);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/stripe/payment', async (req, res) => {
  const { token, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in smallest currency unit (e.g., cents)
      currency: 'usd',
      payment_method_data: {
        type: 'card',
        card: { token: token }, // Use the token from Google Pay
      },
      confirm: true, // Automatically confirm the payment
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.error('Payment failed:', error);
    res.status(400).json({ success: false, message: error.message });
  }
});

// Import your routes
const createOrderRoute = require('./routes/createOrder');
const captureOrderRoute = require('./routes/captureOrder');

// Use the routes
app.use('/paypal', createOrderRoute);
app.use('/paypal', captureOrderRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
