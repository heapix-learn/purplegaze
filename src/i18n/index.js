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
    },
    errors: {
      title: 'Please correct the error:',
      enterName: 'Enter a name.',
      enterLastName: 'Enter a last name.',
      symbolName: 'The name must be no shorter than 2 characters.',
      spacesName: 'The name must not contain spaces.',
      numbersName: 'The name must not contain numbers.',
      numbersLast: 'The last name must not contain numbers.',
      email: 'Enter a email.',
      validEmail: 'Please enter a valid email address.',
      password: 'Enter a password',
      exUser: 'This user already exists.',
      validEnter: 'You entered an invalid email or password.'
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
    },
    errors: {
      title: 'Пожалуйста исправьте указанные ошибки:',
      enterName: 'Укажите имя.',
      enterLastName: 'Укажите фамилию.',
      symbolName: 'Имя не должно быть меньше 2-х символов.',
      spacesName: 'Имя не должно содержать пробелы.',
      numbersName: 'Имя не должно содержать цифры.',
      numbersLast: 'Фамилия не должна содержать цифры.',
      email: 'Укажите электронную почту.',
      validEmail: 'Укажите корректный адрес электронной почты.',
      password: 'Укажите пароль.',
      exUser: 'Такой пользователь уже существует.',
      validEnter: 'Вы ввели неверные почту или пароль.'
    }
  }
}

export default new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})
