import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import CollectionOverview
  from '../../components/collection-overview/collection-overview.component';

import {firestore} from '../../firebase/firebase.utils';

import CollectionPage from '../collection/collection.component';


class ShopPage extends React.Component {
  constructor() {
    super();
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const collectionRef = firestore.collection('collecetions');

    collectionRef.onSnapshot()
  }
  render() {
    const {match} = this.props
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionOverview} />;
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
      </div>
    )
  }
}

ShopPage.propTypes = {
  match: PropTypes.object,
};

export default ShopPage;
