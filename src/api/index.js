import axios from 'axios'

function signUp (user) {
  return axios.get('http://localhost:8008/users?email=' + user.email)
    .then(response => {
      if (response.data.length > 0) {
        throw new Error('errors.exUser')
      } else {
        axios.post('http://localhost:8008/users', user)
        return response
      }
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
