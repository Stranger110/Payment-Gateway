import { useEffect } from 'react';
import styled from "styled-components";

const GooglePayButtonComponent = () => {
   // Define paymentsClient outside useEffect so it is accessible throughout the component
   let paymentsClient;

   useEffect(() => {
       // Initialize Google Pay client
       paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });

       // Create and add the Google Pay button to the DOM
       const button = paymentsClient.createButton({
           onClick: onGooglePayButtonClicked,
           buttonColor: 'default',
           buttonType: 'buy',
       });
       document.getElementById('google-pay-button').appendChild(button);
   }, []);

   // Click handler for the Google Pay button
   const onGooglePayButtonClicked = () => {
       // Ensure paymentsClient is defined before proceeding
       if (!paymentsClient) {
           console.error('Google Pay client is not initialized.');
           return;
       }

       // Define your payment data request
       const paymentDataRequest = {
           apiVersion: 2,
           apiVersionMinor: 0,
           allowedPaymentMethods: [{
               type: 'CARD',
               parameters: {
                   allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                   allowedCardNetworks: ['MASTERCARD', 'VISA'],
               },
               tokenizationSpecification: {
                   type: 'PAYMENT_GATEWAY',
                   parameters: {
                    gateway: 'stripe',
                    'stripe:version': '2022-11-15', // Ensure you're using the latest API version
                    'stripe:publishableKey': 'pk_test_51P1hjFSD2EbHnEEtdjt9ayUAZgnWKpRhmR1mTyM5dn6FoJ3LcZ1Z4PIm9ZJnN9wQDwPuv5R9OLm2dsvxJK6ZKUYf00gsonLQpf' // Replace with your publishable key
                   },
               },
           }],
           merchantInfo: {
               merchantId: '01234567890123456789', // Replace with your merchant ID
               merchantName: 'Example Merchant',
           },
           transactionInfo: {
               totalPriceStatus: 'FINAL',
               totalPriceLabel: 'Total',
               totalPrice: '1.00', // Example amount
               currencyCode: 'USD',
               countryCode: 'US',
           },
       };

       // Load the payment data request and handle payment
       paymentsClient.loadPaymentData(paymentDataRequest)
           .then(paymentData => {
               // Process payment data here
               console.log('Payment data:', paymentData);
           })
           .catch(err => {
               console.error('Error loading payment data:', err);
           });
   };


return <StyledWrapper><div className='center' id="google-pay-button"></div></StyledWrapper>;
};


const StyledWrapper = styled.div`

.center{
width: 100vw;
heigth: 100vh;
display: flex;
align-items: center;
justify-content: center;
}

`;

export default GooglePayButtonComponent;