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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promtp: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
