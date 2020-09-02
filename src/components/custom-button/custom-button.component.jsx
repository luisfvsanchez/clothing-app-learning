import React from 'react';
import PropTypes from 'prop-types';

import './custom-button.styles.scss';

const CustomButton = ({children, isGoogleSignIn, ...otherProps}) => (
  <button
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
    {...otherProps}>
    {children}
  </button>
);

CustomButton.propTypes = {
  children: PropTypes.any,
  isGoogleSignIn: PropTypes.string,
};
export default CustomButton;
