<template>
    <div class="main">
      <messages></messages>
    </div>
</template>

<script>
import Messages from '@/components/Messages.vue'

export default {
  name: 'AppMain',
  components: { Messages },
  data () {
    return {
      title: 'Hello! It\'s AppMain'
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  min-height: 80vh;
  background: var(--white);
  display: flex;
  justify-content: center;
}
</style>
