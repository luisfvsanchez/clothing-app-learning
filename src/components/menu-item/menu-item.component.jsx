import React from 'react';

import PropTypes from 'prop-types';

import './menu-item.styles.scss';
import {withRouter} from 'react-router-dom';


const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => (
  <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div className='background-image' style={{
      backgroundImage: `url(${imageUrl})`,
    }}></div>
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

MenuItem.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  size: PropTypes.string,
  linkUrl: PropTypes.string,
  history: PropTypes.array,
  match: PropTypes.object,
};

export default withRouter(MenuItem);

