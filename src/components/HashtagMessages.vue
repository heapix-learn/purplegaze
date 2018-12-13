<template>
  <div class="hashtag-messages">
    MessagesByHashtag:
    #{{this.$route.params.hashtag}}
    <div class="card horizontal" v-for="(message, id) in messages" :key="id">
      <Message :message="message"></Message>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Message from './Message'

export default {
  name: 'HashtagMessages',
  components: { Message },
  props: ['hash'],
  data () {
    return {
      messages: []
    }
  },
  created () {
    this.getMessagesByHashtag()
  },
  methods: {
    async getMessagesByHashtag () {
      const hashtag = this.$route.params.hash
      await (axios.get('http://localhost:8008/messages?hashtag_like=' + hashtag))
        .then(response => {
          this.messages = response.data
        })
    }
  }
}
</script>

<style scoped>

</style>
