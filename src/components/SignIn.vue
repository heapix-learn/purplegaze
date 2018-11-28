<template>
  <div class="signup-main">
    <div class="row signup-block">
      <h1 class="title">{{ $t("buttons.login") }}</h1>
      <form class="col s12 form">
        <div class="row">
          <div class="input-field col s12">
            <input id="email"
                   type="email"
                   class="validate"
                   v-model="user.email"
                   @input="clearErrors">
            <label for="email">{{ $t("signup.email") }}</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password"
              type="password"
              class="validate"
              v-model="user.password"
              @input="clearErrors"
            >
            <label for="password">{{ $t("signup.password") }}</label>
          </div>
        </div>
        <div class="error-block" :class="{'error-block--visible': errors.length}">
          <p v-if="errors.length">
            <b>{{ $t("errors.title") }}</b>
          <ul>
            <li v-for="error in errors" v-bind:key="error">{{ $t(error) }}</li>
          </ul>
          </p>
        </div>
        <div class="buttons">
          <a class="waves-effect waves-light btn button-sign"
             @click="checkForm"
             :disabled="errors.length > 0"
          >{{ $t("buttons.login") }}</a>
          <a class="waves-effect waves-light btn button-login"
             @click="goSignUp"
          >{{ $t("buttons.createAcc") }}</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'SignIn',
  data () {
    return {
      errors: [],
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    goSignUp () {
      this.$router.push('/signup')
    },
    checkForm (e) {
      this.errors = []

      if (!this.user.password) {
        this.errors.push('errors.password')
      }
      if (!this.user.email) {
        this.errors.push('errors.email')
      } else if (!this.validEmail(this.user.email)) {
        this.errors.push('errors.validEmail')
      }

      if (!this.errors.length) {
        api.signIn(this.user)
          .catch(err => {
            console.error(err)
            this.errors.push('errors.validEnter')
          })
      }

      e.preventDefault()
    },
    validEmail (email) {
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    clearErrors () {
      this.errors = []
    }
  }
}
</script>

<style scoped>
  .signup-main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }

  .title {
    margin: 3rem 0 5rem 0;
  }

  .signup-block {
    width: 100rem;
    height: 50rem;
    border: 0.3rem solid var(--black);
  }

  .form {
    height: 30rem;
    padding: 0 28rem;
  }

  .error-block {
    width: 450px;
    height: 78px;
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

  .buttons {
    margin: 5rem 0;
  }

  .button-sign {
    width: 10rem;
    margin-right: 4rem;
  }

  .button-login {
    width: 20rem;
    margin-left: 4rem;
  }
</style>
