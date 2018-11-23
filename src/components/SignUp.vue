<template>
  <div class="signup-main">
    <div class="row signup-block">
      <h1 class="title">Sign up</h1>
      <form class="col s12 form">
        <div class="row">
          <div class="input-field col s6">
            <input id="first_name"
                   type="text"
                   class="validate"
                   v-model="firstName"
                   @input="clearErrors"
            >
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name"
                   type="text"
                   class="validate"
                   v-model="lastName"
                   @input="clearErrors"
            >
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="email"
                   type="email"
                   class="validate"
                   v-model="email"
                   @input="clearErrors"
            >
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password"
                   type="password"
                   class="validate"
                   v-model="password"
                   @input="clearErrors"
            >
            <label for="password">Password</label>
          </div>
        </div>
        <div class="error-block" :class="{'error-block--visible': errors.length}">
          <p v-if="errors.length">
            <b>Пожалуйста исправьте указанные ошибки:</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
          </p>
        </div>
        <div class="buttons">
          <a class="waves-effect waves-light btn button-sign"
             @click="checkForm"
             :disabled="errors.length > 0"
          >Sign up!</a>
          <a class="waves-effect waves-light btn button-login" @click="goSignIn">Login instead</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      errors: [],
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    goSignIn () {
      this.$router.push('/signin')
    },
    checkForm (e) {
      this.errors = []

      if (!this.firstName) {
        this.errors.push('Укажите имя.')
      } else if (this.firstName.length < 2) {
        this.errors.push('Имя должно быть не короче 2-х символов.')
      } else if (this.firstName.replace(/\s/g, '') === '') {
        this.errors.push('Имя не должно содержать пробелы.')
      } else if (this.firstName.indexOf([0 - 9])) {
        this.errors.push('Имя не должно содержать цифры.')
      }

      if (!this.lastName) {
        this.errors.push('Укажите фамилию.')
      } else if (this.lastName.length < 2) {
        this.errors.push('Фамилия должна быть не короче 2-х символов.')
      } else if (this.lastName.replace(/\s/g, '') === '') {
        this.errors.push('Фамилия не должна содержать пробелы.')
      } else if (this.firstName.indexOf([0 - 9])) {
        this.errors.push('Фамилия не должна содержать цифры.')
      }

      if (!this.password) {
        this.errors.push('Укажите пароль.')
      }
      if (!this.email) {
        this.errors.push('Укажите электронную почту.')
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Укажите корректный адрес электронной почты.')
      }

      if (!this.errors.length) {
        return alert('Has been registered!')
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
    border: 0.3rem solid var(--black);
  }

  .form {
    height: 50rem;
    padding: 0 28rem;
  }

  .error-block {
    width: 400px;
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

  .buttons {
    margin: 5rem 0;
  }

  .button-sign {
    width: 10rem;
    margin-right: 6rem;
  }

  .button-login {
    width: 20rem;
    margin-left: 6rem;
  }
</style>
