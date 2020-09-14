import React from 'react';

import './sign-in.styles.scss';
import '../form-input/form-input.component';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {connect} from 'react-redux';
import {googleSignInStart} from '../../redux/user/user.actions';

import {auth} from '../../firebase/firebase.utils';

class SignIn extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const {email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);

      this.setState({email: '', password: ''});
    } catch (error) {
      console.log(error);
    }

    this.setState({email: '', password: ''});
  }

  handleChange = (event) => {
    const {value, name} = event.target;

    this.setState({[name]: value});
  }

  render() {
    const {googleSignInStart} = this.props;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput handleChange={this.handleChange}
            label='Email' name='email' required
            value={this.state.email} type="email" />
          <FormInput handleChange={this.handleChange}
            label='Password' name='password' required
            value={this.state.password} type="password" />
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
  }
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
});

export default connect(null, mapDispatchToProps)(SignIn);

