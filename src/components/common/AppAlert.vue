<template>
  <v-alert
    v-if="show"
    :type="type"
    dismissible
    elevation="19"
    class="app-alert"
    @input="show = $event"
  >
    {{ message }}
  </v-alert>
</template>

<script>
import eventBus from '@/utils/eventBus'

export default {
  name: 'AppAlert',

  data() {
    return {
      show: false,
      type: 'success',
      message: ''
    }
  },

  mounted() {
    eventBus.$on('show-alert', this.showAlert)
  },

  beforeDestroy() {
    eventBus.$off('show-alert', this.showAlert)
  },

  methods: {
    showAlert({ type, message }) {
      this.type = type
      this.message = message
      this.show = true
    }
  }
}
</script>

<style scoped>
.app-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  min-width: 350px;
}
</style>

