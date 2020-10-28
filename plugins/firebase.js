import Firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

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

export { storage, database };
