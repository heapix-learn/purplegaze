<template>
  <div class="newmessage-block">
    <div class="row input">
      <form class="col s12 newmessage-block__text">
        <div class="row newmessage-block__text__row">
          <div class="input-field col s12">
              <textarea id="textarea2"
                        class="materialize-textarea newmessage-block__text__area"
                        data-length="70"
                        maxlength="140"
                        v-model="post.text"
                        @input="clearErrors"
              ></textarea>
            <label for="textarea2" class="label">{{$t("inputs.text")}} ({{post.text.length}}/140)</label>
          </div>
        </div>
      </form>
      <div class="row newmessage-block__content">
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
            <div class="input-field col s6" v-if="isLinkField">
              <input type="text" v-model="post.link">
              <label>Link</label>
            </div>
          </div>
          <form class="inputImage" :class="{'inputImage--visible': isImageField}">
            <div class="row">
              <div class="file-field input-field col s12">
                <div class="btn">
                  <span>{{ $t("buttons.uploadImage")}}</span>
                  <input type="file"
                         accept="image/*"
                         @change="onFileChange"
                  >
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
            </div>
          </form>
          <form class="inputVideo" :class="{'inputVideo--visible': isVideoField}">
            <div class="row">
              <div class="file-field input-field col s12">
                <div class="btn">
                  <span>{{ $t("buttons.uploadVideo")}}</span>
                  <input type="file"
                         accept="video/*"
                  >
                </div>
                <div class="file-path-wrapper">
                  <input class="file-path validate" type="text">
                </div>
              </div>
            </div>
          </form>
          <div class="newmessage-block__buttons-block">
            <a class="btn-floating btn-medium waves-effect waves-light btn newmessage-block__buttons-block__button"
               @click="showLinkField()"
            ><i class="material-icons">link</i></a>
            <a class="btn-floating btn-medium waves-effect waves-light btn newmessage-block__buttons-block__button"
               @click="showImageField()"
            ><i class="material-icons">cloud_upload</i></a>
            <a class="btn-floating btn-medium waves-effect waves-light btn newmessage-block__buttons-block__button"
               @click="showVideoField()"
            ><i class="material-icons">video_call</i></a>
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
      isImageField: false,
      isVideoField: false,
      post: {
        text: '',
        hashtag: '',
        link: '',
        image: null
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
          image: this.post.image,
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
    },
    showImageField () {
      this.isImageField = !this.isImageField
    },
    showVideoField () {
      this.isVideoField = !this.isVideoField
    },
    onFileChange (event) {
      const file = event.target.files[0]
      let reader = new FileReader()
      reader.onload = (event) => {
        let image = event.target.result
        this.post.image = image
      }
      reader.readAsDataURL(file)
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
    width: 100rem;
    height: 100%;
  }

  .newmessage-block__text {
    margin-bottom: 0 !important;
    margin-top: 3rem;
    padding: 0 10rem;
  }

  .newmessage-block__text__row {
    margin-bottom: 0 !important;
  }

  .newmessage-block__text__area {
    max-height: 60px;
    resize: none;
    height: 60px;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .newmessage-block__content {
    margin: 0 !important;
    padding: 0 10rem;
  }

  .error-block {
    width: 450px;
    height: 90px;
    margin: 0 auto 0 auto;
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
    top: 38rem;
  }

  .inputImage {
    opacity: 0;
  }

  .inputImage--visible {
    opacity: 1;
  }

  .inputVideo {
    opacity: 0;
  }

  .inputVideo--visible {
    opacity: 1;
  }

  .newmessage-block__buttons-block__button {
    margin-bottom: 4rem;
  }

  .buttonPost {
    margin-top: 1rem;
  }
</style>
