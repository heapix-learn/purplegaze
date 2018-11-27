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
      signUp: 'Зарегестрироваться',
      login: 'Войти',
      createAcc: 'Создать аккаунт'
    }
  }
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

export default new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})

i18n.locale = 'ru'
