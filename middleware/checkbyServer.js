/* eslint-disable func-names */
/* eslint-disable no-console */
export default async function ({ $axios, req, redirect }) {
  if (process.server) {
    try {
      if (!req.headers.cookie) return redirect('/login');
      console.log('[CHECK-AUTH] user has cookie');
      const accesstoken = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('access_token='));

      if (!accesstoken) return redirect('/login');
      console.log('[CHECK-AUTH] user has token');

      const token = accesstoken.split('=')[1];
      const { success } = await $axios.$post('/api/checkAuth', token);

      if (!success) return redirect('/login');
      console.log('[CHECK-AUTH] token verified');
    } catch (error) {
      console.log('[CHECK-AUTH] FAILED:', error);
      redirect('/login');
    }
  }
  return undefined;
}
