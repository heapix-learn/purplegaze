<template>
    <div class="main">
      <a class="waves-effect waves-light btn toNewMessage"
         @click="toNewMessage"
         v-if="!isNewMessage"
      ><i class="material-icons left">create</i>{{$t("buttons.newMessagePage")}}</a>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'AppMain',
  data () {
    return {
      title: 'Hello! It\'s AppMain'
    }
  },
  methods: {
    toNewMessage () {
      this.$router.push('/new-message')
    }
  },
  computed: {
    isNewMessage () {
      return this.$route.path.includes('new-message') || !this.$store.getters['user/isAuth']
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  min-height: 80vh;
  background: var(--white);
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
}

  .toNewMessage {
    position: fixed;
    top: 10%;
    left: 5%;
  }
</style>
