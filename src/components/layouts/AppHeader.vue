<template>
  <div class="app-header">
    <div class="app-header__search">
      <a class="waves-effect waves-light btn" @click="searchUser()">search</a>
      <div class="row app-header__search__form">
        <div class="input-field col s6 app-header__search__input-block">
          <input id="first_name2" type="text" class="validate search__input-block__input" v-model="search">
        </div>
      </div>
      <span><img src="../../assets/1.png" height="50" width="50"/></span>
    </div>
    <div class="imageBlock">
      <img src="../../assets/haze.png" class="image" @click="home"/>
    </div>
    <div class="app-header__user-buttons" v-if="isAuth">
      <a class="waves-effect waves-light btn button-sign app-header__user-buttons__user-login"
         @click="toUserInfo"
      >
        <router-link to="/" class="app-header-link"><i class="material-icons app-header__user-buttons__user-login_icon">
          account_circle
        </i>{{firstName}}
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
import axios from 'axios'
export default {
  name: 'AppHeader',
  data () {
    return {
      users: [],
      search: ''
    }
  },
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
    async searchUser () {
      await (axios.get('http://localhost:8008/users'))
        .then(response => {
          this.users = response.data
        })
      console.log(this.users)
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

  .app-header__search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    margin: 0 2rem;
  }

  .app-header__search__form {
    margin: 0;
  }

  .app-header__search__input-block {
    margin: 0;
    width: 100% !important;
  }

  .search__input-block__input {
    margin: 0 !important;
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
    margin-right: 2rem;
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
    margin-left: 2rem;
  }
</style>
