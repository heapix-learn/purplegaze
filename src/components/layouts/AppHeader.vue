<template>
    <div class="app-header">
      <div class="imageBlock">
        <img src="../../assets/haze.png" class="image"/>
      </div>
      <p v-if="isAuth" class="currentUser">{{title}}</p>
        <a v-if="!isAuth" class="waves-effect waves-light btn button-sign loginButton"
           @click=""
        ><router-link to="/signin" class="app-header-link">{{ $t("buttons.login") }}</router-link></a>
        <a class="waves-effect waves-light btn button-sign regButton"
           @click=""
        ><router-link to="/signup" class="app-header-link">{{ $t("buttons.signUp") }}</router-link></a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      title: ''
    }
  },
  computed: {
    isAuth () {
      this.title = this.$store.getters['user/isAuth']
      return this.$store.getters['user/isAuth']
    }
  }
}
</script>

<style scoped>
  .app-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 10vh;
    background: var(--black);
  }

  .imageBlock {
    position: absolute;
    left: 5rem;
  }

  .image {
    height: 12rem;
    width: 12rem;
  }

  .currentUser {
    background: red;
    width: 10rem;
  }

  .app-header-link {
    display: inherit;
    font-size: 2rem;
  }

  .buttons {
    margin-right: 5rem;
  }

  .regButton {
    background: var(--white);
    margin-left: 2rem;
  }

  .loginButton {
    background: var(--white);
    margin-right: 2rem;
  }
</style>
