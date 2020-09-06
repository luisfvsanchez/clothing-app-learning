import React from 'react';
import PropTypes from 'prop-types';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

import {connect} from 'react-redux';

import {createStructuredSelector} from 'reselect';

import {selectDirectorySections}
  from '../../redux/directory/directory.selectors';


const Directory = ({sections}) => (
  <div className='directory-menu'>
    {
      sections.map(({id, ...otherSectionProps}) => (
        <MenuItem key={id} {...otherSectionProps}></MenuItem>
      ))
    }
  </div>
);

Directory.propTypes = {
  sections: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);

