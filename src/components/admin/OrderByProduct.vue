<template>
  <div class="admin-orders">
    <v-row>

      <v-col
        cols="4"
      >
        <v-card
          flat
          class="products-card"
        >
          <v-card-title>
            Products
          </v-card-title>

          <v-list>
            <v-list-item
              v-for="product in products"
              :key="product._id"
              :class="{
                'selected-product': selectedProduct &&
                  selectedProduct._id === product._id
              }"
              @click="selectProduct(product)"
            >

              <v-list-item-avatar>
                <v-img
                  :src="product.product_image"
                  :alt="product.product_name"
                />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>
                  {{ product.product_name }}
                </v-list-item-title>

                <v-list-item-subtitle>
                  {{ product.product_price?.toLocaleString() }} ฿
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon>
                  mdi-chevron-right
                </v-icon>
              </v-list-item-icon>

            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Orders -->
      <v-col
        cols="8"
      >
        <v-card
          flat
          class="orders-card"
        >
          <template v-if="!selectedProduct">

            <div class="empty-state">
              <v-icon
                size="50"
                color="grey"
              >
                mdi-package-variant
              </v-icon>

              <div class="empty-title">
                Select a product
              </div>

              <div class="empty-text">
                Select a product to view its orders
              </div>
            </div>

          </template>
          <template v-else>

            <v-card-title class="orders-header">

              <div>
                <div class="text-h6">
                  {{ selectedProduct.product_name }}
                </div>

                <div class="subtitle">
                  Orders containing this product
                </div>
              </div>

              <v-spacer />

              <v-chip
                small
              >
                {{ orders.length }} Orders
              </v-chip>

            </v-card-title>

            <v-data-table
              :headers="headers"
              :items="orders"
              :loading="loading"
              class="orders-table"
              disable-sort
            >

            
              <template v-slot:[`item._id`]="{ item }">
                <span class="order-id">
                  {{ item._id }}
                </span>
              </template>

              <template v-slot:[`item.quantity`]="{ item }">
                {{ getQuantity(item) }}
              </template>

              <template v-slot:[`item.price`]="{ item }">
                {{ getPrice(item).toLocaleString() }} ฿
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

              <template v-slot:no-data>
                <div class="empty">
                  This product has no orders.
                </div>
              </template>

            </v-data-table>

          </template>

        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>
export default {
  name: 'AdminProductsByOrder',

  data () {
    return {
      products: [],

      orders: [],

      selectedProduct: null,

      loading: false,

      headers: [
        {
          text: 'Order ID',
          value: '_id'
        },
        {
          text: 'Quantity',
          value: 'quantity',
          sortable: false
        },
        {
          text: 'Price',
          value: 'price',
          sortable: false
        },
        {
          text: 'Created At',
          value: 'createdAt',
          sortable: false
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
    this.getProducts()
  },

  methods: {
    async getProducts () {
      try {
        const response = await this.axios.get(
          'http://127.0.0.1:3000/api/v1/products'
        )

        console.log('Products:', response.data)

        this.products = response.data.data
      } catch (error) {
        console.error('Get products error:', error)
      }
    },

    async selectProduct (product) {
      this.selectedProduct = product

      await this.getProductOrders(product._id)
    },

    async getProductOrders (productId) {
      try {
        this.loading = true

        this.orders = []

        const response = await this.axios.get(
          `http://127.0.0.1:3000/api/v1/products/${productId}/orders`
        )

        console.log('Product Orders:', response.data)

        this.orders = response.data.data
      } catch (error) {
        console.error('Get product orders error:', error)
      } finally {
        this.loading = false
      }
    },
    getQuantity (order) {
      if (!order.products) {
        return 0
      }

      const product = order.products.find(
        item => {
          const productId =
            item.product_id?._id || item.product_id

          return productId === this.selectedProduct._id
        }
      )

      return product ? product.quantity : 0
    },

    getPrice (order) {
      if (!order.products) {
        return 0
      }

      const product = order.products.find(
        item => {
          const productId =
            item.product_id?._id || item.product_id

          return productId === this.selectedProduct._id
        }
      )

      return product ? Number(product.price) : 0
    },

    formatDate (date) {
      if (!date) {
        return '-'
      }

      return new Date(date).toLocaleString('th-TH')
    },

    viewOrder (order) {
      console.log('View Order:', order)

    }
  }
}
</script>

<style scoped>
.admin-orders {
  padding: 32px;
}

.products-card,
.orders-card {
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.v-list-item {
  cursor: pointer;
  transition: 0.2s;
}

.v-list-item:hover {
  background: #f5f5f5;
}

.selected-product {
  background: #f0f0f0;
}

.orders-header {
  padding: 24px;
}

.subtitle {
  margin-top: 4px;
  font-size: 14px;
  color: #888;
}

.orders-table {
  padding: 8px;
}

.order-id {
  font-size: 13px;
  color: #666;
}

.empty-state {
  min-height: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
}

.empty-title {
  margin-top: 16px;
  font-size: 18px;
  font-weight: 600;
}

.empty-text {
  margin-top: 4px;
  color: #888;
}

.empty {
  padding: 30px;
  text-align: center;
  color: #888;
}
</style>
