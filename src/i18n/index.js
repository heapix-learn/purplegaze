import VueI18n from 'vue-i18n'
import Vue from 'vue'
Vue.use(VueI18n)

const messages = {
  en: {
    signup: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      password: 'Password'
    },
    buttons: {
      lang: 'ру',
      signUp: 'sign up',
      login: 'login instead',
      signIn: 'sign in',
      createAcc: 'create account'
    }
  },
  ru: {
    signup: {
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Электронная почта',
      password: 'Пароль'
    },
    buttons: {
      lang: 'en',
      signUp: 'Зарегестрироваться',
      login: 'Войти',
      createAcc: 'Создать аккаунт'
    }
  }
}

export default new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})
