<template>
    <div class="app-header">
      <router-link to="/signup" class="app-header-link">sign up</router-link>
    </div>
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

  .app-header-link {
    font-size: 2rem;
  }
</style>
