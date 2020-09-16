import React, {useState} from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {connect} from 'react-redux';

import {signUpStart} from '../../redux/user/user.actions';

const SignUp = ({signUpStart}) => {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const {displayName, email, password, confirmPassword} = userInfo;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords dont match!');
      return;
    }
    signUpStart({email, password, displayName});
  };

  const handleChange = (event) => {
    const {name, value} = event.target;

    setUserInfo({...userInfo, [name]: value});
  };

  return (
    <div className='signu-up'>
      <h2 className='title'>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          onChange={handleChange}
          label='Display Name'
          required/>

        <FormInput
          type='email'
          name='email'
          value={email}
          onChange={handleChange}
          label='Email'
          required/>

        <FormInput
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
          label='Passowrd'
          required/>

        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={handleChange}
          label='Confirm Password'
          required/>

        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </div>
  );
};
export const mapDispatchToProps = (dispatch) => ({
  signUpStart: (userCredentials) => 
    dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);

