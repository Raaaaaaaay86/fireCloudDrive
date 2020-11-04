/* eslint-disable unicorn/escape-case */
/* eslint-disable no-console */
const express = require('express');
const admin = require('./connection/firebaseAdmin');

const RED = '\x1b[31m %s';
const GREEN = '\x1b[32m';
const app = express();
const router = express.Router();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  console.log('Express啟動');
  next();
});

app.listen(3000, () => {
  console.log('Express Listening on PORT 3000');
});

router.post('/login', (req, res) => {
  try {
    console.log(`[User Login] UID: ${req.session.uid || 'first log in'}`);
    const { uid, token } = req.body;
    req.session.uid = uid;
    res.cookie('access_token', token, { maxAge: 3600000, httpOnly: true });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
});

router.post('/logout', (req, res) => {
  try {
    console.log('[API] - LOGOUT POST');
    delete req.session.uid;
    res.clearCookie('access_token');
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
});

router.post('/checkAuth', async (req, res) => {
  try {
    const token = req.headers.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token='))
      .split('=')[1];

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (decodedToken) console.log(GREEN, 'PASS');

    return res.json({ success: true });
  } catch {
    console.log(RED, 'response: Auth Failed');
    return res.json({ success: false });
  }
});

module.exports = {
  path: '/api',
  handler: router,
};
