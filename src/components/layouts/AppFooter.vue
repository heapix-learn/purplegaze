<template>
    <div class="footer">
      <div class="buttons">
        <a class="waves-effect waves-light btn button-sign"
          @click="switchLocale()"
        >{{ $t("buttons.lang") }}</a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'AppFooter',
  data () {
    return {
      title: 'Hello! I\'m footer!'
    }
  },
  methods: {
    switchLocale () {
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'ru'
      } else {
        this.$i18n.locale = 'en'
      }
    }
  }
}
</script>

<style scoped>
  .footer {
    width: 100%;
    height: 10vh;
    background: var(--purple);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn {
    width: 15rem;
    background: var(--black);
  }
</style>
