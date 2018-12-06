<template>
  <div class="message-block">
    <div class="col s12 m7 frame">
        <div class="card-image image-block">
          <img src="../assets/15.png" class="image">
          <p class="test">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque, saepe!</p>
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
    display: flex;
  }

  .image {
    float: left;
    height: 10rem;
    width: 10rem;
  }

</style>
