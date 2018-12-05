<template>
  <div class="messages-block">
    <div class="card horizontal" v-for="(message, index) in messages" :key="index">
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
    return axios.get('http://localhost:8008/messages')
      .then(response => {
        this.messages = response.data
      })
  }
}
</script>

<style scoped>

</style>
