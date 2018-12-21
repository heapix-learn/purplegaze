<template>
  <div class="message-block">
    <div class="col s12 m7 frame message-block__frame">
      <div class="card-image message-block__frame__header">

        <img src="../assets/15.png" class="message-block__frame__header__image">
        <div class="message-block__frame__header__main-date">
          <div class="message-block__frame__header__main-date__user-date">
            <router-link :to="`/user/${message.user_id}`">
              <span>{{ message.firstName }} &nbsp;</span>
              <span>{{ message.lastName }}<br></span>
            </router-link>
            <span>{{$t("fields.posted")}}: {{ message.date}}</span>
          </div>
          <div class="message-block__frame__header__hashtags">
              <span v-for="(hash, index) in message.hashtag" :key="index">
               <router-link :to="`/hashtag/${hash}`">
                 <span v-if="isHash(hash)">
                #{{hash}}&nbsp;
                 </span>
               </router-link>
              </span>
          </div>
        </div>
      </div>
      <div class="card-stacked message-block__frame__staked">
        <div class="card-content message-block__frame__staked__content">
          <div class="message-block__frame__staked__content__text">
            {{ message.text }}<br>
            <a :href="`${message.link}`">{{cutLink()}}</a><br>
          <div v-if="message.image">
            <img :src="message.image" alt="" width="100%">
          </div>
          </div>
        </div>
      </div>
      <div class="card-action message-block__frame__staked__buttons-action">
        <a class="card-action-icons message-block__frame__staked__buttons-action__icons"><i
          class="small material-icons">call_missed</i></a>
        <a class="card-action-icons message-block__frame__staked__buttons-action__icons"
           @click="postLike()"
           :style="{ color: isThere ? 'green' : 'lightgrey' }"
        >
          <i class="small material-icons buttons-action-icon"
          >thumb_up</i>{{this.currentLikes.length}}</a>
        <a class="card-action-icons message-block__frame__staked__buttons-action__icons" @click="showComments()"><i
          class="small material-icons">comment</i></a>
      </div>
      <Comments v-if="isComments" :message_id="message.id"></Comments>
    </div>
  </div>
</template>

<script>
import Comments from '../components/comments/Comments.vue'
import axios from 'axios'

export default {
  name: 'Message',
  data () {
    return {
      isComments: false,
      isThere: false,
      likeId: null,
      likes: {
        user_id: Number,
        message_id: Number
      },
      currentLikes: []
    }
  },
  components: { Comments },
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  created () {
    this.cutLink()
  },
  methods: {
    showComments () {
      this.isComments = !this.isComments
    },
    isHash (tag) {
      if (tag.length > 0) {
        return true
      }
    },
    cutLink () {
      if (this.message.link) {
        let isLink = this.message.link
        const size = 23
        const n = 18
        for (let i = 0; i < isLink.length; i++) {
          if (isLink.length > size) {
            isLink.substr(0, n)
            return isLink.substr(0, n) + ' ... '
          } else {
            return isLink
          }
        }
      }
    },
    async getLikes () {
      const userId = localStorage.getItem('userId') // back is sucks
      await axios.get('http://localhost:8008/likes?message_id=' + this.message.id)
        .then(response => {
          this.currentLikes = response.data
        })
      const isLiked = this.currentLikes.filter(item => item.user_id === +userId)
      if (isLiked.length !== 0) {
        this.likeId = isLiked[0].id
        this.isThere = true
      }
    },
    async postLike () {
      if (!this.isThere) {
        this.likes.user_id = this.$store.getters['user/user'].id
        this.likes.message_id = this.message.id
        await axios.post('http://localhost:8008/likes', this.likes)
          .then(response => {
            console.log(response.data)
          })
        this.getLikes()
          .catch(err => {
            console.error(err)
          })
      } else {
        this.removeLike(this.likeId)
      }
    },
    async removeLike (id) {
      await axios.delete('http://localhost:8008/likes/' + id)
      this.getLikes()
      this.isThere = false
    }
  }
}
</script>

<style scoped>
  .message-block__frame {
    width: 50rem;
  }

  .message-block__frame__header {
    display: flex;
    justify-content: center;
    height: 40%;
    max-width: 100% !important;
  }

  .message-block__frame__header__image {
    height: 8rem;
    width: 8rem;
    padding: 0.5rem;
  }

  .message-block__frame__header__main-date {
    margin: 1rem 0 0 5rem;
    width: 100%;
  }

  .message-block__frame__header__main-date__user-date {
    display: flex;
    justify-content: space-around;
  }

  .message-block__frame__header__hashtags {
    display: flex;
    justify-content: flex-start;
    margin-top: 1rem;
    width: 100%;
  }

  .message-block__frame__staked {
    height: 40%;
    padding: 0.5rem 2rem;
  }

  .message-block__frame__staked__content {
    height: 100%;
    padding: 0;
  }

  .message-block__frame__staked__content__text {
    height: 100%;
  }

  .message-block__frame__staked__buttons-action {
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 2rem;
  }

  .message-block__frame__staked__buttons-action__icons {
    margin: 0 !important;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttons-action-icon {
    margin-right: 5px;
  }
</style>
