import axios from 'axios'

function getPosts () {
  axios.get('http://localhost:8008/posts')
    .then(response => {
      console.log(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
}
function signUp (user) {
  axios.post('http://localhost:8008/users', user)
    .then(response => {
      console.log(response.data)
    })
}
export default {
  getPosts, signUp
}
