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
      messages: [],
      page: 1,
      perPage: 4
    }
  },
  mounted () {
    this.getAllMessages()
    this.scroll(this.messages)
  },
  methods: {
    scroll () {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.page++
          this.getAllMessages()
        }
      }
    },
    async getAllMessages () {
      let newMessages = this.messages
      await (axios.get('http://localhost:8008/messages?_page=' + this.page + '&_limit=' + this.perPage))
        .then(response => {
          for (let i = 0; i < response.data.length; i++) {
            newMessages.push(response.data[i])
          }
        })
      this.messages = newMessages
    }
  }
}
</script>

<style scoped>

</style>
