<template>
  <div class="message-block">
    <div class="col s12 m7">
        <div class="card-image">
          <img src="../assets/1.png" class="image">
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
  .image {
    height: 10rem;
    width: 10rem;
  }
</style>
