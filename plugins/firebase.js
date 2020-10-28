import Firebase from 'firebase';

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

if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

const fireDatabase = Firebase.database();

export {
  fireDatabase,
  Firebase,
};
