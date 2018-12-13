<template>
  <div class="user-info">
    <div class="row user-info__row">
      <div class="user-info__row__block">
        <div class="card user-info__card">
          <div class="user-info__card__card-image">
            <img class="user-info__card-image__image" src="../../assets/forest.jpg" height="532"
                 width="800"/><span class="card-title user-info__card-image__name">{{userInfo.firstName}}</span>
          </div>
          <div class="card-content user-info__card__content">
            <p>{{userInfo.firstName}}</p>
            <p>{{userInfo.lastName}}</p>
            <p>{{userInfo.email}}</p>
            <p>{{this.$store.getters['user/user'].password}}</p>
          </div>
          <a @click="openFormUser()"><i class="medium material-icons user-info__info__comment">edit</i></a>
          <div class="user-info__content__info">
            <div class="user-info__comment__edit-user" v-if="isEdit">
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s6">
                      <input id="first_name"
                             type="text"
                             class="validate"
                             @input="clearErrors"
                             maxlength="8"
                             v-model="newUser.firstName"
                      >
                      <label for="first_name">First Name (max. 8)</label>
                    </div>
                    <div class="input-field col s6">
                      <input id="last_name"
                             type="text"
                             class="validate"
                             @input="clearErrors"
                             v-model="newUser.lastName"
                      >
                      <label for="last_name">Last Name</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="old_password"
                             type="password"
                             class="validate"
                             @input="clearErrors"
                             v-model="oldPassword"
                      >
                      <label for="old_password">Old Password</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="new_password"
                             type="password"
                             class="validate"
                             @input="clearErrors"
                             v-model="newPassword"
                      >
                      <label for="new_password">New Password</label>
                    </div>
                  </div>
                </form>
              </div>
              <div class="user-info__edit-user__button-block">
                <a
                  class="waves-effect waves-light btn button-sign user-info__edit-user__button"
                  @click="editUser()"
                >edit user</a>
                <a
                  class="waves-effect waves-light btn button-sign user-info__edit-user__button"
                  @click="editPassword()"
                >edit password</a>
              </div>
            </div>
          </div>
          <div class="user-info__error-block"
               :class="{'user-info__error-block--visible': errors.length}"
          >
            <p v-if="errors.length">
              <b>{{ $t("errors.title") }}</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ $t(error) }}</li>
            </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserInfo',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      isEdit: false,
      errors: []
    }
  },
  computed: {
    userInfo () {
      if (this.$store.getters['user/user'] === null) {
        return ''
      } else {
        return this.$store.getters['user/user']
      }
    },
    newUser () {
      return Object.assign({}, this.userInfo)
    }
  },
  methods: {
    openFormUser () {
      this.isEdit = !this.isEdit
      if (this.errors.length) {
        this.clearErrors()
      }
    },
    editUser () {
      if (this.newUser.firstName.length < 3) {
        this.errors.push('First Name more than 3 letters')
      } else if (this.newUser.lastName.length < 3) {
        this.errors.push('Last Name more than 3 letters')
      } else {
        axios.put('http://localhost:8008/users/' + this.userInfo.id, this.newUser)
        location.reload()
      }
    },
    editPassword () {
      if (!this.oldPassword) {
        this.errors.push('Please enter old password')
      }
      if (this.oldPassword) {
        if (this.oldPassword !== this.$store.getters['user/user'].password) {
          this.errors.push('Wrong old password')
        } else if (!this.newPassword) {
          this.errors.push('Please enter new password')
        } else {
          this.newUser.password = this.newPassword
          axios.put('http://localhost:8008/users/' + this.userInfo.id, this.newUser)
          location.reload()
        }
      }
    },
    clearErrors () {
      this.errors = []
    }
  }
}

</script>

<style scoped>
  .user-info {
    height: 80vh;
    width: 100vw;
  }

  .user-info__card {
    height: 80vh;
    margin: 0;
  }

  .user-info__card__content {
    padding: 1rem;
  }

  .user-info__card-image__image {
    width: 100%;
    height: 45vh;
    margin-bottom: 3rem;
  }

  .user-info__card-image__name {
    position: absolute;
    left: 1rem;
    top: 32rem;
    width: 15rem;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: var(--white);
    color: var(--black) !important;
  }

  .user-info__content__info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0;
  }

  .user-info__info__comment {
    cursor: pointer;
    padding: 0.5rem;
  }

  .user-info__comment__edit-user {
    width: 30%;
  }

  .user-info__edit-user__button {
    display: block;
    margin: 1rem auto;
    width: 50%;
  }

  .user-info__error-block {
    width: 450px;
    height: 126px;
    margin-left: 2rem;
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

  .user-info__error-block--visible {
    opacity: 1;
  }
</style>
