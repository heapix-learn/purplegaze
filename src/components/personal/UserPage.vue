<template>
  <div class="user-page">
    <div class="user-page__user-info" v-if="exist">
      Information by user: {{user.firstName}} {{ user.lastName }}
      <p>First Name: {{ user.firstName }}</p>
      <p>Last Name: {{ user.lastName }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Quantity of posts: {{ quantity}}</p>
    </div>
    <h1 v-if="!exist">
      404 (Not Found)<br>Such user does not exist.
    </h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserPage',
  data () {
    return {
      user: [],
      exist: true
    }
  },
  props: ['id', 'quantity'],
  created () {
    this.getMessagesById()
  },
  methods: {
    async getMessagesById () {
      const id = this.id
      await (axios.get('http://localhost:8008/users/' + id))
        .then(response => {
          this.user = response.data
        })
        .catch(err => {
          this.exist = !this.exist
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
