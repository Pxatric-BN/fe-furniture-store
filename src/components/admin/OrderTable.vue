<template>
  <div class="admin-orders">
    <v-card
      flat
      class="orders-card"
    >
      <v-card-title>
        <span class="text-h6">Orders</span>
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="orders"
        :loading="loading"
        class="orders-table"
      >

        
        <template v-slot:[`item.user_id`]="{ item }">
          {{ item.user_id.first_name }}
        </template>

       
        <template v-slot:[`item.products`]="{ item }">
          {{ item.products.length }} items
        </template>

       
        <template v-slot:[`item.total_price`]="{ item }">
          {{ item.total_price.toLocaleString() }} ฿
        </template>

       
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>

        
        <template v-slot:[`item.action`]="{ item }">
          <v-btn
            small
            outlined
            @click="viewOrder(item)"
          >
            View
          </v-btn>
        </template>

      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'AdminOrders',

  data () {
    return {
      loading: false,

      orders: [],

      headers: [
        {
          text: 'Order ID',
          value: '_id'
        },
        {
          text: 'Customer',
          value: 'user_id',
          sortable: false
        },
        {
          text: 'Products',
          value: 'products',
          sortable: false
        },
        {
          text: 'Total Price',
          value: 'total_price'
        },
        {
          text: 'Created At',
          value: 'createdAt'
        },
        {
          text: 'Action',
          value: 'action',
          sortable: false
        }
      ]
    }
  },

  mounted () {
    this.getOrders()
  },

  methods: {
    async getOrders () {
      try {
        this.loading = true

        const response = await this.axios.get(
          'http://127.0.0.1:3000/api/v1/orders'
        )

        console.log('Orders:', response.data)

        this.orders = response.data.data
      } catch (error) {
        console.error('Get orders error:', error)
      } finally {
        this.loading = false
      }
    },

    formatDate (date) {
      return new Date(date).toLocaleString('th-TH')
    },

    viewOrder (order) {
      console.log('View order:', order)
    }
  }
}
</script>

<style scoped>
.admin-orders {
  padding: 32px;
}

.orders-card {
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.orders-table {
  padding: 8px;
}
</style>
