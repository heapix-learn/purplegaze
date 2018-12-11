<template>
  <div class="user-info">
    <div class="row user-info__row">
      <div class="user-info__row__block">
        <div class="card user-info__row__block__card">
          <div class="user-info__row__block__card__card-image">
            <img class="user-info__row__block__card__card-image__image" src="../../assets/forest.jpg" height="532"
                 width="800"/><span class="card-title user-info__row__block__card__card-image__name">{{userInfo.firstName}} {{userInfo.lastName}}</span>
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
                             v-model="newFirstName"
                      >
                      <label for="first_name">First Name</label>
                    </div>
                    <div class="input-field col s6">
                      <input id="last_name" type="text" class="validate">
                      <label for="last_name">Last Name</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="input-field col s12">
                      <input id="password" type="password" class="validate">
                      <label for="password">Password</label>
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
      newFirstName: '',
      isEdit: false
    }
  },
  computed: {
    userInfo () {
      if (this.$store.getters['user/user'] === null) {
        return ''
      } else {
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
        this.newFirstName = this.user.firstName
      }
    },
    editUser () {
      if (this.newFirstName !== this.user.firstName) {
        this.user.firstName = this.newFirstName
        axios.put('http://localhost:8008/users/' + this.user)
          .then(response => {
            console.log(response.data)
          })
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
  }

  .user-info__row__block__card__card-image__name {
    position: absolute;
    left: 1rem;
    top: 40rem;
    width: 15rem;
    height: 15rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: white;
    color: black !important;
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

  .user-info__row__block__card__content__info__comment__edit-user__button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
  }
</style>
