<template>
  <div class="message-block">
    <div class="col s12 m7 frame">
        <div class="card-image image-block">
          <img src="../assets/15.png" class="image">
          <span v-for="(hash, index) in message.hashtag" :key="index">#{{hash}}&nbsp;</span>
        </div>
        <div class="card-stacked" >
          <div class="card-content">
            <p>
              {{ message.text }}
            </p>
          </div>
          <div class="card-action">
            <a href="#">This is a link</a>
            <a href="#">This is a link</a>
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
  }
}
</script>

<style scoped>
  .frame {
    width: 50rem;
  }

  .image-block {
    display: inline-block;
  }

  .image {
    height: 10rem;
    width: 10rem;
  }

</style>
