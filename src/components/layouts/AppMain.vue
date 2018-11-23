<template>
    <div class="main">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
      title: 'Hello! I\'m main!'
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  min-height: 80vh;
  background: var(--white);
}
</style>
