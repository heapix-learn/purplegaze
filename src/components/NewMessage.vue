<template>
    <div class="newmessage-block">
      <div class="row input">
        <form class="col s12 form">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea2"
                        class="materialize-textarea"
                        data-length="120"
                        maxlength="140"
                        v-model="post.text"
                        @input="clearErrors"
              ></textarea>
              <label for="textarea2" class="label">Text (max: 140)</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <input id="input_text"
                     type="text"
                     data-length="10"
                     v-model="post.hashtag"
                     @input="clearErrors"
              >
              <label for="input_text">#</label>
            </div>
          </div>
          <div class="error-block" :class="{'error-block--visible': errors.length}">
            <p v-if="errors.length">
              <b>{{ $t("errors.title") }}</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ $t(error) }}</li>
            </ul>
            </p>
          </div>
          <div class="buttonPost">
            <a class="waves-effect waves-light btn"
               @click="checkForm"
               :disabled="errors.length > 0"
            >{{ $t("buttons.post")}}</a>
          </div>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NewMessage',
  data () {
    return {
      errors: [],
      post: {
        text: '',
        hashtag: ''
      }
    }
  },
  methods: {
    async checkForm (e) {
      this.errors = []
      if (!this.post.text) {
        this.errors.push('Enter text')
      }
      if (!this.errors.length) {
        const date = new Date().getDate() + '.' + (new Date().getMonth() + 1) + '.' + new Date().getFullYear()
        await axios.post('http://localhost:8008/messages', {
          text: this.post.text,
          user_id: localStorage.jwt.substr(4),
          hashtag: this.post.hashtag.split(' '),
          firstName: this.$store.getters['user/user'].firstName,
          lastName: this.$store.getters['user/user'].lastName,
          date: date
        })
          .then(response => {
            console.log('Date' + response.data.month)
          })
          .catch(err => {
            console.error(err)
          })
      }
      e.preventDefault()
    },
    clearErrors () {
      this.errors = []
    }
  }
}
</script>

<style scoped>
  .newmessage-block {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100rem;
    height: 50vh;
    border: 0.3rem solid var(--black);
  }

  .input {
    margin: 5rem;
    width: 100rem;
  }

  .form {
    padding: 0 10rem;
  }

  .error-block {
    width: 450px;
    height: 126px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d66d7e;
    border: 3px solid #e00000;
    border-radius: 10px;
    color: #fff;
    font-family: Arial;
    opacity: 0;
  }
  .error-block--visible {
    opacity: 1;
  }

  .buttonPost {
    margin-top: 5rem;
  }

</style>
