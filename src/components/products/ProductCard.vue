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
          flat
          class="product-card"
        >
          <img
            class="product-image"
            :src="product.product_image"
            :alt="product.product_name"
          />

          <v-card-text class="product-body">
            <div class="product-name">
              {{ product.product_name }}
            </div>

            <div class="product-description">
              {{ product.product_description }}
            </div>

            <div class="product-price">
              ฿{{ product.product_price }}
            </div>
            <div class="cardAction">
            <AddProductButton
              class="add-to-cart-btn"
              @click="addToCart(product)"
            />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AddProductButton from './AddProductButton.vue'

export default {
  name: 'ProductCard',
    components: {
        AddProductButton
    },
  data () {
    return {
      products: []
    }
  },

  async mounted () {
    await this.getProducts()
  },

  methods: {
    async getProducts () {
      try {
        const response = await this.axios.get('http://127.0.0.1:3000/api/v1/products')
        this.products = response.data.data
      } catch (error) {
        console.error('Get products failed:', error)
      }
    },

    addToCart (product) {
      this.$emit('add-to-cart', product)
    }
  }
}
</script>

<style scoped>
.product-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
}

.product-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
}

.product-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-name {
  font-size: 18px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  margin-top: 6px;
  color: #777;
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 40px;
}

.product-price {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 700;
}
.cardAction {
  margin-top: 5px;
}
</style>