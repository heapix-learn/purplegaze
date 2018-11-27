import axios from 'axios'

function signUp (user) {
  return axios.get('http://localhost:8008/users?email=' + user.email)
    .then(response => {
      if (response.data.length > 0) {
        throw new Error('Такой пользователь уже существует.')
      } else {
        axios.post('http://localhost:8008/users', user)
        window.location.href = '/signin'
      }
    })
}

function signIn (user) {
  return axios.get('http://localhost:8008/users?mail=' + user.email + '&password=' + user.password)
    .then(response => {
      if (response.data.length > 0) {
        localStorage.jwt = '1314'
        localStorage.userId = response.data[0].id
        window.location.href = '/'
      } else {
        throw new Error('Вы ввели неверные почту или пароль.')
      }
    })
}
export default {
  signUp, signIn
}
