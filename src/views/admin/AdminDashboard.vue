<template>
  <div>
    <AdminSidebar />

    <div class="admin-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AdminSidebar from '@/components/admin/AdminSidebar.vue'

export default {
  name: 'AdminLayout',

  components: {
    AdminSidebar
  }
}
</script>

<style scoped>
.admin-content {
  padding: 32px;
}
</style>