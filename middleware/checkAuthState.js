import jwtDecode from 'jwt-decode';

const getUIDFromSession = (req) => {
  console.log('[CHECK-AUTH] - checking if user is stored in session');
  return req.session ? req.session.userId : null;
};

const getUserFromCookie = (req) => {
  console.log('[CHECK-AUTH] - checking if user is stored in cookie');
  if (!req.headers.cookie) return;

  const accessTokenCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('access_token='));
  if (!accessTokenCookie) return;

  const accessToken = accessTokenCookie.split('=')[1];
  const decodedToken = jwtDecode(accessToken);
  if (!decodedToken) return;
  const now = Math.floor(new Date().getTime() / 1000);

  if (now > new Date(decodedToken.exp)) {
    console.log('[CHECK-AUTH] - token expired');
    return;
  }

  // eslint-disable-next-line consistent-return
  return decodedToken.sub;
};

export default function ({ store, req, redirect }) {
  if (process.server) {
    let uid = getUIDFromSession(req);
    if (!uid) {
      uid = getUserFromCookie(req);
    }
    if (uid) {
      store.dispatch('auth/setUID', uid);
      return;
    }
    redirect('/login');
  }
}
