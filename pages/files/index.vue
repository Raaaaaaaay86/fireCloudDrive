<template>
  <div>
    <h1>FOLDER NOT EXIST</h1>
  </div>
</template>

<script>
export default {
  middleware({ redirect }) {
    redirect('/');
  },
};
</script>
