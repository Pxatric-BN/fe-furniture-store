<template>
  <v-app class="app">
    <AppAlert />

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppAlert from '@/components/common/AppAlert.vue'

export default {
  name: 'App',

  components: {
    AppAlert
  }
}
</script>

<style>
.app {
  background: #eeeeee !important;
}
</style>

