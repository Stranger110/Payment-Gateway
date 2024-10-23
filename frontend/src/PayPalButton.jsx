import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toastify

const PayPalButton = () => {
  const [loading, setLoading] = useState(false); // Create a loading state

  const handlePaymentSuccess = () => {
    toast.success("Payment Successful!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <PayPalScriptProvider options={{ "client-id": "YOUR_SANDBOX_CLIENT_ID" }}>
      <div className="center" style={{display:"flex" , justifyContent:"center", alignItems:"center", width:"100vw", height:"100vh"}}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={async (data, actions) => {
            try {
              setLoading(true);
              const res = await fetch("http://localhost:5000/paypal/create-order", {
                method: "POST",
              });
              const order = await res.json();
              return order.id;
            } catch (error) {
              console.error("Error creating PayPal order:", error);
              return actions.reject();
            } finally {
              setLoading(false);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const captureRes = await fetch("http://localhost:5000/paypal/capture-order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  orderID: data.orderID,
                }),
              });

              const captureData = await captureRes.json();
              console.log("Order successfully captured:", captureData);

              // Show success toast notification
              handlePaymentSuccess(); // <-- Toast notification here
            } catch (error) {
              console.error("Error capturing PayPal order:", error);
            }
          }}
          onError={(err) => {
            console.error("Error during transaction:", err);
          }}
        />
        <ToastContainer /> {/* Required to display toast notifications */}
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
