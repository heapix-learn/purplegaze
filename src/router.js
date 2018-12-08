import Vue from 'vue'
import Router from 'vue-router'
import SignUp from './components/SignUp.vue'
import SignIn from './components/SignIn.vue'
import Messages from './components/Messages.vue'
import NewMessage from './components/NewMessage.vue'
import UserInfo from './components/personal/UserInfo.vue'
import HashtagMessages from './components/HashtagMessages.vue'
import UserMessages from './components/UserMessages.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/',
      component: Messages
    },
    {
      path: '/new-message',
      component: NewMessage
    },
    {
      path: '/user-info',
      component: UserInfo
    },
    {
      path: '/hashtag',
      component: HashtagMessages,
      name: 'HashtagMessages'
    },
    {
      path: '/user-messages',
      component: UserMessages,
      name: 'UserMessages'
    }
  ]
})
