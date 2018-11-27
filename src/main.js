import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.config.productionTip = false

const values = {
  en: {
    signup: {
      firstName: 'First Name'
    }
  },
  ru: {
    message: {
      hello: 'Bonjour monde'
    }
  }
}

const i18n = new VueI18n({
  locale: 'fr', // set locale
  messages // set locale messages
})

new Vue({
  i18n,
  el: '#app',
  template: '<App/>',
  components: { App }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
