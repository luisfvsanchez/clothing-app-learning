import React from 'react';

import PropTypes from 'prop-types';

import './collection.styles.scss';

import {selectCollection} from '../../redux/shop/shop.selectors';
import {connect} from 'react-redux';

import CollectionItem
  from '../../components/collection-item/collection-item.component';

const CollectionPage = ({collection}) => {
  const {title, items} = collection;
  return (
    <div className='collection-page'>
      <h2 className='title'>{title}</h2>
      <div className='items'>
        {
          items.map((item) => <CollectionItem key={item.id} item={item} />)
        }
      </div>
    </div>
  );
};

CollectionPage.propTypes = {
  collection: PropTypes.object,
};

export const mapStateToProps = (state, ownProps) =>({
  collection: selectCollection(ownProps.match.params.collectionId)(state),
});

export default connect(mapStateToProps)(CollectionPage);
