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
    <div class="app-header__choice-block" v-if="buttonsShow">
      <button class="btn waves-effect waves-light app-header__choice-block__button"
              name="action"
              @click="showSearchUser()"
      >Search user
        <i class="material-icons right ">arrow_right_alt</i>
      </button>
      <button class="btn waves-effect waves-light app-header__choice-block__button"
              name="action"
              @click="showSearchHash()"
      >Search #
        <i class="material-icons right">arrow_right_alt</i>
      </button>
    </div>


    <div class="app-header__search-block">
      <div class="app-header__search-block__form" v-if="showButtonUser">
        <div class="app-header__search__search-block">
          <a class="waves-effect waves-light btn" @click="goSearchUser()">go search</a>
          <div class="row app-header__search__form">
            <div class="input-field col s6 app-header__search__input-block">
              <input type="text"
                     class="validate search__input-block__input"
                     v-model="searchUser"
              >
            </div>
          </div>
        </div>
        <div class="search__input-block__output" v-for="user in users">
          <span>{{user.firstName}}</span>
        </div>
      </div>

      <div class="app-header__search-block__form" v-if="showButtonHash">
        <div class="app-header__search__search-block">
          <a class="waves-effect waves-light btn" @click="goSearchHashtag()">go search</a>
          <div class="row app-header__search__form">
            <div class="input-field col s6 app-header__search__input-block">
              <input type="text"
                     class="validate search__input-block__input"
                     v-model="searchHash"
              >
            </div>
          </div>
        </div>
        <div class="search__input-block__output" v-for="hash in messages">
          <div v-for="item in hash.hashtag">
            <span>{{item}}</span><br>
          </div>
        </div>
      </div>
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
  import axios from 'axios'

  export default {
    name: 'AppHeader',
    data() {
      return {
        users: [],
        messages: [],
        searchUser: '',
        searchHash: '',
        buttonsShow: false,
        showButtonUser: false,
        showButtonHash: false
      }
    },
    computed: {
      isAuth() {
        return this.$store.getters['user/isAuth']
      },
      userName() {
        if (this.$store.getters['user/user'] === null) {
          return ''
        } else {
          return this.$store.getters['user/user'].firstName
        }
      },
      filteredUsers() {
        // return this.users.filter(user => user.firstName === this.search)
          var self = this;
          return this.users.filter(function (user) {
            return user.firstName.toLowerCase().indexOf(self.searchUser.toLowerCase()) >= 0;
          });
      },
    },
    methods: {
      showChoice() {
        this.buttonsShow = !this.buttonsShow
      },
      showSearchUser() {
        this.showButtonUser = !this.showButtonUser
      },
      showSearchHash() {
        this.showButtonHash = !this.showButtonHash
      },
      async goSearchUser() {
        await (axios.get('http://localhost:8008/users'))
          .then(response => {
            this.users = response.data
          })
      },
      async goSearchHashtag() {
        await (axios.get('http://localhost:8008/messages'))
          .then(response => {
            this.messages = response.data
          })
          .catch(err => {
            console.error(err)
          })
      },
      logOut() {
        localStorage.jwt = ''
        return this.$store.dispatch('user/logOut')
      },
      home() {
        this.$router.push('/')
      },
      toUserInfo() {
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

  .app-header__choice-block {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 7rem;
    right: 40rem;
  }

  .app-header__choice-block__button {
    margin: 0.5rem 0;
  }

  .app-header__search-block {
    display: flex;
    flex-direction: column;
    position: absolute;
    margin: 0.5rem 0;
    top: 7rem;
    right: 5rem;
  }

  .app-header__search-block__form {
    display: flex;
    flex-direction: column;
    background: var(--white);
    margin: 0 2rem;
    border-radius: 0.2rem;
  }

  .app-header__search__search-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
