import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { resolve } from 'path';

const config = {
  apiKey: 'AIzaSyBKC3rAUsAS021OdaWKVQtESlysddGs8jw',
  authDomain: 'crown-clothing-react-72cac.firebaseapp.com',
  databaseURL: 'https://crown-clothing-react-72cac.firebaseio.com',
  projectId: 'crown-clothing-react-72cac',
  storageBucket: 'crown-clothing-react-72cac.appspot.com',
  messagingSenderId: '620459277306',
  appId: '1:620459277306:web:4c5a3ec9535c77d57cc243',
};

firebase.initializeApp(config);


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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => 
{
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const {title, items} = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({promtp: 'select_account'});


export default firebase;
