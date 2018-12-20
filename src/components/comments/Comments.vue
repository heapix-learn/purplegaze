<template>
  <div class="comments">
    <div v-for="(comment, index) in comments" :key="index" class="comments__comment-list">
      <span class="comments__comment-list__author">{{comment.author}}</span> : {{comment.text}}
    </div>
    <div class="comments__create-area">
      <input class="comments__create-area__input"
             type="text"
             v-model="newComment.text"
      >
      <a class="card-action-icons comments__create-area__sent" @click="createComment()"><i class="small material-icons create-area__btn">send</i></a>
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
          console.log(this.comments)
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
  .comments__create-area {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .comments__create-area__input {
    width: 65% !important;
    padding: 0 1rem !important;
    margin-bottom: 5px;
  }

  .create-area__btn {
    color: orange;
  }

  .comments__comment-list {
    padding-left: 3rem;
  }

  .comments__comment-list__author {
    font-weight: bold;
  }

  .comments__create-area__sent{
    cursor: pointer;
  }
</style>
