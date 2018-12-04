<template>
  <div id="app">
    <app-header v-if="!isSignPage"></app-header>
    <app-main>
      <router-view/>
    </app-main>
    <app-footer v-if="!isSignPage"/>
  </div>
</template>

<script>
import axios from 'axios'

import AppHeader from './components/layouts/AppHeader.vue'
import AppMain from './components/layouts/AppMain.vue'
import AppFooter from './components/layouts/AppFooter.vue'

export default {
  components: { AppHeader, AppMain, AppFooter },
  computed: {
    isSignPage () {
      return this.$route.path.includes('signup') || this.$route.path.includes('signin')
    }
  },
  mounted () {
    if (localStorage.jwt !== '' && this.$store.getters['user/isAuth'] === false) {
      return axios.get('http://localhost:8008/profile', {
        headers: {
          'authorization': 'Bearer ' + localStorage.jwt
        }
      })
        .then(response => {
          return this.$store.dispatch('user/authUser', response.data[0])
        })
        .then(response => {
          return this.$store.dispatch('user/logIn')
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      console.log('Not ok!')
    }
  }
}
</script>

<style>
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Lato', sans-serif;
  }
  :root {
  --white: #fff;
  --purple: #8100a8;
  --black: #111;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
