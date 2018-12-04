<template>
    <div class="main">
      <slot>{{title}}</slot>
    </div>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
      title: 'Hello! It\'s all users',
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
