const express = require('express');
const app = express();
const cors = require('cors');
const stripepay = require('./routes/payment-intent')
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // The origin of your frontend
  methods: 'GET, POST',
}));
app.use('/api', stripepay);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/create-payment-intent', async (req, res) => {
//   const { paymentMethodId, amount } = req.body;

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,   // Amount in cents
//       currency: 'usd',
//       payment_method: paymentMethodId,
//       confirm: true,   // Immediately confirm the payment
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

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
