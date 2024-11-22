import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RazorpayButton = ({ amount }) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      alert("Failed to load Razorpay script. Check your internet connection.");
      return;
    }

    // Create an order using your backend API
    const response = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }), // Amount in rupees
    });

    const order = await response.json();
    if (!order || !order.id) {
      alert("Failed to create Razorpay order.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: "COMAPANY NAME",
      description: "Test Transaction",
      order_id: order.id,
      handler: function (response) {
        alert("Payment successful!");
        console.log("Payment details:", response);
      },
      prefill: {
        name: "John Doe", // Prefill customer details
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <StyledWrapper>
    <div className="center">
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: "#3399cc",
        color: "#fff",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Pay ₹{amount}
    </button>
    <Link to='/'><button className="b2">Back</button></Link>
    </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`

.center{
width: 100vw;
heigth: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

.b2{
margin: 5px;
}

`;

export default RazorpayButton;
