import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {auth, googleProvider, createUserProfileDocument, getCurrentUser}
  from '../../firebase/firebase.utils';

import
{signInFailure, signInSuccess, signOutFailure, signOutSuccess}
  from './user.actions';

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, handleSignInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, handleSignInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, handleSignOut);
};

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, handleUserAuth);
};

export function* handleSignInSnapshot(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess(
        {id: userSnapshot.id, ...userSnapshot.data()},
    ));
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* handleSignInWithEmail({payload: {email, password}}) {
  try {
    const {user} = yield auth.signInWithEmailAndPassword(email, password);
    yield handleSignInSnapshot(user);
  } catch (error) {
    put(signInFailure(error));
  }
}

export function* handleSignInWithGoogle() {
  try {
    const {user} = yield auth.signInWithPopup(googleProvider);
    yield handleSignInSnapshot(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
};

export function* handleUserAuth() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield handleSignInSnapshot(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
};

export function* handleSignOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
};

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
  ]);
};
