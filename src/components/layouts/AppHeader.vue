<template>
  <div class="app-header">
    <a class="waves-effect waves-light btn button-sign app-header__user-buttons__user-login"
       @click="showChoice()"
    >
      <router-link to="/" class="app-header-link"><i class="material-icons app-header__user-buttons__user-login_icon">
        arrow_downward
      </i>Choose search option
      </router-link>
    </a>
    <SearchForm v-if="buttonsShow"></SearchForm>

    <div class="imageBlock">
      <img src="../../assets/haze.png" class="image" @click="home"/>
    </div>
    <div class="app-header__user-buttons" v-if="isAuth">
      <a class="waves-effect waves-light btn button-sign app-header__user-buttons__user-login"
         @click="toUserInfo"
      >
        <router-link to="/" class="app-header-link"><i class="material-icons app-header__user-buttons__user-login_icon">
          account_circle
        </i>{{userName}}
        </router-link>
      </a>

      <a class="waves-effect waves-light btn button-sign app-header__user-buttons__loginout-signup"
         @click="logOut"
      >
        <router-link to="/" class="app-header-link">{{ $t("buttons.logOut") }}</router-link>
      </a>
    </div>

    <div class="app-header__user-buttons" v-if="!isAuth">
      <a class="waves-effect waves-light btn button-sign app-header__user-buttons__user-login"
      >
        <router-link to="/signin" class="app-header-link">{{ $t("buttons.login") }}</router-link>
      </a>
      <a class="waves-effect waves-light btn button-sign app-header__user-buttons__loginout-signup"
      >
        <router-link to="/signup" class="app-header-link">{{ $t("buttons.signUp") }}</router-link>
      </a>
    </div>

  </div>
</template>

<script>
import SearchForm from '../../components/SearchForm.vue'
export default {
  name: 'AppHeader',
  components: { SearchForm },
  data () {
    return {
      buttonsShow: false
    }
  },
  computed: {
    isAuth () {
      return this.$store.getters['user/isAuth']
    },
    userName () {
      if (this.$store.getters['user/user'] === null) {
        return ''
      } else {
        return this.$store.getters['user/user'].firstName
      }
    }
  },
  methods: {
    showChoice () {
      this.buttonsShow = !this.buttonsShow
    },
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

  .app-header__user-buttons {
    margin-right: 5rem;
  }

  .app-header__user-buttons__user-login {
    background: var(--white);
    margin: 0 2rem;
  }

  .app-header__user-buttons__user-login_icon {
    margin-right: 2rem;
  }

  .app-header-link {
    display: inherit;
    font-size: 2rem;
  }

  .app-header__user-buttons__loginout-signup {
    background: var(--white);
    margin: 0 2rem;
  }
</style>
