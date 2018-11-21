<template>
    <div class="app-header"></div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      title: 'Hello! I\'m header!',
    };
  },
};
</script>

<style scoped>
  .app-header {
    width: 100%;
    height: 10vh;
    background: var(--black);
}
</style>
