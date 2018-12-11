import store from '../store'

export default function (to, from, next) {
  if (store.getters['user/isAuth']) {
    next()
  } else {
    next('/signup')
  }
}


