<template>
  <div class="search">
    <div class="search__choice-block">
      <button class="btn waves-effect waves-light search__choice-block__button"
              name="action"
              @click="showSearchUser()"
      >{{$t("buttons.searchUser")}}
        <i class="material-icons right ">arrow_right_alt</i>
      </button>
      <button class="btn waves-effect waves-light search__choice-block__button"
              name="action"
              @click="showSearchHash()"
      >{{$t("buttons.searchHash")}}
        <i class="material-icons right">arrow_right_alt</i>
      </button>
    </div>
    <div class="search__search-block">
      <div class="search__search-block__form" v-if="showButtonUser">
        <div class="search__search__search-block">
          <a class="waves-effect waves-light btn"
             @click="filterUsers()"
             :disabled="errors.length > 0"
          >{{$t("buttons.goSearch")}}</a>
          <div class="row search__search__form">
            <div class="input-field col s6 search__search__input-block">
              <input type="text"
                     class="validate search__input-block__input"
                     v-model="searchUser"
                     @input="clearErrors"
              >
            </div>
          </div>
        </div>
        <div class="search__input-block__output" v-for="(user, index) in filteredUsers" :key="index">
          <router-link :to="`/user/${user.id}`">
            <span>{{user.firstName}} {{user.lastName}}</span>
          </router-link>
        </div>
      </div>

      <div class="search__search-block__form" v-if="showButtonHash">
        <div class="search__search__search-block">
          <a class="waves-effect waves-light btn"
             @click="filterHash()"
             :disabled="errors.length > 0"
          >{{$t("buttons.goSearch")}}</a>
          <div class="row search__search__form">
            <div class="input-field col s6 search__search__input-block">
              <input type="text"
                     class="validate search__input-block__input"
                     v-model="searchHash"
                     @input="clearErrors"
              >
            </div>
          </div>
        </div>
        <div v-for="(hash, index) in filteredHashes" :key="index">
          <router-link :to="`/hashtag/${hash}`">
            <span>{{hash}}</span><br>
          </router-link>
        </div>
      </div>
      <div class="error-block" :class="{'error-block--visible': errors.length}">
        <p v-if="errors.length">
          <b>{{ $t("errors.title") }}</b>
        <ul class="error-block__list">
          <li v-for="error in errors" v-bind:key="error">{{ $t(error) }}</li>
        </ul>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SearchForm',
  data () {
    return {
      errors: [],
      users: [],
      filteredUsers: [],
      filteredHashes: [],
      searchUser: '',
      searchHash: '',
      showButtonUser: false,
      showButtonHash: false
    }
  },
  created () {
    this.goSearchUser()
    this.goSearchHashtag()
  },
  methods: {
    filterUsers () {
      const search = this.searchUser
      if (!this.searchUser) {
        this.errors.push('errors.enterUserName')
      } else {
        this.filteredUsers = this.users.filter(function (user) {
          return user.firstName.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
        if (!this.filteredUsers.length) {
          this.errors.push('errors.userNotFound')
        }
      }
    },
    filterHash () {
      this.filteredHashes = []
      const search = this.searchHash
      if (!this.searchHash) {
        this.errors.push('errors.enterHashName')
      } else {
        for (let i = 0; i < this.messages.length; i++) {
          for (let j = 0; j < this.messages[i].hashtag.length; j++) {
            if (this.messages[i].hashtag[j].toLowerCase().indexOf(search.toLowerCase()) > -1) {
              this.filteredHashes.push(this.messages[i].hashtag[j])
              let k = this.filteredHashes.length
              this.filteredHashes.sort()
              while (k--) {
                if (this.filteredHashes[k] === this.filteredHashes[k - 1]) {
                  this.filteredHashes.splice(k, 1)
                }
              }
            }
          }
        }
        if (!this.filteredHashes.length) {
          this.errors.push('Not found! Sorry, such # don\'t exist')
        }
      }
    },
    showSearchUser () {
      this.showButtonUser = !this.showButtonUser
      this.clearErrors()
    },
    showSearchHash () {
      this.showButtonHash = !this.showButtonHash
      this.clearErrors()
    },
    async goSearchUser () {
      await (axios.get('http://localhost:8008/users'))
        .then(response => {
          this.users = response.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    async goSearchHashtag () {
      await (axios.get('http://localhost:8008/messages'))
        .then(response => {
          this.messages = response.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    clearErrors () {
      this.errors = []
    }
  }
}
</script>

<style scoped>
  .search__choice-block {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 7rem;
    right: 40rem;
  }

  .search__choice-block__button {
    margin: 0.5rem 0;
  }

  .search__search-block {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 7rem;
    right: 5rem;
  }

  .search__search-block__form {
    display: flex;
    flex-direction: column;
    background: var(--white);
    margin: 0.5rem 2rem;
    border-radius: 0.2rem;
  }

  .search__search__search-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search__search__form {
    margin: 0;
  }

  .search__search__input-block {
    margin: 0;
    width: 100% !important;
  }

  .search__input-block__input {
    margin: 0 !important;
  }

  .error-block {
    width: 350px;
    margin: 10rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d66d7e;
    border: 3px solid #e00000;
    border-radius: 10px;
    color: #fff;
    font-family: Arial;
    opacity: 0;
  }

  .error-block--visible {
    opacity: 1;
  }

  .error-block__list {
    display: flex;
    justify-content: center;
  }
</style>
