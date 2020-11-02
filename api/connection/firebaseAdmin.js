const admin = require('firebase-admin');
const serviceAccount = require('../../../CloudKey.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://clouddrive-3cbb9.firebaseio.com',
  });
}

module.exports = admin;
