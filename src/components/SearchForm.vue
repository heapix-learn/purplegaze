<template>
  <div class="search">
    <div class="app-header__choice-block">
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
          <a class="waves-effect waves-light btn" @click="filterUsers()">go search</a>
          <div class="row app-header__search__form">
            <div class="input-field col s6 app-header__search__input-block">
              <input type="text"
                     class="validate search__input-block__input"
                     v-model="searchUser"
              >
            </div>
          </div>
        </div>
        <div class="search__input-block__output" v-for="(user, index) in filteredUsers" :key="index">
          <span>{{user.firstName}} {{user.lastName}}</span>
        </div>
      </div>

      <div class="app-header__search-block__form" v-if="showButtonHash">
        <div class="app-header__search__search-block">
          <a class="waves-effect waves-light btn" @click="filterHash()">go search</a>
          <div class="row app-header__search__form">
            <div class="input-field col s6 app-header__search__input-block">
              <input type="text"
                     class="validate search__input-block__input"
                     v-model="searchHash"
              >
            </div>
          </div>
        </div>
        <div v-for="(hash, index) in filteredHashes" :key="index">
          <span>{{hash}}</span><br>
        </div>
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
      if (search === '') {
        alert('Empty input')
      } else {
        this.filteredUsers = this.users.filter(function (user) {
          return user.firstName.toLowerCase().indexOf(search.toLowerCase()) > -1
        })
      }
    },
    filterHash () {
      this.filteredHashes = []
      const search = this.searchHash
      if (search === '') {
        alert('Empty hash')
      } else {
        for (let i = 0; i < this.messages.length; i++) {
          for (let j = 0; j < this.messages[i].hashtag.length; j++) {
            if (this.messages[i].hashtag[j].toLowerCase().indexOf(search.toLowerCase()) > -1) {
              this.filteredHashes.push(this.messages[i].hashtag[j])
            }
          }
        }
      }
    },
    showSearchUser () {
      this.showButtonUser = !this.showButtonUser
    },
    showSearchHash () {
      this.showButtonHash = !this.showButtonHash
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
    }
  }
}
</script>

<style scoped>
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
</style>
