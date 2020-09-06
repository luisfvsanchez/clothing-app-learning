import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import CollectionOverview
  from '../../components/collection-overview/collection-overview.component';

import CollectionPage from '../collection/collection.component';


const ShopPage = ({match}) => (
  <div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionOverview} />;
    <Route path={`${match.path}/:categoryId`} component={CollectionPage} />
  </div>
);
ShopPage.propTypes = {
  collections: PropTypes.array,
  match: PropTypes.object,
};

export default ShopPage;
