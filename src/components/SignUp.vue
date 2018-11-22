<template>
  <div class="signup-main">
    <div class="row signup-block">
      <h1 class="title">Sign up</h1>
      <form class="col s12 form">
        <div class="row">
          <div class="input-field col s6">
            <input id="first_name" type="text" class="validate" v-model="first_name">
            <label for="first_name">First Name</label>
          </div>
          <div class="input-field col s6">
            <input id="last_name" type="text" class="validate" v-model="last_name">
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="email" type="email" class="validate" v-model="email">
            <label for="email">Email</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input id="password" type="password" class="validate" v-model="pass">
            <label for="password">Password</label>
          </div>
        </div>
      </form>
      <div :class="{'error-place': errors.length}">
        <p v-if="errors.length">
          <b>Пожалуйста исправьте указанные ошибки:</b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </p>
      </div>
      <div class="buttons">
        <a class="waves-effect waves-light btn button-sign" @click="checkForm">Sign up!</a>
        <a class="waves-effect waves-light btn button-login">Login</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      errors: [],
      firstName: '',
      lastName: '',
      email: '',
      pass: '',
    };
  },
  methods: {
    checkForm(e) {
      this.errors = [];

      if (!this.firstName) {
        this.errors.push('Укажите имя.');
      }
      if (!this.lastName) {
        this.errors.push('Укажите фамилию.');
      }
      if (!this.pass) {
        this.errors.push('Укажите пароль.');
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
    /*margin: 20vh auto;*/
    border: 0.3rem solid var(--black);
  }

  .form {
    height: 30rem;
    padding: 0 5rem;
  }

  .error-place {
    width: 100rem;
    position: absolute;
    top: 75rem;
    border: .3rem solid red;
    background: linear-gradient(#A15458,#AE5C68,#BA667A,#C4718D,#CD7CA0,#D389B5);
  }

  .buttons {
    height: 40rem;
  }

  .button-sign {
    width: 10rem;
    margin-right: 10rem;
  }

  .button-login {
    width: 10rem;
    margin-left: 10rem;
  }
</style>
