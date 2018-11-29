export default {
  namespaced: true,
  state: {
    isAuth: false
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
