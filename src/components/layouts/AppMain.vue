<template>
    <div class="main">
      <slot>{{title}}</slot>
      <div v-for="(user, key) in users" :key="key">
        {{key}} : {{user.firstName}} {{user.lastName}} | {{user.email}} | {{user.password}} | {{user.id}}
      </div>
    </div>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
      title: 'Hello! It\'s all users',
      users: []
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
