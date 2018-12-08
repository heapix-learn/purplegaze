<template>
  <div class="UserInfo">
    <div class="row">
      <div class="">
        <div class="card">
          <div class="card-image">
            <img src="../../assets/forest.jpg" height="532" width="800"/><span class="card-title name">{{user.firstName}} {{user.lastName}}</span>
          </div>
          <div class="card-content">
            <p>user First Name: {{user.firstName}}</p>
            <p>user Last Name: {{user.lastName}}</p>
            <p>user Email: {{user.email}}</p>
          </div>
          <a class="card-action-icons comment" @click="editUser()"><i class="medium material-icons">comment</i></a>
          <div class="editUser" v-if="isEdit">
            <div class="row">
              <form class="col s6">
                <div class="row">
                  <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_firstName" type="text" class="validate">
                    <label for="icon_firstName">First Name</label>
                  </div>
                </div>
                <div class="row">
                  <div class="input-field col s6">
                    <i class="material-icons prefix">account_circle</i>
                    <input id="icon_lastName" type="text" class="validate">
                    <label for="icon_lastName">Last Name</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data () {
    return {
      user: {},
      isEdit: false
    }
  },
  created () {
    this.userInfo()
  },
  methods: {
    editUser () {
      if (this.isEdit) {
        this.isEdit = false
      } else {
        this.isEdit = true
      }
    },
    userInfo () {
      this.user = this.$store.getters['user/user']
    }
  }
}
</script>

<style scoped>
  .UserInfo {
    height: 80vh;
    width: 100vw;
  }

  .card {
    height: 80vh;
  }

  .name {
    background: white;
    color: black !important;
  }
</style>
