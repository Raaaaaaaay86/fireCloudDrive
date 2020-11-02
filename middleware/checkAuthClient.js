import { auth } from '@/plugins/firebase';

export default function ({ redirect }) {
  if (process.client) {
    if (!auth.currentUser) {
      redirect('/login');
    }
  }
}
