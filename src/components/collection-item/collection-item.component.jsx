import React from 'react';
import PropTypes from 'prop-types';


import './collection-item.styles.scss';

const CollectionItem = ({id, name, price, imageUrl}) => (
  <div className='collection-item'>
    <div
      className='image'
      style={{backgroundImage: `url(${imageUrl})`}}>
    </div>

    <div className='collection-footer'>
      <span className='name'>{name}</span>
      <span className='price'>{price}</span>
    </div>
  </div>
);

CollectionItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  imageUrl: PropTypes.string,
};

export default CollectionItem;

