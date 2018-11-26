import axios from 'axios'

function signUp (user) {
  return axios.get('http://localhost:8008/users?email=' + user.email)
    .then(response => {
      if (response.data.length > 0) {
        throw new Error ('Такой пользователь уже существует.')
      } else {
        axios.post('http://localhost:8008/users', user)
        alert('Зарегестрирован.')
        window.location.href = '/signin'
      }
    })
}
export default {
  signUp
}
