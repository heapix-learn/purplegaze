export default {
  namespaced: true,
  state: {
    isAuth: false,
    user: null
  },
  getters: {
    isAuth: state => {
      return state.isAuth
    }
  },
  mutations: {
    logIn (state) {
      state.isAuth = true
    },
    logOut (state) {
      state.isAuth = false
      state.user = null
    },
    authUser (state, payload) {
      state.user = payload
      console.log(payload)
    }
  },
  actions: {
    logIn ({commit}) {
      commit('logIn')
    },
    logOut ({commit}) {
      commit('logOut')
    }
  }
}
