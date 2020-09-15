import {all, call, takeLatest, put} from 'redux-saga/effects';
import {clearCart} from './cart.actions';
import UserActionTypes from '../user/user.types';

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, handleClearOnSignOut);
}

export function* handleClearOnSignOut() {
  yield put(clearCart());
}
export function* cartSagas() {
  yield(all([
    call(onSignOutSuccess),
  ]));
};
