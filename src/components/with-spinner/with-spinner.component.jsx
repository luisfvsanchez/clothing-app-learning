import React from 'react';
import PropTypes from 'prop-types';

import {SpinnerContainer, SpinnerOverlay} from './with-spinner.styles';

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({isLoading, ...otherProps}) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };

  Spinner.propTypes = {
    isLoading: PropTypes.bool,
  };

  return Spinner;
};

export default WithSpinner;
