import React from 'react';

import PropTypes from 'prop-types';

import './collection.styles.scss';

import {selectCollection} from '../../redux/shop/shop.selectors';
import {connect} from 'react-redux';

import CollectionItem 
  from '../../components/collection-item/collection-item.component';

const CollectionPage = ({collection}) => (
  <div className='category'>
    <h2>CATEGORY PAGE</h2>
  </div>
);

CollectionPage.propTypes = {
  match: PropTypes.object,
};

export const mapStateToProps = (state, ownProps) =>({
  collection: selectCollection(ownProps.match.params.collectionId),
});

export default connect(mapStateToProps)(CollectionPage);
