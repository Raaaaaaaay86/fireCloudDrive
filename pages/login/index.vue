<template>
  <div class="h-screen flex justify-center items-center">
    <div class="h-64 px-8 w-64 flex flex-col justify-center items-center bg-blue-300 rounded shadow">
      <label for="email" class="self-start">
        Email
      </label>
      <input v-model="email" name="email" type="email" class="mb-4 w-full rounded">
      <label for="password" class="self-start">
        Password
      </label>
      <input v-model="password" name="password" type="password" class="mb-8 w-full rounded">
      <div
        class="py-2 px-4 bg-blue-400 rounded shadow cursor-pointer hover:bg-blue-500"
        @click.prevent="logIn"
      >
        Log In
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async logIn() {
      const vm = this;
      const { email, password } = vm;
      return this.$store.dispatch('auth/logIn', { email, password })
        .then(() => this.$router.push('/'))
        .catch((err) => alert(err));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
