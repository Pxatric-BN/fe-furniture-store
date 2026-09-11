<template>
  <div>
    <OrderTable />
  </div>
</template>

<script>
import OrderTable from '@/components/admin/OrderTable.vue'
export default {
  name: 'AdminOrders',
  components: {
    OrderTable
  }
}
</script>