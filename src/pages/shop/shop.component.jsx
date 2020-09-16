import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions';

import CollectionContainer from '../collection/collection.container';

import CollectionsOverviewContainer
  from '../../components/collection-overview/collection-overview.component';


const ShopPage = ({fethCollectionStart, match}) => {
  useEffect(() => {
    fethCollectionStart();
  }, [fethCollectionStart]);

  return (
    <div className='shop-page'>
      <Route exact path={`${match.path}`}
        component={CollectionsOverviewContainer} />


      <Route path={`${match.path}/:collectionId`}
        component={CollectionContainer} />
    </div>
  );
};

ShopPage.propTypes = {
  match: PropTypes.object,
  fethCollectionStart: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  fethCollectionStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
