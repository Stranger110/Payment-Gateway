import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form"
import PayPalButton from "./PayPalButton"; // The component where PayPalButton is rendered


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Form/>} />
        <Route path="/paypal" element={<PayPalButton/>} />
      </Routes>
    </Router>
  );
};

export default App;
