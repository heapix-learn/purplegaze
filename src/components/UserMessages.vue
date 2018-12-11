<template>
  <div class="user-messages">
    Messages by user {{$route.params.user_name}}:
    <div class="card horizontal" v-for="(message, id) in messages" :key="id">
      <Message :message="message"></Message>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Message from './Message'

export default {
  name: 'UserMessages',
  components: { Message },
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
      const id = this.$route.params.user_id
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
