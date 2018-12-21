<template>
  <div class="messages-block">
    <button @click="nextPage()">++</button>{{page}}
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
      page: 1
    }
  },
  created () {
    this.getAllMessages()
  },
  methods: {
    nextPage () {
      this.page++
      this.getAllMessages()
    },
    async getAllMessages () {
      await (axios.get('http://localhost:8008/messages?_page=' + this.page + '&_limit=3'))
        .then(response => {
          this.messages = response.data
        })
    }
  }
}
</script>

<style scoped>
  .messages-block {
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
  }

  .messages-block__pagination-block {
    position: absolute;
    top: 11rem;
  }

  .messages-block__pagination-block__button {
    margin: 0 0.5rem;
  }
</style>
