<template>
  <div class="messages-block">
    <div class="card horizontal messages-block__card" v-for="(message, id) in messages" :key="id">
      <Message :message="message"></Message>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Message from './Message'

export default {
  name: 'Messages',
  components: { Message },
  data () {
    return {
      messages: []
    }
  },
  created () {
    this.getAllMessages()
  },
  methods: {
    async getAllMessages () {
      await (axios.get('http://localhost:8008/messages'))
        .then(response => {
          this.messages = response.data
        })
    }
  }
}
</script>

<style scoped>
  .messages-block__card {
    height: 20rem;
  }
</style>
