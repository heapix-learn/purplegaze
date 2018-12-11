<template>
  <div class="user-info">
    <div class="row user-info__row">
      <div class="user-info__row__block">
        <div class="card user-info__row__block__card">
          <div class="user-info__row__block__card__card-image">
            <img class="user-info__row__block__card__card-image__image" src="../../assets/forest.jpg" height="532"
                 width="800"/><span class="card-title user-info__row__block__card__card-image__name">{{userInfo.firstName}}</span>
          </div>
          <div class="card-content user-info__row__block__card__content">
            <p>user First Name: {{userInfo.firstName}}</p>
            <p>user Last Name: {{userInfo.lastName}}</p>
            <p>user Email: {{userInfo.email}}</p>
          </div>
          <a @click="openFormUser()"><i
            class="medium material-icons user-info__row__block__card__content__info__comment">edit</i></a>
          <div class="user-info__row__block__card__content__info">
            <div class="user-info__row__block__card__content__info__comment__edit-user" v-if="isEdit">
              <div class="row">
                <form class="col s12">
                  <div class="row">
                    <div class="input-field col s6">
                      <input id="first_name"
                             type="text"
                             class="validate"
                             v-model="newUser.firstName"
                      >
                      <label for="first_name">First Name</label>
                    </div>
                    <div class="input-field col s6">
                      <input id="last_name"
                             type="text"
                             class="validate"
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
                             v-model="newPassword"
                      >
                      <label for="new_password">New Password</label>
                    </div>
                  </div>
                </form>
              </div>
              <div user-info__row__block__card__content__info__comment__edit-user__button>
                <a
                  class="waves-effect waves-light btn button-sign user-info__row__block__card__content__info__comment__edit-user__button"
                  @click="editUser()"
                >edit user</a>
              </div>
            </div>
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
      newUser: {},
      user: {},
      isEdit: false
    }
  },
  computed: {
    userInfo () {
      if (this.$store.getters['user/user'] === null) {
        return ''
      } else {
        this.user = this.$store.getters['user/user']
        for (var key in this.user) {
          this.newUser[key] = this.user[key]
        }
        console.log(this.newUser)
        return this.$store.getters['user/user']
      }
    }
  },
  methods: {
    openFormUser () {
      if (this.isEdit) {
        this.isEdit = false
      } else {
        this.isEdit = true
      }
    },
    editUser () {
      if (this.oldPassword.length === 0 || this.oldPassword === this.user.password) {
        if (this.newPassword.length > 2 && this.oldPassword === this.user.password) {
          this.newUser.password = this.newPassword
        } else {
          alert('Wrong password!')
        }
        axios.put('http://localhost:8008/users/' + this.userInfo.id, this.newUser)
        location.reload()
      } else {
        alert('Wrong old password'
        )
      }
    }
  }
}

</script>

<style scoped>
  .user-info {
    height: 80vh;
    width: 100vw;
  }

  .user-info__row__block__card {
    height: 80vh;
    margin: 0;
  }

  .user-info__row__block__card__content {
    padding: 1rem;
  }

  .user-info__row__block__card__card-image__image {
    width: 100%;
    height: 45vh;
  }

  .user-info__row__block__card__card-image__name {
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

  .user-info__row__block__card__content__info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0;
  }

  .user-info__row__block__card__content__info__comment {
    cursor: pointer;
    padding: 0.5rem;
  }

  .user-info__row__block__card__content__info__comment__edit-user {
    width: 30%;
  }

  .user-info__row__block__card__content__info__comment__edit-user__button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
</style>
