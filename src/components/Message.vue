<template>
  <div class="message-block">
    <div class="col s12 m7 frame">
      <div class="card-image upper-block">
        <img src="../assets/15.png" class="image">
        <div class="upper-block-maindate">
          <router-link :to="{name:'UserMessages', params: {user_id: message.user_id, user_name: message.firstName}}">
            <span>{{ message.firstName }} &nbsp;</span>
            <span>{{ message.lastName }}<br></span>
          </router-link>
          <span>{{ message.date}}</span>
          <div class="upper-block-hashtags">
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
      <div class="card-stacked">
        <div class="card-content">
          <p>
            {{ message.text }}
          </p>
        </div>
        <div class="card-action">
          <a class="card-action-icons"><i class="medium material-icons">call_missed</i></a>
          <a class="card-action-icons"><i class="medium material-icons">favorite</i></a>
          <a class="card-action-icons"><i class="medium material-icons">exposure_neg_1</i></a>
          <a class="card-action-icons comment" @click="showComments()"><i class="medium material-icons">comment</i></a>
        </div>
        <Comments v-if="isComments" :message_id="message.id"></Comments>

      </div>
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
  .frame {
    width: 50rem;
  }

  .upper-block {
    display: flex;
  }

  .image {
    height: 10rem;
    width: 10rem;
  }

  .upper-block-maindate {
    margin: 2rem 0 0 5rem;
    width: 100%;
  }

  .upper-block-hashtags {
    display: flex;
    margin: 2rem 0 0 0;
    justify-content: flex-start;
    width: 100%;
  }

  .card-action {
    display: flex;
    justify-content: space-between;
    padding: 1rem 5rem;
  }

  .card-action-icons {
    margin: 0 !important;
  }

  .comment {
    cursor: pointer;
  }

</style>
