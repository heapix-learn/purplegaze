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
      title: 'Hello! It\'s AppMain'
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  min-height: 80vh;
  background: var(--white);
  display: flex;
  justify-content: center;
}
</style>
