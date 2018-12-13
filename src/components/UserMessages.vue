<template>
  <div class="user-messages">
    Information by user {{$route.params.user_name}}
    <UserPage :id = "this.$route.params.user_id"></UserPage>
    Messages by user {{$route.params.user_name}}:
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
  computed: {
    // userInfo () {
    //   if (this.$store.getters['user/user'] === null) {
    //     return ''
    //   } else {
    //     return this.$store.getters['user/user']
    //   }
    // }
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
