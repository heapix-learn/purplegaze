<template>
  <div class="message-block">
    <div class="col s12 m7 frame message-block__frame">
      <div class="card-image message-block__frame__header">
        <img src="../assets/15.png" class="message-block__frame__header__image">
        <div class="message-block__frame__header__main-date">
          <div class="message-block__frame__header__main-date__user-date">
            <router-link :to="{name:'UserMessages', params: {user_id: message.user_id, user_name: message.firstName}}">
              <span>{{ message.firstName }} &nbsp;</span>
              <span>{{ message.lastName }}<br></span>
            </router-link>
            <span>posted: {{ message.date}}</span>
          </div>
          <div class="message-block__frame__header__hashtags">
              <span v-for="(hash, index) in message.hashtag" :key="index">

               <router-link :to="{name: 'HashtagMessages', params: {hashtag: hash}}">
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
          <p class="message-block__frame__staked__content__text">
            {{ message.text }}
          </p>
        </div>
      </div>
      <div class="card-action message-block__frame__staked__buttons-action">
        <a class="card-action-icons message-block__frame__staked__buttons-action__icons"><i class="small material-icons">call_missed</i></a>
        <a class="card-action-icons message-block__frame__staked__buttons-action__icons"><i class="small material-icons">thumb_up</i></a>
        <a class="card-action-icons message-block__frame__staked__buttons-action__icons"><i class="small material-icons">thumb_down</i></a>
        <a class="card-action-icons message-block__frame__staked__buttons-action__icons" @click="showComments()"><i class="small material-icons">comment</i></a>
      </div>
      <Comments v-if="isComments" :message_id="message.id"></Comments>
    </div>
  </div>
</template>

<script>
import Comments from '../components/comments/Comments.vue'

export default {
  name: 'Message',
  data () {
    return {
      isComments: false
    }
  },
  components: { Comments },
  props: {
    message: Object
  },
  methods: {
    showComments () {
      if (this.isComments) {
        this.isComments = false
      } else {
        this.isComments = true
      }
    },
    isHash (tag) {
      if (tag.length > 0) {
        return true
      }
    }
  }
}
</script>

<style scoped>
  .message-block__frame {
    width: 50rem;
    height: 100%;
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
</style>
