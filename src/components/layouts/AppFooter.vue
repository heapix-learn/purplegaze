<template>
    <div class="footer">
      <div class="buttons">
        <a class="waves-effect waves-light btn button-sign"
           @click="switchLang"
        >Switch lang</a>
      </div>
    </div>
</template>

<script>
import i18n from '@/i18n'
export default {
  name: 'AppFooter',
  data () {
    return {
      title: 'Hello! I\'m footer!'
    }
  },
  methods: {
    switchLang () {
      const messages = VueI18n.switchLang(this.locale)
      console.log(messages)
    }
  }
}
</script>

<style scoped>
.footer {
  width: 100%;
  height: 10vh;
  background: var(--purple);
}
</style>
