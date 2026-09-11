<template>
  <div>
    <v-row class="product-grid">
      <v-col
        v-for="product in products"
        :key="product._id"
        cols="3"
      >
        <v-card
          class="product-card"
          flat
          @click="openProductDetail(product._id)"
        >
          <div class="product-image-wrapper">
            <img
              :src="product.product_image"
              :alt="product.product_name"
              class="product-image"
            />

            <div class="category-badge">
              FURNITURE
            </div>
          </div>

          <div class="product-content">
            <div class="product-name">
              {{ product.product_name }}
            </div>

            <div class="product-description">
              {{ product.product_description }}
            </div>
           <v-chip
              class="stock-chip"
              :color="product.product_stock > 0 ? 'indigo darken-3' : 'red'"
              outlined
              small
            >
              {{ product.product_stock > 0 ? 'In Stock' : 'Out of Stock' }}
              <span v-if="product.product_stock > 0" class="ml-1">
                {{ product.product_stock }}
              </span>
            </v-chip>
   
            <div class="product-footer">
              <div class="product-price">
                ฿{{ product.product_price.toLocaleString('th-TH') }}
              </div>

              <v-btn
                icon
                class="arrow-btn"
                @click.stop="openProductDetail(product._id)"
              >
                <v-icon size="20">
                  mdi-arrow-right
                </v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

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
import eventBus from '@/utils/eventBus'


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
        eventBus.$emit('show-alert', { 
            type: 'error', 
            message: error.response?.data?.message || 'Something went wrong' 
          })
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
        eventBus.$emit('show-alert', { type: 'success', message: response.data.message })

      } catch (error) {
         eventBus.$emit('show-alert', { 
            type: 'error', 
            message: error.response?.data?.message || 'Something went wrong' 
          })
      }
    }
  }
}
</script>

<style scoped>
.product-grid {
  margin-top: 16px;
}

.product-card {
  height: 100%;
  overflow: hidden;
  border: 1px solid #eeeeee;
  border-radius: 20px;
  background: #ffffff;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-6px);
  border-color: #dddddd;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.10) !important;
}

.product-image-wrapper {
  position: relative;
  height: 230px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.category-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #222;
}

.product-content {
  padding: 18px;
}

.product-name {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-description {
  margin-top: 8px;
  height: 42px;
  font-size: 13px;
  line-height: 1.6;
  color: #777;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 18px;
}

.product-price {
  font-size: 20px;
  font-weight: 800;

  color: #111;
}

.arrow-btn {
  width: 40px;
  height: 40px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  background: #ffffff !important;
  transition: 0.2s ease;
}

.stock-chip {
  margin-left: auto;
  margin-top: 12px;
}


</style>

