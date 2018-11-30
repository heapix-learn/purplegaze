<template>
    <div class="main">
      <slot>{{title}}</slot>
      <div v-for="(user, key) in users">
        {{key}} : {{user.firstName}} {{user.lastName}} | {{user.email}} | {{user.password}} | {{user.id}}
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AppMain',
  data () {
    return {
      title: 'Hello! It\'s all users',
      users: []
    }
  },
  created () {
    // return axios.get('http://localhost:8008/users')
    //   .then(response => {
    //     this.users = response.data
    //     console.log(response.data)
    //   })

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
