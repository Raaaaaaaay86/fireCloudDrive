export default async function ({ $axios, req, redirect }) {
  if (process.server) {
    try {
      if (!req.headers.cookie) return redirect('/login');
      console.log('有cookie');
      const accesstoken = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('access_token='));

      if (!accesstoken) return redirect('/login');
      console.log('有token');

      const token = accesstoken.split('=')[1];
      const { success } = await $axios.$post('/api/checkAuth', token);

      if (!success) return redirect('/login');
      console.log('tokenu驗證成功');
    } catch (error) {
      console.log('驗證失敗:', error);
      redirect('/login');
    }
  }
  return undefined;
}
