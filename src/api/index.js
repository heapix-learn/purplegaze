import axios from 'axios'

function signUp (user) {
  return axios.post('http://localhost:8008/signup', user)
    .then(response => {
      return response
    })
    .catch(() => {
      throw new Error('errors.exUser')
    })
}

function signIn (user) {
  return axios.get('http://localhost:8008/users?mail=' + user.email + '&password=' + user.password)
    .then(response => {
      if (response.data.length > 0) {
        localStorage.jwt = '1314'
        localStorage.userId = response.data[0].id
        return response
      } else {
        throw new Error('errors.validEnter')
      }
    })
}
export default {
  signUp, signIn
}
