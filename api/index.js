/* eslint-disable no-console */
const express = require('express');

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line unicorn/escape-case
const RED = '\x1b[31m %s';
const app = express();
const router = express.Router();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

router.post('/login', (req, res) => {
  try {
    console.log(`[User Login] UID: ${req.session.uid || 'first log in'}`);
    const { uid, token } = req.body;
    req.session.uid = uid;
    res.cookie('access_token', token, { maxAge: 3600000, httpOnly: true });
    res.json({ status: 200 });
  } catch (err) {
    console.log(RED, err);
  }
});

router.post('/logout', (req, res) => {
  try {
    console.log('[API] - LOGOUT POST');
    delete req.session.uid;
    res.clearCookie('access_token');
    res.json({ status: 200 });
  } catch (error) {
    console.log(RED, error);
  }
});

module.exports = {
  path: '/api',
  handler: router,
};
