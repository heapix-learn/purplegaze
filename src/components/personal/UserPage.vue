<template>
  <div class="user-page">
    <div class="user-page__user-info" v-if="exist">
      {{$t("fields.infoByUser")}}: {{user.firstName}} {{ user.lastName }}
      <p>{{$t("fields.firstName")}}: {{ user.firstName }}</p>
      <p>{{$t("fields.lastName")}}: {{ user.lastName }}</p>
      <p>{{$t("fields.email")}}: {{ user.email }}</p>
      <p>{{$t("fields.quantityOfPosts")}}: {{ quantity}}</p>
    </div>
    <h1 v-if="!exist">
      404 (Not Found)<br>{{$t("errors.userNotFound")}}
    </h1>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserPage',
  data () {
    return {
      user: [],
      exist: true
    }
  },
  props: ['id', 'quantity'],
  created () {
    this.getMessagesById()
  },
  methods: {
    async getMessagesById () {
      const id = this.id
      await (axios.get('http://localhost:8008/users/' + id))
        .then(response => {
          this.user = response.data
        })
        .catch(err => {
          this.exist = !this.exist
          if (!this.exist) {
            this.$emit('exist')
          }
          console.error(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
