<template>
    <div class="newmessage-block">
      <div class="row input">
        <form class="col s12 newmessage-block__text">
          <div class="row">
            <div class="input-field col s12">
              <textarea id="textarea2"
                        class="materialize-textarea"
                        data-length="120"
                        maxlength="140"
                        v-model="post.text"
                        @input="clearErrors"
              ></textarea>
              <label for="textarea2" class="label">{{$t("inputs.text")}} ({{post.text.length}}/140)</label>
            </div>
          </div>
        </form>
        <div class="row newmessage-block__text">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input type="text"
                       data-length="10"
                       v-model="post.hashtag"
                       @input="clearErrors"
                >
                <label>#</label>
              </div>
              <div class="input-field col s6" v-show="isLinkField">
                <input type="text" v-model="post.link">
                <label>Link</label>
              </div>
            </div>
            <div class="newmessage-block__buttons-block">
              <a class="btn-floating btn-small waves-effect waves-light btn newmessage-block__buttons-block__button"
                 @click="showLinkField()"
              ><i class="material-icons">add link</i></a>
              <a class="btn-floating btn-small waves-effect waves-light btn newmessage-block__buttons-block__button"
                 @click="showLinkField()"
              ><i class="material-icons">add link</i></a>
              <a class="btn-floating btn-small waves-effect waves-light btn newmessage-block__buttons-block__button"
                 @click="showLinkField()"
              ><i class="material-icons">add link</i></a>
            </div>
          </form>
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
      isLinkField: false,
      post: {
        text: '',
        hashtag: '',
        link: ''
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
          link: this.post.link,
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
        this.$router.push('/')
      }
      e.preventDefault()
    },
    clearErrors () {
      this.errors = []
    },
    showLinkField () {
      this.isLinkField = !this.isLinkField
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

  .newmessage-block__text {
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

  .newmessage-block__buttons-block {
    position: absolute;
    display: flex;
    flex-direction: column;
    right: 50rem;
    top: 40rem;
  }

  .newmessage-block__buttons-block__button {
    margin: 1rem;
  }

  .buttonPost {
    margin-top: 5rem;
  }

</style>
