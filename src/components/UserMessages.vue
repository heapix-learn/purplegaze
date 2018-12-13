<template>
  <div class="user-messages">
    <UserPage :id = "this.$route.params.id"></UserPage>
    <br>
    <div class="card horizontal" v-for="(message, id) in messages" :key="id">
      <Message :message="message"></Message>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Message from './Message'
import UserPage from './personal/UserPage'

export default {
  name: 'UserMessages',
  components: { UserPage, Message },
  data () {
    return {
      messages: []
    }
  },
  created () {
    this.getMessagesByUser()
  },
  methods: {
    async getMessagesByUser () {
      const id = this.$route.params.id
      await (axios.get('http://localhost:8008/messages?user_id=' + id))
        .then(response => {
          this.messages = response.data
        })
    }
  }
}
</script>

<style scoped>

</style>
