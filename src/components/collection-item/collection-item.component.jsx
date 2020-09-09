import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addItem} from '../../redux/cart/cart.actions';

import {CollectionItemContainer,
  CustomButtonContainer, ImageContainer,
  CollectionItemFooter, PriceContaier, NameContainer}
  from './collection-item.styles';


const CollectionItem = ({item, addItem}) => {
  const {name, price, imageUrl} = item;
  return (
    <CollectionItemContainer>
      <ImageContainer imageUrl={imageUrl}>
      </ImageContainer>

      <CollectionItemFooter>
        <NameContainer>{name}</NameContainer>
        <PriceContaier>{price}</PriceContaier>
      </CollectionItemFooter>

      <CustomButtonContainer 
        onClick={() => addItem(item)} inverted middleButton>
        Add to Cart
      </CustomButtonContainer>
    </CollectionItemContainer>
  );
};

CollectionItem.propTypes = {
  item: PropTypes.object,
  addItem: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);

