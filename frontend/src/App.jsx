import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import Form from "./Form"
import PayPalButton from "./buttons/PayPalButton"; // The component where PayPalButton is rendered
import GooglePayButtonComponent from "./buttons/GooglePayButtonComponent";
import RazorpayButton from "./buttons/RazorpayButton";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Form/>} />
        <Route path="/paypal" element={<PayPalButton/>} />
        <Route path="/gpay" element={<GooglePayButtonComponent/>}/>
        <Route path="/razorpay" element={<RazorpayButton amount={100}/>}/>
      </Routes>
    </Router>
    </Elements>
  );
};

export default App;
