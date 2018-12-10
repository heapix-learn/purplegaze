<template>
  <div class="message-block">
    <div class="col s12 m7 frame">
      <div class="card-image upper-block">
        <img src="../assets/15.png" class="image">
        <div class="upper-block-maindate">
          <span>{{ message.firstName }} &nbsp;</span>
          <span>{{ message.lastName }}<br></span>
          <span>{{ message.date}}</span>
          <div class="upper-block-hashtags">
              <span v-for="(hash, index) in message.hashtag" :key="index">
               <span v-if="isHash(hash)">
                #{{hash}}&nbsp;
                 </span>
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
          <a href="#" class="card-action-icons"><i class="medium material-icons">call_missed</i></a>
          <a href="#" class="card-action-icons"><i class="medium material-icons">favorite</i></a>
          <a href="#" class="card-action-icons"><i class="medium material-icons">exposure_neg_1</i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Message',
  props: {
    message: Object
  },
  methods: {
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
    margin: 0;
  }

</style>
