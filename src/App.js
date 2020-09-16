import React, {useEffect} from 'react';
import './App.css';

import PropTypes from 'prop-types';
import HomePage from './pages//homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SigninSignupPage from './pages/signin-signup/signin-signup.component';
import Header from './components/header/header.component';
import CheckoutPage from './components/checkout/checkout.component';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';


import {createStructuredSelector} from 'reselect';

const App = ({checkUserSession, currentUser}) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route path='/signin' render={() =>
            currentUser ?
            (<Redirect to='/' />) : (<SigninSignupPage />)}/>
      </Switch>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

App.propTypes = {
  checkUserSession: PropTypes.func,
  currentUser: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
