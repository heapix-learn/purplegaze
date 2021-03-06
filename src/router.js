import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './router/auth-guard'
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
      component: NewMessage,
      beforeEnter: AuthGuard
    },
    {
      path: '/user-info',
      component: UserInfo
    },
    {
      path: '/hashtag/:hash',
      component: HashtagMessages
    },
    {
      path: '/user/:id',
      component: UserMessages
    }
  ]
})
