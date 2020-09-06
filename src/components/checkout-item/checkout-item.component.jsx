import React from 'react';

import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {removeItem, addItem, removeSingleItem}
  from '../../redux/cart/cart.actions';

import './checkout-item.styles.scss';

const CheckoutItem = ({cartItem, removeItem, addItem, removeSingleItem}) => {
  const {name, quantity, price, imageUrl} = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt="item"/>
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow'
          onClick={() => removeSingleItem(cartItem)}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button'
        onClick={() => removeItem(cartItem)}>&#10005;</div>
    </div>
  );
};
CheckoutItem.propTypes = {
  cartItem: PropTypes.object,
  removeItem: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(removeItem(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeSingleItem: (item) => dispatch(removeSingleItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
