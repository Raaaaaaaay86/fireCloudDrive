export default async function ({ $axios, req, redirect }) {
  if (process.server) {
    try {
      if (!req.headers.cookie) return redirect('/login');

      const accesstoken = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('access_token='));

      if (!accesstoken) return redirect('/login');

      const token = accesstoken.split('=')[1];
      const { success } = await $axios.$post('/api/checkAuth', token);

      if (!success) return redirect('/login');
    } catch (error) {
      redirect('/login');
    }
  }
  return undefined;
}
