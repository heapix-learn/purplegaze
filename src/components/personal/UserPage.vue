<template>
  <div class="user-page">
    <div class="user-page__user-info">
      <p>First Name: {{ user.firstName }}</p>
      <p>Last Name: {{ user.lastName }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserPage',
  data () {
    return {
      user: []
    }
  },
  created () {
    this.getMessagesById()
  },
  methods: {
    async getMessagesById () {
      const id = this.$route.params.user_id
      await (axios.get('http://localhost:8008/users/' + id))
        .then(response => {
          console.log(response.data)
          this.user = response.data
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
