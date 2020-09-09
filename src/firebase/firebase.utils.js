import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBKC3rAUsAS021OdaWKVQtESlysddGs8jw',
  authDomain: 'crown-clothing-react-72cac.firebaseapp.com',
  databaseURL: 'https://crown-clothing-react-72cac.firebaseio.com',
  projectId: 'crown-clothing-react-72cac',
  storageBucket: 'crown-clothing-react-72cac.appspot.com',
  messagingSenderId: '620459277306',
  appId: '1:620459277306:web:4c5a3ec9535c77d57cc243',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  };

  return userRef;
};

export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promtp: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
