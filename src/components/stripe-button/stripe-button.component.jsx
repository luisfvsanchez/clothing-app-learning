import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100;
  const publisableKey = 'pk_test_51HOcOZJISbm4mbJEvBkcVcUWKGLvLHB7bSK8DqXGplxDVA6rLb9nHbs8P9RzKc25WirDU6aiWX1k8OEV0BcDYvbV00AxgW25tV';

  const onToken = (token) => {
    console.log(token);
  }
  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is ${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publisableKey} />
  );
};

export default StripeCheckoutButton;
