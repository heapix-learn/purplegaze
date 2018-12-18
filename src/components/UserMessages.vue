<template>
  <div class="user-messages">
    <UserPage :id = "this.$route.params.id" :quantity="messages.length" @exist="someFunc()"></UserPage>
    <br>
    <div class="card horizontal" v-for="(message, id) in messages" :key="id">
      <Message :message="message" v-if="userExist"></Message>
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
      messages: [],
      userExist: true
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
        .catch(err => {
          console.error(err)
        })
    },
    someFunc () {
      this.userExist = false
    }
  }
}
</script>

<style scoped>

</style>
