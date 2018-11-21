<template>
    <div class="footer"></div>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      title: 'Hello! I\'m footer!',
    };
  },
};
</script>

<style scoped>
.footer {
  width: 100%;
  height: 10vh;
  background: var(--purple);
}
</style>
