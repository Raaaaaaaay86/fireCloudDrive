import Firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.SDK_APIKEY,
  authDomain: process.env.SDK_AUTHDOMAIN,
  databaseURL: process.env.SDK_DATABASEURL,
  projectId: process.env.SDK_PROJECTID,
  storageBucket: process.env.SDK_STORAGEBUCKET,
  messagingSenderId: process.env.SDK_MESSAGINGSENDERID,
  appId: process.env.SDK_APPID,
  measurementId: process.env.SDK_MEASUREMENTID,
};

const firebase = Firebase;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const storage = firebase.storage();
const auth = firebase.auth();

if (process.client) {
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log('UserStatus: LoggedIn');
      auth.app.currentUser = user;
    } else {
      console.log('UserStatus: LoggedOut');
      auth.app.currentUser = null;
    }
  });
}

export {
  storage,
  database,
  auth,
  firebase,
};
