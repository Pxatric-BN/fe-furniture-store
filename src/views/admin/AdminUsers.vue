<template>
  <div>
   <UsersTable />
  </div>
</template>

<script>
import UsersTable from '@/components/admin/UsersTable.vue'
export default {
  name: 'AdminUsers',
  components: {
    UsersTable
  }
}
</script>