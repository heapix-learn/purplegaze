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
  return axios.post('http://localhost:8008/signin', user)
    .then(response => {
        localStorage.jwt = response.data.jwt
        return response
    })
}

function logOut() {
  localStorage.jwt = ''
}

function getProfile () {
  return axios.get('http://localhost:8008/profile')
}
export default {
  signUp, signIn, logOut
}
