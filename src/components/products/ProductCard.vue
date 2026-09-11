<template>
  <div>
    <v-row class="mt-4" dense>
      <v-col
        v-for="product in products"
        :key="product._id"
        cols="3"
        class="d-flex"
      >
        <v-card
          class="product-card"
          outlined
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-2">
                FURNITURE
              </div>

              <v-list-item-title class="product-name mb-2">
                {{ product.product_name }}
              </v-list-item-title>

              <v-list-item-subtitle class="product-description">
                {{ product.product_description }}
              </v-list-item-subtitle>

              <div class="product-price">
                ฿{{ product.product_price }}
              </div>
            </v-list-item-content>

            <v-list-item-avatar
              tile
              size="100"
              class="product-avatar"
            >
              <img
                :src="product.product_image"
                :alt="product.product_name"
              >
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              class="detail-btn"
              @click="openProductDetail(product._id)"
            >
              MORE DETAIL

              <v-icon
                right
                size="18"
              >
                mdi-arrow-right
              </v-icon>
            </v-btn>

            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Product Detail -->
    <ProductDetailDialog
      :product-id="selectedProductId"
      :value="detailDialog"
      @input="detailDialog = $event"
      @add-to-order="handleAddToOrder"
    />
  </div>
</template>

<script>
import ProductDetailDialog from './ProductDetailDialog.vue'

export default {
  name: 'ProductCard',

  components: {
    ProductDetailDialog
  },

  data () {
    return {
      products: [],
      detailDialog: false,
      selectedProductId: null
    }
  },

  async mounted () {
    await this.getProducts()
  },

  methods: {
    async getProducts () {
      try {
        const response = await this.axios.get(
          'http://127.0.0.1:3000/api/v1/products'
        )

        this.products = response.data.data
      } catch (error) {
        console.error('Get products failed:', error)
      }
    },

    openProductDetail (id) {
      this.selectedProductId = id
      this.detailDialog = true
    },

    async handleAddToOrder ({ productId, quantity }) {
      try {
        const token = localStorage.getItem('token')

        const response = await this.axios.post(
          `http://localhost:3000/api/v1/products/${productId}/orders`,
          {
            quantity: quantity
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        const order = response.data.data

        console.log('Order created:', order)

       
        localStorage.setItem(
          'currentOrder',
          JSON.stringify(order)
        )
        this.detailDialog = false

        this.$router.push('/orders')
      } catch (error) {
        console.error('Create order failed:', error)
      }
    }
  }
}
</script>

<style scoped>
.product-card {
  width: 100%;
  border-radius: 18px;
  overflow: hidden;
  transition: 0.25s ease;
}

.product-card:hover {
  transform: translateY(-3px);
}

.product-avatar {
  border-radius: 12px !important;
  overflow: hidden;
}

.product-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  font-size: 18px;
  font-weight: 700;
}

.product-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
  max-width: 220px;
}

.product-price {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 700;
}

.v-card-actions {
  padding: 12px 16px 16px;
}

.detail-btn {
  text-transform: none;
  font-weight: 600;
  border-color: #000 !important;
  color: #000 !important;
}
</style>