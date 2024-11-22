# Payment Gateway

## Description

This project is a Payment Gateway built with a modern tech stack, including Node.js for the backend and Vite for the frontend. It provides a seamless and user-friendly interface to handle multiple payment methods, including Stripe, Google Pay, PayPal, and Razorpay, ensuring flexibility for both users and businesses.

## Key Features
### Stripe Integration:

- Card payment functionality integrated into the form.
- Support for entering card details like full name, email, card number, expiration date, CVC, and ZIP code.
- Successfully tested with dummy card data provided by Stripe.
### Google Pay Integration (via Stripe):

- Fully integrated using Stripe's payment gateway.
- Configured with test mode for development and debugging.
- Tested to ensure compatibility and a smooth payment process.
### PayPal Integration:

- Configured using PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET.
- Tested with two sandbox accounts:
* Business Account: For receiving payments.
* Personal Account: For initiating transactions.
### Razorpay Integration:

- Configured using RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.
- Successfully tested for smooth transaction handling.

## Technologies Used
### Frontend
- Vite: Lightning-fast development environment.
- React.js: For building the UI components and managing state.
### Backend
- Node.js: Server-side JavaScript runtime.
- Express.js: Backend framework for handling routes and APIs.
## Setup and Configuration
### Prerequisites
Ensure you have the following installed:

- Node.js (v20.12.0 or higher)
- npm (v10.8.1 or higher)
## Installation
Clone the repository:
- Copy code git clone https://github.com/Stranger110/Payment-Gateway.git
- Navigate to the project directory: cd payment-gateway-project
### Install dependencies:
- bash npm install
- npm install react
- npm install razorpay
- npm install @google-pay/button-react
- npm install @paypal/checkout-server-sdk
- npm install nodemon
- Create a .env file in the root directory and add the following variables:

STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

STRIPE_SECRET_KEY=your-stripe-secret-key

PAYPAL_CLIENT_ID=your-paypal-client-id

PAYPAL_CLIENT_SECRET=your-paypal-client-secret

RAZORPAY_KEY_ID=your-razorpay-key-id

RAZORPAY_KEY_SECRET=your-razorpay-key-secret

## Running the Project
### Start the backend server:
- nodemon app
### Start the frontend development server:
- npm run start or dev
- Open your browser and navigate to:
 http://localhost:5173
## Testing Payments
- Use Stripe’s dummy cards for testing card payments (e.g., 4242 4242 4242 4242).
- Use Google Pay in test mode (ensure the configuration ID is active in your Stripe dashboard)
- Use PayPal sandbox accounts for testing:
- A Personal Account for transactions.
- A Business Account for receiving payments.
- Use Razorpay's test mode credentials for testing transactions.

## 🧪Walkthrough
https://www.linkedin.com/posts/siddharth-prajapati-330020252_payment-gateway-walkthrough-testing-all-activity-7265654766964260864-iBa5?utm_source=share&utm_medium=member_desktop

## Screenshots
![Screenshot 2024-11-20 180553](https://github.com/user-attachments/assets/b3672c90-64e8-4981-9575-76a1641e4925)

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is licensed under the MIT License.
