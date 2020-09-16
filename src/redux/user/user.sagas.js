import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {auth, googleProvider, createUserProfileDocument, getCurrentUser}
  from '../../firebase/firebase.utils';

import {signInFailure, signInSuccess, signOutFailure, 
  signOutSuccess, signUpFailure, signUpSuccess}
  from './user.actions';

export function* onGoogleSignInStart() {
  yield takeLatest(
      UserActionTypes.GOOGLE_SIGN_IN_START, handleSignInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, handleSignInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, handleSignOut);
};

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, handleSignUp);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, handleUserAuth);
};

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, handleAfterSignUp);
}

export function* handleSignInSnapshot(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument,
        userAuth, additionalData);
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
    yield handleSignInSnapshot(user, null);
  } catch (error) {
    put(signInFailure(error));
  }
}

export function* handleSignInWithGoogle() {
  try {
    const {user} = yield auth.signInWithPopup(googleProvider);
    yield handleSignInSnapshot(user, null);
  } catch (error) {
    yield put(signInFailure(error));
  }
};

export function* handleUserAuth() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield handleSignInSnapshot(userAuth, null);
  } catch (error) {
    yield put(signInFailure(error));
  }
};

export function* handleSignUp({payload: {email, password, displayName}}) {
  try {
    const {user} = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({user, additionalData: {displayName}}));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* handleAfterSignUp({payload: {user, additionalData}}) {
  yield handleSignInSnapshot(user, additionalData);
}
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
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
};

