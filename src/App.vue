<template>
  <v-app class="app">

    <ToolBar v-if="showToolbar" />
        <AppAlert />


    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import ToolBar from '@/components/common/ToolBar.vue'
import AppAlert from '@/components/common/AppAlert.vue'

export default {
  name: 'App',

  components: {
    ToolBar,
    AppAlert
  },

  computed: {
    showToolbar() {
      return !['login', 'register', 'admin','admin-dashboard','admin-orders','admin-users','admin-products'].includes(this.$route.name)
    }
  }
}
</script>
<style>
.app {
  background: #eeeeee !important;
}
</style>
