import React from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect'
import './collection-overview.styles.scss';
import {selectShopCollections} from '../../redux/shop/shop.selectors';

import PreviewCollection
  from '../preview-collection/preview-collection.component';

const CollectionOverview = ({collections}) => (
  <div className='collections-overview'>
    {
      collections.map(({id, ...otherCollectionProps}) => (
        <PreviewCollection key={id} {...otherCollectionProps} />
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectShopCollections,
});

CollectionOverview.propTypes = {
  collections: PropTypes.array,
};

export default connect(mapStateToProps)(CollectionOverview);
