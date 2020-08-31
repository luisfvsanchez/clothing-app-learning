import React from 'react';
import PropTypes from 'prop-types';
import CollectionItem from '../collection-item/collection-item.component';

import './preview-collection.styles.scss';

const PreviewCollection = ({title, items}) => (
  <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {
        items
            .filter((item, idx) => idx < 4)
            .map(({id, ...otherCollectionProps}) => (
              <CollectionItem key={id} {...otherCollectionProps}/>
            ))
      }
    </div>
  </div>
);


PreviewCollection.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
};


export default PreviewCollection;
