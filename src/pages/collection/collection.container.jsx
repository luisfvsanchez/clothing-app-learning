import {connect} from 'react-redux';
import {compose} from 'redux';

import withSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionPage from './collection.component';
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';


const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionsLoaded(state),
});

const CollectionContainer = compose(
    connect(mapStateToProps),
    withSpinner,
)(CollectionPage);

export default CollectionContainer;
