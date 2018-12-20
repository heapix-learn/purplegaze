<template>
  <div class="messages-block">
    <div class="clearfix btn-group col-md-2 offset-md-5 messages-block__pagination-block">
      <button type="button" class="btn btn-sm btn-outline-secondary messages-block__pagination-block__button" v-if="page != 1" @click="page--"><i class="material-icons">
        arrow_back_ios
      </i></button>
      <button type="button" class="btn btn-sm btn-outline-secondary messages-block__pagination-block__button" v-for="(pageNumber, index) in pages.slice(page-1, page+5)" :key="index" @click="page = pageNumber"> {{pageNumber}} </button>
      <button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary messages-block__pagination-block__button"><i class="material-icons">
        arrow_forward_ios
      </i></button>
    </div>
    <div class="card horizontal messages-block__card" v-for="(message, id) in displayedMessages" :key="id">
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
      pages: [],
      page: 1,
      perPage: 3
    }
  },
  created () {
    this.getAllMessages()
  },
  computed: {
    displayedMessages () {
      return this.paginate(this.messages)
    }
  },
  methods: {
    async getAllMessages () {
      await (axios.get('http://localhost:8008/messages'))
        .then(response => {
          this.messages = response.data
        })
    },
    setPages () {
      let numberOfPages = Math.ceil(this.messages.length / this.perPage)
      for (let i = 1; i <= numberOfPages; i++) {
        this.pages.push(i)
      }
    },
    paginate (messages) {
      let page = this.page
      let perPage = this.perPage
      let from = (page * perPage) - perPage
      let to = (page * perPage)
      return messages.slice(from, to)
    }
  },
  watch: {
    messages () {
      this.setPages()
    }
  }
}
</script>

<style scoped>
  .messages-block {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .messages-block__pagination-block {
    position: absolute;
    top: 11rem;
  }

  .messages-block__pagination-block__button {
    margin: 0 0.5rem;
  }
</style>
