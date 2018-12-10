<template>
  <div>
    <div v-for="(comment, index) in comments" :key="index" class="commentList">
      <span class="commentList__author">{{comment.author}}</span> : {{comment.text}}
    </div>
    <div class="create-area">
      <input class="create-area__input"
             type="text"
             v-model="newComment.text"
      >
      <a class="card-action-icons" @click="createComment()"><i class="medium material-icons create-area__btn">send</i></a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Comments',
  props: {
    message_id: Number
  },
  data () {
    return {
      newComment: {
        message_id: Number,
        author: '',
        text: ''
      },
      comments: []
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      await axios.get('http://localhost:8008/comments?message_id=' + this.message_id)
        .then(response => {
          this.comments = response.data
        })
    },
    async createComment () {
      if (this.newComment.text.length > 1) {
        this.newComment.message_id = this.message_id
        this.newComment.author = this.$store.getters['user/user'].firstName + ' ' + this.$store.getters['user/user'].lastName
        await axios.post('http://localhost:8008/comments', this.newComment)
        this.newComment.text = ''
        this.getComments()
      }
    }
  }
}
</script>

<style scoped>
  .create-area {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .create-area__input {
    width: 65% !important;
    padding: 0 1rem !important;
    margin-bottom: 5px;
  }

  .create-area__btn {
    color: orange;
  }

  .commentList {
    padding-left: 3rem;
  }

  .commentList__author {
    font-weight: bold;
  }
</style>
