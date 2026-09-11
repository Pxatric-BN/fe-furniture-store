<template>
  <v-container class="orders-page">
    <div class="page-header">
      <div>
        <h1>Order Summary</h1>
        <p>Your order has been created successfully</p>
      </div>
    </div>

    <v-card
      v-if="order"
      outlined
      class="order-card"
    >
      <div class="order-header">
        <div>
          <div class="label">
            ORDER ID
          </div>

          <div class="order-id">
            {{ order._id }}
          </div>
        </div>

        <v-chip
          outlined
          small
        >
          Created
        </v-chip>
      </div>

      <v-divider />

      <!-- Products -->
      <div class="products-section">
        <h3>Products</h3>

        <div
          v-for="product in order.products"
          :key="product._id"
          class="product-row"
        >
          <div>
            <div class="product-name">
              Product ID
            </div>

            <div class="product-id">
              {{ product.product_id }}
            </div>
          </div>

          <div class="quantity">
            x{{ product.quantity }}
          </div>

          <div class="price">
            ฿{{ formatPrice(product.price) }}
          </div>
        </div>
      </div>

      <v-divider />

      <!-- Total -->
      <div class="total-section">
        <span>Total</span>

        <strong>
          ฿{{ formatPrice(order.total_price) }}
        </strong>
      </div>

      <div class="actions">
        <v-btn
          outlined
          rounded
          @click="$router.push('/products')"
        >
          Continue Shopping
        </v-btn>
      </div>
    </v-card>

    <v-card
      v-else
      outlined
      class="empty-card"
    >
      <v-icon size="50">
        mdi-cart-outline
      </v-icon>

      <h3>No Order Found</h3>

      <p>
        Please add a product to your order first.
      </p>

      <v-btn
        outlined
        rounded
        @click="$router.push('/products')"
      >
        Browse Products
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Orders',

  data () {
    return {
      order: null
    }
  },

  mounted () {
    this.getOrder()
  },

  methods: {
    getOrder () {
      const order = localStorage.getItem('currentOrder')

      if (order) {
        this.order = JSON.parse(order)
      }
    },

    formatPrice (price) {
      return Number(price || 0).toLocaleString('th-TH')
    }
  }
}
</script>

<style scoped>
.orders-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  margin-bottom: 28px;
}

.page-header h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
}

.page-header p {
  margin-top: 6px;
  color: #777;
}

.order-card {
  border-radius: 18px;
  overflow: hidden;
}

.order-header {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.label {
  font-size: 11px;
  color: #999;
  letter-spacing: 1px;
  font-weight: 600;
}

.order-id {
  margin-top: 6px;
  font-size: 14px;
  font-weight: 600;
}

.products-section {
  padding: 24px;
}

.products-section h3 {
  margin-bottom: 18px;
}

.product-row {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
}

.product-row:last-child {
  border-bottom: none;
}

.product-name {
  font-weight: 600;
}

.product-id {
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

.quantity {
  margin-left: auto;
  margin-right: 40px;
  color: #666;
}

.price {
  min-width: 100px;
  text-align: right;
  font-weight: 600;
}

.total-section {
  padding: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 30px;
  font-size: 16px;
}

.total-section strong {
  font-size: 24px;
}

.actions {
  padding: 0 24px 24px;
  display: flex;
  justify-content: flex-end;
}

.empty-card {
  padding: 60px 20px;
  text-align: center;
  border-radius: 18px;
}

.empty-card h3 {
  margin: 16px 0 8px;
}

.empty-card p {
  color: #888;
  margin-bottom: 20px;
}
</style>
