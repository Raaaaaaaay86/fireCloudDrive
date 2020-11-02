<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import { auth } from '@/plugins/firebase';

export default {
  middleware({ redirect }) {
    if (auth.app.currentUser) {
      redirect('/');
    }
  },
};
</script>
