import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './sign-in.styles.scss';
import '../form-input/form-input.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {connect} from 'react-redux';
import {googleSignInStart, emailSignInStart}
  from '../../redux/user/user.actions';


const SignIn = ({emailSignInStart, googleSignInStart}) => {
  const [userCredentials, setCredentials] =
  useState({email: '', password: ''});

  const {email, password} = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    emailSignInStart(email, password);
  };

  const handleChange = (event) => {
    const {value, name} = event.target;

    setCredentials({...userCredentials, [name]: value});
  };

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput handleChange={handleChange}
          label='Email' name='email' required
          value={email} type="email" />
        <FormInput handleChange={handleChange}
          label='Password' name='password' required
          value={password} type="password" />
        <div className='buttons'>
          <CustomButton type="submit">SIGN IN</CustomButton>
          <CustomButton type='button' onClick={googleSignInStart}
            isGoogleSignIn='true'>
            SIGN IN WITH GOOGLE
          </CustomButton>
        </div>

      </form>
    </div>
  );
};

SignIn.propTypes = {
  googleSignInStart: PropTypes.func,
  emailSignInStart: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({email, password})),
});

export default connect(null, mapDispatchToProps)(SignIn);

