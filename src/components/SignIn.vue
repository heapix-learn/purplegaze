<template>
  <div class="signup-main">
    <div class="row signup-block">
      <h1 class="title">Sign in</h1>
      <form class="col s12 form">
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate" v-model="email" @input="clearErrors">
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" class="validate" v-model="password" @input="clearErrors">
            <label for="password">Password</label>
          </div>
        </div>
        <div class="error-block" :class="{'error-block--visible': errors.length}">
          <p v-if="errors.length">
            <b>Пожалуйста исправьте указанные ошибки:</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
          </p>
        </div>
        <div class="buttons">
          <a class="waves-effect waves-light btn button-sign" @click="checkForm" :disabled="errors.length > 0">Sign in!</a>
          <a class="waves-effect waves-light btn button-login" @click="goSignUp">Create account</a>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      errors: [],
      email: '',
      password: '',
    };
  },
  methods: {
    goSignUp() {
      this.$router.push('/signup');
    },
    checkForm(e) {
      this.errors = [];

      if (!this.password) {
        this.errors.push('Укажите пароль.');
        this.errors.length;
      }
      if (!this.email) {
        this.errors.push('Укажите электронную почту.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Укажите корректный адрес электронной почты.');
      }

      if (!this.errors.length) {
        return alert('Has been registered!');
      }

      e.preventDefault();
    },
    validEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    clearErrors() {
      this.errors = [];
    },
  },
};
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
    width: 400px;
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
