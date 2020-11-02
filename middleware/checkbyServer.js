/* eslint-disable */
export default async function ({ $axios, req, redirect }) {
  if (process.server) {
    try {
      if (!req.headers.cookie) {
        console.log("[ to='/index' ] User don't have Cookie, so redirect to /login");
        return redirect('/login');
      }
      const token = req.headers.cookie
      .split(';')
      .find((c) => c.trim().startsWith('access_token=')).split('=')[1];
      const { success } = await $axios.$post('/api/checkAuth', token);
      if (!success) return redirect('/login');
    } catch (error) {
      console.log(error);
    }
  }
}
