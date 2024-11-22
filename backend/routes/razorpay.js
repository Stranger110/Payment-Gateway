const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();

// Load environment variables
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_SECRET_KEY',
});

// POST endpoint to create an order
router.post("/", async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees
    const options = {
      amount: amount * 100, // Convert rupees to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;