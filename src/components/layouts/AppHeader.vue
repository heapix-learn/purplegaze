<template>
    <div class="app-header">
      <div class="imageBlock">
        <img src="../../assets/haze.png" class="image" @click="home"/>
      </div>
      <div v-if="isAuth">
        <p class="currentUser"></p>
        <a class="waves-effect waves-light btn button-sign regButton"
           @click="toUserInfo"
        ><router-link to="/" class="app-header-link">{{firstName}}</router-link></a>

        <a class="waves-effect waves-light btn button-sign regButton"
           @click="logOut"
        ><router-link to="/" class="app-header-link">{{ $t("buttons.logOut") }}</router-link></a>
      </div>

      <div v-if="!isAuth">
        <a class="waves-effect waves-light btn button-sign loginButton"
        ><router-link to="/signin" class="app-header-link">{{ $t("buttons.login") }}</router-link></a>
        <a class="waves-effect waves-light btn button-sign regButton"
        ><router-link to="/signup" class="app-header-link">{{ $t("buttons.signUp") }}</router-link></a>
      </div>

      </div>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    isAuth () {
      return this.$store.getters['user/isAuth']
    },
    firstName () {
      if (this.$store.getters['user/user'] === null) {
        return ''
      } else {
        return this.$store.getters['user/user'].firstName
      }
    }
  },
  methods: {
    logOut () {
      localStorage.jwt = ''
      return this.$store.dispatch('user/logOut')
    },
    home () {
      this.$router.push('/')
    },
    toUserInfo () {
      this.$router.push('/user-info')
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
    cursor: pointer;
    height: 12rem;
    width: 12rem;
  }

  .currentUser {
    display: inline-block;
    background: white;
    width: 10rem;
  }

  .app-header-link {
    display: inherit;
    font-size: 2rem;
  }

  /*.buttons {*/
    /*margin-right: 5rem;*/
  /*}*/

  .regButton {
    background: var(--white);
    margin-left: 2rem;
  }

  .loginButton {
    background: var(--white);
    margin-right: 2rem;
  }
</style>
