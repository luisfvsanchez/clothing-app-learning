import React from 'react';
import './App.css';

import HomePage from './pages//homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SigninSignupPage from './pages/signin-signup/signin-signup.component';
import Header from './components/header/header.component';
import CheckoutPage from './components/checkout/checkout.component';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import {setCurrentUser} from './redux/user/user.actions'

import {selectCurrentUser} from './redux/user/user.selectors';

import {createStructuredSelector} from 'reselect';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  unsubscribedFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribedFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      } 
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount () {
    this.unsubscribedFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SigninSignupPage />)}/>
        </Switch>
      </div>
    );
  }
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
